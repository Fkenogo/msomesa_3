import React, { useState, useMemo } from 'react';
import Card from './Card';
import { ForumCategory, ForumPost, User } from '../types';
import { PencilIcon, TrashIcon, PlusCircleIcon, UsersIcon, BookOpenIcon, BuildingOfficeIcon, SparklesIcon } from './icons';
// We will need a modal for editing categories, let's create it later.
// import CategoryEditModal from './CategoryEditModal';

interface CommunityManagementCardProps {
    categories: ForumCategory[];
    posts: ForumPost[];
    users: User[];
    onSaveCategory: (category: ForumCategory) => void;
    onDeleteCategory: (categoryId: string) => void;
    onDeletePost: (postId: string) => void;
    onTogglePin: (postId: string) => void;
    onToggleLock: (postId: string) => void;
}

const iconMap: Record<ForumCategory['icon'], React.ReactNode> = {
    general: <UsersIcon className="w-5 h-5"/>,
    tips: <BookOpenIcon className="w-5 h-5"/>,
    school: <BuildingOfficeIcon className="w-5 h-5"/>,
    feedback: <SparklesIcon className="w-5 h-5"/>
};

const CommunityManagementCard: React.FC<CommunityManagementCardProps> = (props) => {
    const { categories, posts, users, onDeleteCategory, onDeletePost, onTogglePin, onToggleLock } = props;
    const [activeTab, setActiveTab] = useState<'categories' | 'posts'>('categories');

    const usersMap = useMemo(() => new Map(users.map(u => [u.id, u.name])), [users]);
    const categoriesMap = useMemo(() => new Map(categories.map(c => [c.id, c.name])), [categories]);
    
    // Placeholder for adding/editing categories
    const handleAddCategory = () => alert("Add Category functionality to be implemented.");
    const handleEditCategory = (cat: ForumCategory) => alert(`Edit Category functionality for ${cat.name} to be implemented.`);


    return (
        <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Community Management</h2>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'categories' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Categories ({categories.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'posts' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Posts ({posts.length})
                    </button>
                </nav>
            </div>

            {activeTab === 'categories' && (
                <div className="mt-4">
                    <div className="flex justify-end mb-4">
                         <button onClick={handleAddCategory} className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm">
                            <PlusCircleIcon className="w-5 h-5" /> Add Category
                        </button>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-500">{iconMap[cat.icon]}</span>
                                            <span>{cat.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{cat.description}</td>
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <button onClick={() => handleEditCategory(cat)} className="text-gray-400 hover:text-blue-600"><PencilIcon className="w-5 h-5"/></button>
                                        <button onClick={() => onDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'posts' && (
                 <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Author</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                           {posts.map(post => (
                                <tr key={post.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                                    <td className="px-6 py-4">{usersMap.get(post.authorId) || 'Unknown User'}</td>
                                    <td className="px-6 py-4">{categoriesMap.get(post.categoryId) || 'Unknown'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            {post.isPinned && <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Pinned</span>}
                                            {post.isLocked && <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Locked</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                         <div className="flex gap-2">
                                            <button onClick={() => onTogglePin(post.id)} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">{post.isPinned ? 'Unpin' : 'Pin'}</button>
                                            <button onClick={() => onToggleLock(post.id)} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">{post.isLocked ? 'Unlock' : 'Lock'}</button>
                                            <button onClick={() => onDeletePost(post.id)} className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded hover:bg-red-200">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            )}
        </Card>
    );
};

export default CommunityManagementCard;