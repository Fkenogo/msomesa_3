
import React from 'react';
import Card from './Card';
import { ChevronRightIcon } from './icons';
import { ExamAttempt } from '../types';

const mockActivity: ExamAttempt[] = [
    { subject: 'Mathematics', year: 2023, score: 88, date: '2024-07-20' },
    { subject: 'English', year: 2022, score: 76, date: '2024-07-18' },
    { subject: 'Science', year: 2023, score: 92, date: '2024-07-17' },
    { subject: 'Social Studies', year: 2021, score: 81, date: '2024-07-15' },
];


const RecentActivity: React.FC = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Your Recent Activity</h2>
        <a href="#" className="text-sm font-medium text-sky-600 hover:text-sky-800">View All</a>
      </div>
      {mockActivity.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {mockActivity.map((activity, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-700">{activity.subject} {activity.year}</p>
                <p className="text-sm text-gray-500">Score: <span className="font-bold">{activity.score}%</span> | {new Date(activity.date).toLocaleDateString()}</p>
              </div>
              <a href="#" className="text-gray-400 hover:text-sky-600">
                <ChevronRightIcon className="w-5 h-5" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-8">No recent exams. Start practicing now!</p>
      )}
    </Card>
  );
};

export default RecentActivity;
