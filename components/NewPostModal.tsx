import React, { useState, FormEvent } from 'react';
import { ForumCategory, User, ForumPost } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface NewPostModalProps {
    categories: ForumCategory[];
    currentUser: User;
    onSave: (post: ForumPost) => void;
    onClose: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ categories, currentUser, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim() || !categoryId) {
            alert('Please fill out all fields.');
            return;
        }

        const newPost: ForumPost = {
            id: `post-${Date.now()}`,
            categoryId,
            title,
            content,
            authorId: currentUser.id,
            createdAt: new Date().toISOString(),
            isPinned: false,
            isLocked: false,
        };

        onSave(newPost);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-800">Create New Forum Post</h2>
                    </div>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div>
                            <label htmlFor="post-title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                id="post-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="post-category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="post-category"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="post-content" className="block text-sm font-medium text-gray-700">Content</label>
                            <div className="mt-1 border border-gray-300 rounded-md">
                                <div className="flex bg-gray-50 rounded-t-md border-b">
                                     <button type="button" onClick={() => setActiveTab('write')} className={`px-4 py-2 text-sm font-medium rounded-tl-md ${activeTab === 'write' ? 'bg-white text-sky-600' : 'text-gray-500 hover:bg-gray-100'}`}>Write</button>
                                     <button type="button" onClick={() => setActiveTab('preview')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'preview' ? 'bg-white text-sky-600' : 'text-gray-500 hover:bg-gray-100'}`}>Preview</button>
                                </div>
                                {activeTab === 'write' ? (
                                    <textarea
                                        id="post-content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        rows={8}
                                        className="w-full p-3 border-0 rounded-b-md focus:ring-0"
                                        placeholder="Share your thoughts... You can use Markdown for formatting (e.g., **bold**)."
                                    />
                                ) : (
                                    <div className="p-3 bg-white rounded-b-md min-h-[210px]">
                                        <MarkdownRenderer text={content || "Nothing to preview yet."} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-700">
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPostModal;