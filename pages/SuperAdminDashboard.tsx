
import React from 'react';
import { User, Exam } from '../types';
import Card from '../components/Card';
import UserManagementCard from '../components/UserManagementCard';
import ExamManagementCard from '../components/ExamManagementCard';
import DataBackupCard from '../components/DataBackupCard';
import { UsersIcon, DocumentTextIcon, ChartBarIcon } from '../components/icons';

interface SuperAdminDashboardProps {
    currentUser: User;
    exams: Exam[];
    allUsers: User[];
    onPdfUpload: (examId: string, fileUrl: string, summary: string) => void;
    onSaveUser: (user: User) => void;
    onDeleteUser: (userId: string) => void;
    onSaveExam: (exam: Exam) => void;
    onDeleteExam: (examId: string) => void;
    onPreviewExam: (examId: string) => void;
    onImportData: (users: User[], exams: Exam[]) => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = (props) => {
  const {
    exams, allUsers, onPdfUpload,
    onSaveUser, onDeleteUser, onSaveExam, onDeleteExam,
    onPreviewExam, onImportData
  } = props;

  const adminStats = [
    { name: 'Total Users', value: allUsers.length.toString(), icon: UsersIcon, color: 'text-sky-500' },
    { name: 'Total Exams', value: exams.length.toString(), icon: DocumentTextIcon, color: 'text-green-500' },
    { name: 'Exams Taken (24h)', value: '452', icon: ChartBarIcon, color: 'text-indigo-500' },
];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div>
             <h2 className="text-3xl font-bold text-gray-800 mb-2">Super Admin Dashboard</h2>
             <p className="text-gray-500">Platform overview and management tools.</p>
        </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminStats.map((stat) => (
                <Card key={stat.name} className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                </Card>
            ))}
        </div>

        <div className="space-y-8">
            <DataBackupCard
              allUsers={allUsers}
              allExams={exams}
              onImportData={onImportData}
            />
            <UserManagementCard allUsers={allUsers} onSaveUser={onSaveUser} onDeleteUser={onDeleteUser} />
            <ExamManagementCard
              exams={exams}
              onPdfUpload={onPdfUpload}
              onSaveExam={onSaveExam}
              onDeleteExam={onDeleteExam}
              onPreviewExam={onPreviewExam}
            />
        </div>
    </div>
  );
};

export default SuperAdminDashboard;
