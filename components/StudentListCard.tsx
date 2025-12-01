

import React, { useMemo } from 'react';
import Card from './Card';
import { ChevronRightIcon } from './icons';
import { User, LinkedAccount } from '../types';

interface StudentListCardProps {
    currentUser: User;
    allUsers: User[];
    linkedAccounts: LinkedAccount[];
}

const StudentListCard: React.FC<StudentListCardProps> = ({ currentUser, allUsers, linkedAccounts }) => {
    
    const linkedStudents = useMemo(() => {
        const studentIds = new Set<string>();
        linkedAccounts.forEach(link => {
            if (link.userId1 === currentUser.id) studentIds.add(link.userId2);
            if (link.userId2 === currentUser.id) studentIds.add(link.userId1);
        });

        return allUsers.filter(user => user.role === 'student' && studentIds.has(user.id));
    }, [currentUser, allUsers, linkedAccounts]);

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Linked Students ({linkedStudents.length})</h2>
                <a href="#" className="text-sm font-medium text-sky-600 hover:text-sky-800">View All</a>
            </div>
            {linkedStudents.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {linkedStudents.map((student) => (
                        <li key={student.id} className="py-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <img src={`https://picsum.photos/seed/${student.name}/40/40`} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-700">{student.name}</p>
                                    <p className="text-sm text-gray-500">{student.level}</p>
                                </div>
                            </div>
                            <a href="#" className="text-gray-400 hover:text-sky-600">
                                <ChevronRightIcon className="w-5 h-5" />
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 py-8">No students are linked to this school account yet.</p>
            )}
        </Card>
    );
};

export default StudentListCard;