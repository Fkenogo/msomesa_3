
import React, { useMemo } from 'react';
import PerformanceCharts from '../components/PerformanceCharts';
import RecentActivity from '../components/RecentActivity';
import LinkAccountCard from '../components/LinkAccountCard';
import SubscriptionCard from '../components/SubscriptionCard';
import { User, LinkRequest, LinkedAccount } from '../types';

interface ParentDashboardProps {
    currentUser: User;
    allUsers: User[];
    linkRequests: LinkRequest[];
    linkedAccounts: LinkedAccount[];
    onSendRequest: (from: string, to: string) => void;
    onAcceptRequest: (requestId: string) => void;
    onDeclineRequest: (requestId: string) => void;
    onUnlink: (userId1: string, userId2: string) => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = (props) => {
  const { currentUser } = props;

  const linkedStudent = useMemo(() => {
    const link = props.linkedAccounts.find(l => l.userId1 === currentUser.id || l.userId2 === currentUser.id);
    if (!link) return null;
    const studentId = link.userId1 === currentUser.id ? link.userId2 : link.userId1;
    return props.allUsers.find(u => u.id === studentId && u.role === 'student');
  }, [props.linkedAccounts, props.allUsers, currentUser.id]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Parent Dashboard</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        {linkedStudent ? `${linkedStudent.name}'s Performance` : "Your Child's Performance"}
                    </h3>
                     <p className="text-sm text-gray-500 mb-4">
                        {linkedStudent ? `Viewing analytics for ${linkedStudent.name} (${linkedStudent.level}).` : "Link with your child to see their progress."}
                     </p>
                    {linkedStudent ? <PerformanceCharts /> : (
                        <div className="text-center py-16 text-gray-500">
                            <p>No student linked.</p>
                            <p className="text-sm">Use the 'Link with a Child' card to connect.</p>
                        </div>
                    )}
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {linkedStudent ? `${linkedStudent.name}'s Recent Activity` : "Your Child's Recent Activity"}
                  </h3>
                  <RecentActivity />
                </div>
            </div>
        </div>
    </div>
  );
};

export default ParentDashboard;
