
import React from 'react';
import Card from './Card';
import { BookOpenIcon, ChartBarIcon, SparklesIcon } from './icons';

const actions = [
  { name: 'Start New Exam', icon: BookOpenIcon, href: '#', color: 'bg-sky-600 hover:bg-sky-700' },
  { name: 'Continue Practice', icon: BookOpenIcon, href: '#', color: 'bg-gray-700 hover:bg-gray-800' },
  { name: 'View Analytics', icon: ChartBarIcon, href: '#', color: 'bg-gray-700 hover:bg-gray-800' },
  { name: 'Ask AI Tutor', icon: SparklesIcon, href: '#', color: 'bg-gray-700 hover:bg-gray-800' },
];

const QuickActions: React.FC = () => {
  return (
    <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => (
                <a key={action.name} href={action.href} className={`flex flex-col items-center justify-center p-6 rounded-xl text-white font-semibold transition-transform duration-200 hover:scale-105 ${action.color} ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                    <action.icon className="w-8 h-8 mb-2" />
                    <span>{action.name}</span>
                </a>
            ))}
        </div>
    </div>
  );
};

export default QuickActions;
