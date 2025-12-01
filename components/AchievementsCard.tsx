
import React from 'react';
import Card from './Card';
import { FireIcon, TrophyIcon, SparklesIcon, BookOpenIcon } from './icons';
import { User } from '../types';

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
}

const allAchievements: Achievement[] = [
    { id: 'First Steps', name: 'First Steps', description: 'Complete your first exam', icon: SparklesIcon },
    { id: 'Streak Starter', name: 'Streak Starter', description: 'Complete an exam 3 days in a row', icon: FireIcon },
    { id: 'High Scorer', name: 'High Scorer', description: 'Score 90% or more on any exam', icon: TrophyIcon },
    { id: 'Math Whiz', name: 'Math Whiz', description: 'Complete 5 Math exams', icon: BookOpenIcon },
    { id: 'Dedicated Learner', name: 'Dedicated Learner', description: 'Complete 10 exams', icon: BookOpenIcon },
    { id: 'Perfect Score', name: 'Perfect Score', description: 'Get 100% on an exam', icon: TrophyIcon },
];

interface AchievementsCardProps {
    currentUser: User;
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({ currentUser }) => {
    const unlockedIds = new Set(currentUser.achievements || []);

    return (
        <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Achievements</h2>
            <div className="grid grid-cols-3 gap-4">
                {allAchievements.map(ach => {
                    const isUnlocked = unlockedIds.has(ach.id);
                    return (
                        <div 
                            key={ach.name} 
                            className={`flex flex-col items-center text-center p-3 rounded-lg border-2 transition-opacity ${isUnlocked ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-gray-50 opacity-50'}`}
                            title={`${ach.name}: ${ach.description}`}
                        >
                            <div className={`p-2 rounded-full ${isUnlocked ? 'bg-amber-100 text-amber-500' : 'bg-gray-200 text-gray-400'}`}>
                                <ach.icon className="w-6 h-6" />
                            </div>
                            <p className="text-xs font-semibold mt-2 text-gray-700">{ach.name}</p>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default AchievementsCard;
