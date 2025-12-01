
import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, ChevronDownIcon, EyeIcon } from './icons';
import { User, UserRole, Notification } from '../types';

interface DashboardHeaderProps {
    user: User;
    onLogout: () => void;
    originalRole?: UserRole;
    setViewAsRole?: (role: UserRole | null) => void;
    notifications?: Notification[];
    onMarkNotificationRead?: (id: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onLogout, originalRole, setViewAsRole, notifications = [], onMarkNotificationRead }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const adminRole = originalRole || user.role;
  
  const userNotifications = notifications.filter(n => n.userId === user.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
            setUserDropdownOpen(false);
        }
        if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
            setNotificationsOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (id: string) => {
    if (onMarkNotificationRead) {
        onMarkNotificationRead(id);
    }
  };

  return (
    <>
    <header className="flex justify-end items-center h-20 px-8 bg-white border-b border-gray-200">
      <div className="flex items-center gap-6">
        {adminRole === 'admin' && setViewAsRole && (
             <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-600 bg-gray-100 px-3 py-2 rounded-lg">
                    <EyeIcon className="w-5 h-5"/>
                    <span>Switch View</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button onClick={() => setViewAsRole(null)} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button onClick={() => setViewAsRole('student')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View as Student</button>
                    <button onClick={() => setViewAsRole('parent')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View as Parent</button>
                    <button onClick={() => setViewAsRole('school')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View as School</button>
                </div>
            </div>
        )}
        <div className="relative" ref={notificationsRef}>
            <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative text-gray-500 hover:text-sky-600">
            <BellIcon className="w-6 h-6" />
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-white">
                    {unreadCount}
                </span>
            )}
            </button>
             {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 border">
                    <div className="p-3 font-semibold text-sm border-b">Notifications</div>
                    <ul className="py-1 max-h-80 overflow-y-auto">
                        {userNotifications.length > 0 ? userNotifications.map(n => (
                            <li key={n.id} onClick={() => handleNotificationClick(n.id)} className="cursor-pointer">
                                <a className={`block px-4 py-3 text-sm hover:bg-gray-100 ${!n.read ? 'bg-sky-50' : ''}`}>
                                    <p className={`text-gray-700 ${!n.read ? 'font-semibold' : ''}`}>{n.text}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(n.date).toLocaleString()}</p>
                                </a>
                            </li>
                        )) : (
                            <li className="px-4 py-3 text-sm text-gray-500 text-center">No notifications</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
        <div className="relative" ref={userDropdownRef}>
            <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 cursor-pointer">
                <img src={user.avatarUrl || `https://i.pravatar.cc/40?u=${user.email}`} alt="User avatar" className="w-10 h-10 rounded-full" />
                <span className="text-sm font-semibold hidden sm:inline">{user.name.split(' (')[0]}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button onClick={onLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        Logout
                    </button>
                </div>
            )}
        </div>
      </div>
    </header>
    {originalRole === 'admin' && user.role !== 'admin' && (
        <div className="bg-yellow-100 border-b-2 border-yellow-300 text-yellow-800 text-sm font-semibold text-center py-2 sticky top-0 z-10">
            You are currently viewing the platform as a {user.role}. <button onClick={() => setViewAsRole && setViewAsRole(null)} className="underline font-bold">Return to Admin Dashboard</button>
        </div>
    )}
    </>
  );
};

export default DashboardHeader;
