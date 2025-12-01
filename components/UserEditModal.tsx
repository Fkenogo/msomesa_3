
import React, { useState, useEffect, FormEvent } from 'react';
import { User, UserRole } from '../types';

interface UserEditModalProps {
    userToEdit: User | null;
    onSave: (user: User) => void;
    onClose: () => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ userToEdit, onSave, onClose }) => {
    const [formData, setFormData] = useState<Partial<User>>({});

    useEffect(() => {
        // Pre-fill form if we are editing an existing user
        setFormData(userToEdit || { name: '', email: '', role: 'student' });
    }, [userToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(formData as User);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-800">
                            {userToEdit ? 'Edit User' : 'Add New User'}
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Role</label>
                            <select
                                name="role"
                                value={formData.role || 'student'}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white"
                            >
                                <option value="student">Student</option>
                                <option value="parent">Parent</option>
                                <option value="school">School</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-700">
                            Save User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditModal;
