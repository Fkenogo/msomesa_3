
import React, 'react';
import { useState, useMemo } from 'react';
import Card from './Card';
import { LinkIcon, UserCircleIcon } from './icons';
import { User, LinkRequest, LinkedAccount, UserRole } from '../types';

interface LinkAccountCardProps {
    currentUser: User;
    allUsers: User[];
    linkRequests: LinkRequest[];
    linkedAccounts: LinkedAccount[];
    onSendRequest: (from: string, to: string) => void;
    onAcceptRequest: (requestId: string) => void;
    onDeclineRequest: (requestId: string) => void;
    onUnlink: (userId1: string, userId2: string) => void;
}

const LinkAccountCard: React.FC<LinkAccountCardProps> = ({ currentUser, allUsers, linkRequests, linkedAccounts, onSendRequest, onAcceptRequest, onDeclineRequest, onUnlink }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const { targetRole, roleName } = useMemo(() => {
        switch (currentUser.role) {
            case 'student':
                return { targetRole: 'parent' as UserRole, roleName: 'Parent' };
            case 'parent':
                return { targetRole: 'student' as UserRole, roleName: 'Child' };
            case 'school':
                return { targetRole: 'student' as UserRole, roleName: 'Student' };
            default:
                return { targetRole: 'student' as UserRole, roleName: 'Student' };
        }
    }, [currentUser.role]);
    
    const {
        myLinkedUserIds,
        myPendingSentRequestUserIds,
        myPendingReceivedRequests,
    } = useMemo(() => {
        const linkedIds = new Set<string>();
        linkedAccounts.forEach(link => {
            if (link.userId1 === currentUser.id) linkedIds.add(link.userId2);
            if (link.userId2 === currentUser.id) linkedIds.add(link.userId1);
        });

        const sentRequestUserIds = new Set<string>();
        const receivedRequests: LinkRequest[] = [];
        linkRequests.forEach(req => {
            if (req.from === currentUser.id) {
                sentRequestUserIds.add(req.to);
            }
            if (req.to === currentUser.id) {
                receivedRequests.push(req);
            }
        });

        return {
            myLinkedUserIds: Array.from(linkedIds),
            myPendingSentRequestUserIds: Array.from(sentRequestUserIds),
            myPendingReceivedRequests: receivedRequests,
        };
    }, [linkedAccounts, linkRequests, currentUser.id]);
    
    const myLinkedUsers = useMemo(() => {
        return allUsers.filter(u => myLinkedUserIds.includes(u.id));
    }, [myLinkedUserIds, allUsers]);

    const searchResults = useMemo(() => {
        if (!searchTerm) return [];

        const lowercasedTerm = searchTerm.toLowerCase();
        
        // Get IDs of users who have sent a request to the current user
        const usersWhoRequestedMeIds = myPendingReceivedRequests.map(req => req.from);

        // Create a set of all user IDs to exclude from the search results
        const exclusionIds = new Set([
            currentUser.id,
            ...myLinkedUserIds,
            ...myPendingSentRequestUserIds,
            ...usersWhoRequestedMeIds,
        ]);

        return allUsers.filter(user =>
            user.role === targetRole && // Only show users of the target role
            !exclusionIds.has(user.id) && // Exclude users in our comprehensive set
            user.name.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm, allUsers, currentUser.id, targetRole, myLinkedUserIds, myPendingSentRequestUserIds, myPendingReceivedRequests]);

    return (
        <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Link with a {roleName}</h2>

            {/* Section for Pending Received Requests */}
            {myPendingReceivedRequests.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Connection Requests</h3>
                    <ul className="space-y-2">
                        {myPendingReceivedRequests.map(req => {
                            const fromUser = allUsers.find(u => u.id === req.from);
                            if (!fromUser) return null;
                            return (
                                <li key={req.id} className="p-2 bg-sky-50 rounded-lg flex justify-between items-center">
                                    <p className="text-sm font-medium text-gray-800">{fromUser.name} wants to connect.</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => onAcceptRequest(req.id)} className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600">Accept</button>
                                        <button onClick={() => onDeclineRequest(req.id)} className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Decline</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
            
            {/* Section for Linked Accounts */}
            {myLinkedUsers.length > 0 && (
                 <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Linked Accounts</h3>
                     <ul className="space-y-2">
                         {myLinkedUsers.map(user => (
                            <li key={user.id} className="p-3 bg-green-50 rounded-lg flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <UserCircleIcon className="w-8 h-8 text-green-500" />
                                    <div>
                                         <p className="font-semibold text-green-800">{user.name}</p>
                                         <p className="text-xs text-green-600 capitalize">{user.role}</p>
                                    </div>
                                </div>
                                 <button onClick={() => onUnlink(currentUser.id, user.id)} className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded hover:bg-red-200">Unlink</button>
                            </li>
                         ))}
                     </ul>
                 </div>
            )}

            {/* Search Section if not linked (or to add more) */}
             <div className="space-y-3">
                <p className="text-sm text-gray-500">Search for a {roleName.toLowerCase()} by name to connect and share progress.</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={`Search for a ${targetRole}...`}
                        className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    />
                </div>
                 {searchResults.length > 0 && (
                    <ul className="mt-2 border-t pt-2 space-y-2">
                        {searchResults.map(user => (
                            <li key={user.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                                <p className="font-medium text-sm">{user.name}</p>
                                <button onClick={() => onSendRequest(currentUser.id, user.id)} className="bg-sky-600 text-white px-3 py-1 text-sm rounded-md hover:bg-sky-700 flex items-center gap-1">
                                    <LinkIcon className="w-4 h-4" />
                                    Connect
                                </button>
                            </li>
                        ))}
                    </ul>
                 )}
            </div>
        </Card>
    );
};

export default LinkAccountCard;
