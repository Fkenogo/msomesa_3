import React, { useMemo } from 'react';
import QuickStats from '../components/QuickStats';
import RecentActivity from '../components/RecentActivity';
import PerformanceCharts from '../components/PerformanceCharts';
import QuickActions from '../components/QuickActions';
import LinkAccountCard from '../components/LinkAccountCard';
import PastPapersList from '../components/PastPapersList';
import AchievementsCard from '../components/AchievementsCard';
import SpacedRepetitionCard from '../components/SpacedRepetitionCard';
import StudyRemindersCard from '../components/StudyRemindersCard';
import { User, LinkRequest, LinkedAccount, Notification, Exam, ExamMode, StudyReminder, UserRole } from '../types';
import { SparklesIcon } from '../components/icons';

interface StudentDashboardProps {
    currentUser: User;
    originalRole?: UserRole;
    onStartExam: (examId: string, mode: ExamMode) => void;
    onStartReviewSession: (exam: Exam) => void;
    onSaveReminders: (reminders: StudyReminder[]) => void;
    allUsers: User[];
    allExams: Exam[];
    linkRequests: LinkRequest[];
    linkedAccounts: LinkedAccount[];
    onSendRequest: (from: string, to: string) => void;
    onAcceptRequest: (requestId: string) => void;
    onDeclineRequest: (requestId: string) => void;
    onUnlink: (userId1: string, userId2: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = (props) => {
  const { currentUser, onStartExam, allExams, onStartReviewSession, onSaveReminders, originalRole } = props;

  const isPremium = useMemo(() => {
    // Admin override: If the original user is an admin, they have premium access in any view.
    if (originalRole === 'admin') {
        return true;
    }

    const parentLink = props.linkedAccounts.find(l => 
        (l.userId1 === currentUser.id || l.userId2 === currentUser.id)
    );
    if (!parentLink) return false;
    
    const parentId = parentLink.userId1 === currentUser.id ? parentLink.userId2 : parentLink.userId1;
    const parent = props.allUsers.find(u => u.id === parentId);

    return parent?.subscription?.plan === 'Premium';
  }, [props.linkedAccounts, props.allUsers, currentUser.id, originalRole]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {currentUser.name.split(' (')[0]}!</h1>
        <p className="text-gray-500">Every exam is a chance to shine ✨</p>
      </div>

      {isPremium && (
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white p-4 rounded-xl shadow-md flex items-center gap-4">
            <SparklesIcon className="w-8 h-8"/>
            <div>
                <h3 className="font-bold">Premium Access Unlocked!</h3>
                <p className="text-sm">You have access to all exclusive features and past papers thanks to your linked parent's subscription.</p>
            </div>
        </div>
      )}

      <QuickStats currentUser={currentUser} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <QuickActions />
            <PastPapersList level={currentUser.level || 'PLE'} onStartExam={onStartExam} isPremium={isPremium} allExams={allExams} />
            <PerformanceCharts />
        </div>
        <div className="space-y-8">
            <SpacedRepetitionCard currentUser={currentUser} allExams={allExams} onStartReview={onStartReviewSession} />
            <AchievementsCard currentUser={currentUser} />
            <StudyRemindersCard currentUser={currentUser} onSave={onSaveReminders} allExams={allExams} />
            <LinkAccountCard 
                currentUser={currentUser}
                allUsers={props.allUsers}
                linkRequests={props.linkRequests}
                linkedAccounts={props.linkedAccounts}
                onSendRequest={props.onSendRequest}
                onAcceptRequest={props.onAcceptRequest}
                onDeclineRequest={props.onDeclineRequest}
                onUnlink={props.onUnlink}
            />
            <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;