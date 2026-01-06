import React, { useState } from 'react';
import Card from './Card';
import { User, UserRole } from '../types';
import { PencilIcon, TrashIcon, PlusCircleIcon, UserCircleIcon } from './icons';
import UserEditModal from './UserEditModal';

interface UserManagementCardProps {
    allUsers: User[];
    onSaveUser: (user: User) => void;
    onDeleteUser: (userId: string) => void;
    onImpersonate: (user: User) => void;
}

const roleColors: Record<UserRole, string> = {
    student: 'bg-blue-100 text-blue-800',
    parent: 'bg-green-100 text-green-800',
    school: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800',
};

const UserManagementCard: React.FC<UserManagementCardProps> = ({ allUsers, onSaveUser, onDeleteUser, onImpersonate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleSave = (user: User) => {
        onSaveUser(user);
        setIsModalOpen(false);
    };

    return (
        <>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">User Management</h2>
                    <button onClick={handleAddClick} className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700">
                        <PlusCircleIcon className="w-5 h-5" />
                        <span>Add User</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map(user => (
                                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 group">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${roleColors[user.role]}`}>{user.role}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-3">
                                            {user.role !== 'admin' && (
                                                <button 
                                                    onClick={() => onImpersonate(user)} 
                                                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 bg-sky-50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Login as this user"
                                                >
                                                    <UserCircleIcon className="w-4 h-4"/>
                                                    Login As
                                                </button>
                                            )}
                                            <button onClick={() => handleEditClick(user)} className="text-gray-400 hover:text-blue-600"><PencilIcon className="w-5 h-5"/></button>
                                            <button onClick={() => onDeleteUser(user.id)} className="text-gray-400 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {isModalOpen && (
                <UserEditModal
                    userToEdit={editingUser}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default UserManagementCard;