
import React from 'react';
import PerformanceCharts from '../components/PerformanceCharts';
import RecentActivity from '../components/RecentActivity';
import LinkAccountCard from '../components/LinkAccountCard';
import StudentListCard from '../components/StudentListCard';
import SubscriptionCard from '../components/SubscriptionCard';
import { User, LinkRequest, LinkedAccount } from '../types';

interface SchoolDashboardProps {
    currentUser: User;
    allUsers: User[];
    linkRequests: LinkRequest[];
    linkedAccounts: LinkedAccount[];
    onSendRequest: (from: string, to: string) => void;
    onAcceptRequest: (requestId: string) => void;
    onDeclineRequest: (requestId: string) => void;
    onUnlink: (userId1: string, userId2: string) => void;
}

const SchoolDashboard: React.FC<SchoolDashboardProps> = (props) => {
  const { currentUser } = props;
  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">School Dashboard</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <StudentListCard 
                    currentUser={currentUser}
                    allUsers={props.allUsers}
                    linkedAccounts={props.linkedAccounts}
                />
                 <div className="p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Student Performance Overview</h3>
                    <p className="text-sm text-gray-500 mb-4">Select a student to view detailed analytics. Showing sample data.</p>
                    <PerformanceCharts />
                </div>
            </div>
            <div className="space-y-8">
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
                <SubscriptionCard currentUser={currentUser} />
                 <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent School-wide Activity</h3>
                  <RecentActivity />
                </div>
            </div>
        </div>
    </div>
  );
};

export default SchoolDashboard;
