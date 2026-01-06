import React, { useState, useMemo, FormEvent } from 'react';
import { User, ForumCategory, ForumPost, ForumReply } from '../types';
import { ChevronLeftIcon, UsersIcon, BookOpenIcon, BuildingOfficeIcon, SparklesIcon, PencilIcon } from '../components/icons';
import Card from '../components/Card';
import MarkdownRenderer from '../components/MarkdownRenderer';

// --- Reusable Reply Form Component ---
interface ReplyFormProps {
    onSubmit: (content: string) => void;
    onCancel: () => void;
    initialContent?: string;
    isSubmitting: boolean;
    ctaText: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, onCancel, initialContent = '', isSubmitting, ctaText }) => {
    const [content, setContent] = useState(initialContent);
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(content);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2">
            <div className="border border-gray-300 rounded-lg">
                <div className="flex bg-gray-50 rounded-t-lg border-b">
                    <button type="button" onClick={() => setActiveTab('write')} className={`px-3 py-1.5 text-xs font-medium rounded-tl-lg ${activeTab === 'write' ? 'bg-white text-sky-600' : 'text-gray-500 hover:bg-gray-100'}`}>Write</button>
                    <button type="button" onClick={() => setActiveTab('preview')} className={`px-3 py-1.5 text-xs font-medium ${activeTab === 'preview' ? 'bg-white text-sky-600' : 'text-gray-500 hover:bg-gray-100'}`}>Preview</button>
                </div>
                {activeTab === 'write' ? (
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full p-2 border-0 rounded-b-lg focus:ring-0 resize-y"
                        placeholder="Write your reply here..."
                        required
                    />
                ) : (
                     <div className="p-3 bg-white rounded-b-lg min-h-[108px] text-sm"><MarkdownRenderer text={content || "Nothing to preview."} /></div>
                )}
            </div>
            <div className="flex items-center gap-2 mt-2">
                <button type="submit" disabled={isSubmitting} className="bg-sky-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-sky-700 disabled:bg-sky-300">
                    {isSubmitting ? '...' : ctaText}
                </button>
                <button type="button" onClick={onCancel} className="text-sm font-semibold text-gray-600 px-4 py-1.5 rounded-lg hover:bg-gray-100">Cancel</button>
            </div>
        </form>
    );
};


// --- Reply Thread Component ---
interface ReplyThreadProps {
    reply: ForumReply;
    allUsers: User[];
    currentUser: User;
    repliesMap: Map<string | null, ForumReply[]>;
    level: number;
    editingReplyId: string | null;
    replyingToId: string | null;
    setEditingReplyId: (id: string | null) => void;
    setReplyingToId: (id: string | null) => void;
    onSaveReply: (reply: ForumReply) => void;
    isPostLocked: boolean;
}

const ReplyThread: React.FC<ReplyThreadProps> = (props) => {
    const { reply, allUsers, currentUser, repliesMap, level, editingReplyId, replyingToId, setEditingReplyId, setReplyingToId, onSaveReply, isPostLocked } = props;
    const author = useMemo(() => allUsers.find(u => u.id === reply.authorId), [allUsers, reply.authorId]);
    const childReplies = repliesMap.get(reply.id) || [];
    const isEditing = editingReplyId === reply.id;
    const isReplying = replyingToId === reply.id;
    
    const handleEditSave = (content: string) => {
        onSaveReply({ ...reply, content });
        setEditingReplyId(null);
    };

    const handleReplySave = (content: string) => {
        const newReply: ForumReply = {
            id: `reply-${Date.now()}`,
            postId: reply.postId,
            parentId: reply.id,
            content,
            authorId: currentUser.id,
            createdAt: new Date().toISOString(),
        };
        onSaveReply(newReply);
        setReplyingToId(null);
    };

    return (
        <div className={`pl-4 ${level > 0 ? 'border-l-2 ml-4' : ''}`}>
            {isEditing ? (
                <ReplyForm
                    initialContent={reply.content}
                    onSubmit={handleEditSave}
                    onCancel={() => setEditingReplyId(null)}
                    isSubmitting={false}
                    ctaText="Save Changes"
                />
            ) : (
                <>
                    <div className="text-sm text-gray-700">
                        <MarkdownRenderer text={reply.content} />
                    </div>
                    <div className="text-xs text-gray-500 mt-2 flex items-center gap-3">
                        <span>By {author?.name || 'Unknown'} on {new Date(reply.createdAt).toLocaleDateString()}</span>
                        {!isPostLocked && (
                             <>
                                <button onClick={() => setReplyingToId(reply.id)} className="font-semibold hover:underline">Reply</button>
                                {currentUser.id === reply.authorId && (
                                    <button onClick={() => setEditingReplyId(reply.id)} className="font-semibold hover:underline flex items-center gap-1"><PencilIcon className="w-3 h-3"/>Edit</button>
                                )}
                             </>
                        )}
                    </div>
                </>
            )}

            {isReplying && (
                <div className="mt-2">
                     <ReplyForm
                        onSubmit={handleReplySave}
                        onCancel={() => setReplyingToId(null)}
                        isSubmitting={false}
                        ctaText="Submit Reply"
                    />
                </div>
            )}
            
            <div className="space-y-4 mt-4">
                {childReplies.map(child => <ReplyThread key={child.id} {...props} reply={child} level={level + 1} />)}
            </div>
        </div>
    );
};



