import React from 'react';
import { User, Exam, ForumCategory, ForumPost } from '../types';
import Card from '../components/Card';
import UserManagementCard from '../components/UserManagementCard';
import ExamManagementCard from '../components/ExamManagementCard';
import CommunityManagementCard from '../components/CommunityManagementCard';
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
    // Forum Admin Props
    forumCategories: ForumCategory[];
    forumPosts: ForumPost[];
    onSaveCategory: (category: ForumCategory) => void;
    onDeleteCategory: (categoryId: string) => void;
    onDeletePost: (postId: string) => void;
    onTogglePostPin: (postId: string) => void;
    onTogglePostLock: (postId: string) => void;
    onImpersonate: (user: User) => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = (props) => {
  const { 
    exams, allUsers, onPdfUpload,
    onSaveUser, onDeleteUser, onSaveExam, onDeleteExam,
    onPreviewExam, onImpersonate
  } = props;

  const adminStats = [
    { name: 'Total Users', value: allUsers.length.toString(), icon: UsersIcon, color: 'text-sky-500' },
    { name: 'Total Exams', value: exams.length.toString(), icon: DocumentTextIcon, color: 'text-green-500' },
    { name: 'Total Forum Posts', value: props.forumPosts.length.toString(), icon: ChartBarIcon, color: 'text-indigo-500' },
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
            <UserManagementCard allUsers={allUsers} onSaveUser={onSaveUser} onDeleteUser={onDeleteUser} onImpersonate={onImpersonate} />
            <ExamManagementCard 
              exams={exams} 
              onPdfUpload={onPdfUpload} 
              onSaveExam={onSaveExam} 
              onDeleteExam={onDeleteExam}
              onPreviewExam={onPreviewExam}
            />
            <CommunityManagementCard
                categories={props.forumCategories}
                posts={props.forumPosts}
                users={props.allUsers}
                onSaveCategory={props.onSaveCategory}
                onDeleteCategory={props.onDeleteCategory}
                onDeletePost={props.onDeletePost}
                onTogglePin={props.onTogglePostPin}
                onToggleLock={props.onTogglePostLock}
            />
        </div>
    </div>
  );
};

export default SuperAdminDashboard;