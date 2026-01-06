import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Card from './Card';
import { SubjectPerformance, WeakArea } from '../types';
import { ArrowTrendingUpIcon } from './icons';
import { mockWeakAreas, mockStudyTime } from '../data/analytics';

const subjectData: SubjectPerformance[] = [
  { name: 'Math', average: 85, attempts: 5, improvement: 5 },
  { name: 'English', average: 78, attempts: 4, improvement: -2 },
  { name: 'Science', average: 92, attempts: 6, improvement: 8 },
  { name: 'SST', average: 81, attempts: 3, improvement: 3 },
];

const scoreTrendData = [
  { name: 'Jan', score: 70 },
  { name: 'Feb', score: 75 },
  { name: 'Mar', score: 72 },
  { name: 'Apr', score: 80 },
  { name: 'May', score: 85 },
  { name: 'Jun', score: 88 },
];


const PerformanceCharts: React.FC = () => {
  return (
    <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-3">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Performance by Subject</h2>
        <div className="h-80 w-full relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                  cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="average" fill="#0ea5e9" name="Average Score (%)" barSize={30} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
       <Card className="lg:col-span-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Score Trend Over Time</h2>
        <div className="flex items-center gap-2 text-green-600 mb-2">
            <ArrowTrendingUpIcon className="w-5 h-5"/>
            <p className="text-sm font-semibold">Improvement: ↑ 5% from last period</p>
        </div>
        <div className="h-72 w-full relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                  cursor={{ stroke: '#0ea5e9', strokeWidth: 1 }}
                />
                <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5, fill: '#0ea5e9' }} activeDot={{ r: 8 }} name="Average Score (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Study Time Breakdown</h2>
            <div className="h-64 w-full relative">
              <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={mockStudyTime} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {mockStudyTime.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
        </Card>
         <Card className="lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weakest Areas to Focus On</h2>
            <ul className="space-y-3">
                {mockWeakAreas.map((area, index) => (
                    <li key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-800">{area.topic}</p>
                                <p className="text-sm text-gray-500">{area.subject}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-red-500">{area.average}%</p>
                                <p className="text-xs text-gray-400">Avg. Score</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    </div>
    </div>
  );
};

export default PerformanceCharts;