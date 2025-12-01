
import React from 'react';
import Card from './Card';
import { BookOpenIcon, FireIcon, TrophyIcon, SparklesIcon } from './icons';
import { User } from '../types';

const StatRing: React.FC<{ progress: number; color: string }> = ({ progress, color }) => {
    const strokeWidth = 8;
    const radius = 30;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2} className="-rotate-90">
            <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke={color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};

interface QuickStatsProps {
    currentUser: User;
}

const QuickStats: React.FC<QuickStatsProps> = ({ currentUser }) => {
    const stats = [
        { name: 'Exams Taken', value: '12', detail: 'This month', icon: BookOpenIcon, color: 'text-sky-600', bgColor: 'bg-sky-100', progress: 75 },
        { name: 'Study Streak', value: `${currentUser.streak || 0}`, detail: 'Days in a row!', icon: FireIcon, color: 'text-orange-600', bgColor: 'bg-orange-100', progress: ((currentUser.streak || 0) / 10) * 100 }, // Streak goal of 10 days
        { name: 'Current Rank', value: '#12', detail: 'In your school', icon: TrophyIcon, color: 'text-amber-600', bgColor: 'bg-amber-100', progress: 90 },
        { name: 'XP Points', value: (currentUser.xp || 0).toLocaleString(), detail: 'Level Up!', icon: SparklesIcon, color: 'text-purple-600', bgColor: 'bg-purple-100', progress: ((currentUser.xp || 0) % 1000) / 10 }, // 1000 xp per level
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card key={stat.name} className="flex items-center gap-4 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="relative">
                        <StatRing progress={stat.progress} color={stat.color.startsWith('#') ? stat.color : 'currentColor'} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`p-2 rounded-full ${stat.bgColor} ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        {stat.detail && <p className="text-xs text-gray-400">{stat.detail}</p>}
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default QuickStats;