// --- Main Forum Page Component ---
interface ForumPageProps {
    currentUser: User;
    allUsers: User[];
    forumCategories: ForumCategory[];
    forumPosts: ForumPost[];
    forumReplies: ForumReply[];
    onSavePost: (post: ForumPost) => void;
    onSaveReply: (reply: ForumReply) => void;
    onBackToDashboard: () => void;
}

type ForumView = 'home' | 'category' | 'post';
type SortOrder = 'date-desc' | 'title-asc' | 'views-desc';

const ForumPage: React.FC<ForumPageProps> = (props) => {
    const { currentUser, allUsers, forumCategories, forumPosts, forumReplies, onSaveReply, onBackToDashboard } = props;
    const [view, setView] = useState<ForumView>('home');
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [activePostId, setActivePostId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('date-desc');
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
    const [replyingToId, setReplyingToId] = useState<string | null>(null);
    const [showTopLevelReply, setShowTopLevelReply] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const usersMap = useMemo(() => new Map(allUsers.map(u => [u.id, u])), [allUsers]);

    const handleSelectCategory = (categoryId: string) => {
        setActiveCategoryId(categoryId);
        setActiveTag(null);
        setView('category');
    };

    const handleSelectPost = (postId: string) => {
        setActivePostId(postId);
        setShowTopLevelReply(false);
        setEditingReplyId(null);
        setReplyingToId(null);
        setView('post');
    };

    const activeCategory = useMemo(() => activeCategoryId ? forumCategories.find(c => c.id === activeCategoryId) : null, [activeCategoryId, forumCategories]);
    const activePost = useMemo(() => activePostId ? forumPosts.find(p => p.id === activePostId) : null, [activePostId, forumPosts]);
    
    const { postsInCategory, availableTags } = useMemo(() => {
        if (!activeCategoryId) return { postsInCategory: [], availableTags: [] };
        
        let posts = forumPosts.filter(p => p.categoryId === activeCategoryId);
        const tags = [...new Set(posts.flatMap(p => p.tags || []))];

        if (activeTag) {
            posts = posts.filter(p => p.tags?.includes(activeTag));
        }

        if (searchQuery.trim()) {
            const lowercasedQuery = searchQuery.toLowerCase();
            posts = posts.filter(p => 
                p.title.toLowerCase().includes(lowercasedQuery) || 
                p.content.toLowerCase().includes(lowercasedQuery)
            );
        }

        const pinned = posts.filter(p => p.isPinned);
        const notPinned = posts.filter(p => !p.isPinned);

        notPinned.sort((a, b) => {
            if (sortOrder === 'title-asc') {
                return a.title.localeCompare(b.title);
            }
            if (sortOrder === 'views-desc') {
                return (b.views || 0) - (a.views || 0);
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        return { postsInCategory: [...pinned, ...notPinned], availableTags: tags };
    }, [activeCategoryId, forumPosts, sortOrder, activeTag, searchQuery]);


    const { topLevelReplies, repliesMap } = useMemo(() => {
        if (!activePostId) return { topLevelReplies: [], repliesMap: new Map() };
        
        const repliesForPost = forumReplies.filter(r => r.postId === activePostId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        const map = new Map<string | null, ForumReply[]>();
        repliesForPost.forEach(reply => {
            if (!map.has(reply.parentId)) map.set(reply.parentId, []);
            map.get(reply.parentId)!.push(reply);
        });

        return { topLevelReplies: map.get(null) || [], repliesMap: map };
    }, [activePostId, forumReplies]);

    const handleTopLevelReplySave = (content: string) => {
        if (!activePost) return;
        setIsSubmitting(true);
        const newReply: ForumReply = {
            id: `reply-${Date.now()}`,
            postId: activePost.id,
            parentId: null,
            content,
            authorId: currentUser.id,
            createdAt: new Date().toISOString(),
        };
        onSaveReply(newReply);
        setIsSubmitting(false);
        setShowTopLevelReply(false);
    };

    const Breadcrumbs = () => (
        <nav className="flex items-center text-sm text-gray-500 mb-4">
            <button onClick={() => setView('home')} className="hover:underline">Forum Home</button>
            {activeCategory && (
                <>
                    <span className="mx-2">/</span>
                    <button onClick={() => { if(view !== 'category') setView('category')}} className={`hover:underline ${!activePost ? 'text-gray-800 font-semibold' : ''}`}>{activeCategory.name}</button>
                </>
            )}
            {activePost && (
                 <>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-semibold truncate max-w-xs">{activePost.title}</span>
                </>
            )}
        </nav>
    );

    const renderContent = () => {
        switch (view) {
            case 'category':
                return (
                    <div>
                        <h2 className="text-2xl font-bold">{activeCategory?.name}</h2>
                        <p className="text-gray-600 mb-6">{activeCategory?.description}</p>
                        
                        <div className="mb-4 relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input 
                                type="search"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search posts in this category..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>

                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-lg font-bold text-gray-800">Posts</h3>
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort-order" className="text-sm font-medium text-gray-600">Sort by:</label>
                                <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)} className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm bg-white">
                                    <option value="date-desc">Newest First</option>
                                    <option value="views-desc">Views (High to Low)</option>
                                    <option value="title-asc">Title (A-Z)</option>
                                </select>
                            </div>
                        </div>
                         {availableTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 items-center mb-4 text-sm">
                                <span className="font-semibold text-gray-600">Filter by Tag:</span>
                                <button onClick={() => setActiveTag(null)} className={`px-2.5 py-1 rounded-full ${!activeTag ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>All</button>
                                {availableTags.map(tag => (
                                    <button key={tag} onClick={() => setActiveTag(tag)} className={`px-2.5 py-1 rounded-full capitalize ${activeTag === tag ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{tag}</button>
                                ))}
                            </div>
                        )}
                        <ul className="space-y-3">
                            {postsInCategory.map(post => (
                                <li key={post.id} onClick={() => handleSelectPost(post.id)} className="p-4 bg-white rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow">
                                    <p className="font-semibold text-sky-700">{post.title}</p>
                                    <div className="flex items-center gap-2 flex-wrap mt-1">
                                        {post.tags?.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{tag}</span>)}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
                                        <span>By {usersMap.get(post.authorId)?.name || 'Unknown'} on {new Date(post.createdAt).toLocaleDateString()}</span>
                                        <span>{post.views || 0} views</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'post':
                return (
                     <div>
                        <h2 className="text-2xl font-bold">{activePost?.title}</h2>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="text-gray-800"><MarkdownRenderer text={activePost?.content || ''} /></div>
                            <p className="text-xs text-gray-500 mt-4">By {usersMap.get(activePost!.authorId)?.name || 'Unknown'} on {new Date(activePost!.createdAt).toLocaleDateString()}</p>
                        </div>
                        <h3 className="text-xl font-bold mt-8 mb-4">Replies ({forumReplies.filter(r => r.postId === activePostId).length})</h3>
                        <div className="space-y-4">
                            {topLevelReplies.map(reply => (
                               <ReplyThread
                                    key={reply.id}
                                    reply={reply}
                                    allUsers={allUsers}
                                    currentUser={currentUser}
                                    repliesMap={repliesMap}
                                    level={0}
                                    editingReplyId={editingReplyId}
                                    replyingToId={replyingToId}
                                    setEditingReplyId={setEditingReplyId}
                                    setReplyingToId={setReplyingToId}
                                    onSaveReply={onSaveReply}
                                    isPostLocked={activePost?.isLocked || false}
                                />
                            ))}
                        </div>
                         <div className="mt-8 pt-6 border-t">
                             {showTopLevelReply ? (
                                <>
                                    <h3 className="text-xl font-bold mb-2">Leave a Reply</h3>
                                    <ReplyForm
                                        onSubmit={handleTopLevelReplySave}
                                        onCancel={() => setShowTopLevelReply(false)}
                                        isSubmitting={isSubmitting}
                                        ctaText="Submit Reply"
                                    />
                                </>
                            ) : activePost?.isLocked ? (
                                <p className="text-sm text-gray-500 mt-2">This post is locked. No new replies can be added.</p>
                            ) : (
                                <button onClick={() => setShowTopLevelReply(true)} className="bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-700">Leave a Reply</button>
                            )}
                        </div>
                    </div>
                );
            case 'home':
            default:
                const iconMap: Record<ForumCategory['icon'], React.ReactNode> = { general: <UsersIcon className="w-6 h-6"/>, tips: <BookOpenIcon className="w-6 h-6"/>, school: <BuildingOfficeIcon className="w-6 h-6"/>, feedback: <SparklesIcon className="w-6 h-6"/> };
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Forum Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {forumCategories.map(cat => (
                                <div key={cat.id} onClick={() => handleSelectCategory(cat.id)} className="p-6 bg-white rounded-lg shadow-sm border cursor-pointer hover:shadow-md hover:border-sky-500 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-sky-100 text-sky-600 rounded-full">{iconMap[cat.icon]}</div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{cat.name}</h3>
                                            <p className="text-sm text-gray-600">{cat.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
        }
    };


    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Parent Community Forum</h1>
                    <Breadcrumbs />
                </div>
                <button onClick={onBackToDashboard} className="flex items-center gap-2 text-sm font-semibold bg-white text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-50">
                    <ChevronLeftIcon className="w-5 h-5"/> Back to Dashboard
                </button>
            </div>
             <Card>
                {renderContent()}
            </Card>
        </div>
    );
};

export default ForumPage;