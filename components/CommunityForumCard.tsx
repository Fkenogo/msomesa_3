import React from 'react';
import Card from './Card';
import { ChatBubbleLeftRightIcon, ChevronRightIcon, PlusCircleIcon } from './icons';

interface CommunityForumCardProps {
    onNavigate: () => void;
    onNewPost: () => void;
}

const CommunityForumCard: React.FC<CommunityForumCardProps> = ({ onNavigate, onNewPost }) => {
    return (
        <Card>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-sky-100 p-3 rounded-full text-sky-600">
                        <ChatBubbleLeftRightIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Parent Community Forum</h2>
                        <p className="text-sm text-gray-600">Connect with other parents and share experiences.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button 
                        onClick={onNewPost}
                        className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <PlusCircleIcon className="w-5 h-5"/>
                        <span>New Post</span>
                    </button>
                    <button 
                        onClick={onNavigate} 
                        className="bg-white text-sky-600 font-bold py-2 px-4 rounded-lg hover:bg-sky-50 transition-colors flex items-center justify-center gap-2 border border-gray-200"
                    >
                        <span>View Forum</span>
                        <ChevronRightIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default CommunityForumCard;