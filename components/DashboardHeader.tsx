import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, ChevronDownIcon, EyeIcon, UserCircleIcon, AcademicCapIcon, UsersIcon, BuildingOfficeIcon } from './icons';
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
  const [switchViewOpen, setSwitchViewOpen] = useState(false);
  
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const switchViewRef = useRef<HTMLDivElement>(null);
  
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
        if (switchViewRef.current && !switchViewRef.current.contains(event.target as Node)) {
            setSwitchViewOpen(false);
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

  const handleRoleSwitch = (role: UserRole | null) => {
    if (setViewAsRole) {
        setViewAsRole(role);
        setSwitchViewOpen(false);
    }
  };

  return (
    <div className="sticky top-0 z-30">
        <header className="flex justify-end items-center h-20 px-8 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center gap-4 sm:gap-6">
                {/* Role Switcher Tool */}
                {adminRole === 'admin' && setViewAsRole && (
                    <div className="relative" ref={switchViewRef}>
                        <button 
                            onClick={() => setSwitchViewOpen(!switchViewOpen)}
                            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-all ${switchViewOpen ? 'bg-sky-600 text-white' : 'text-gray-600 hover:text-sky-600 bg-gray-100'}`}
                            aria-haspopup="true"
                            aria-expanded={switchViewOpen}
                        >
                            <EyeIcon className="w-5 h-5"/>
                            <span className="hidden sm:inline">Switch View</span>
                        </button>
                        
                        {switchViewOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 ring-1 ring-black ring-opacity-5 animate-fade-in">
                                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Select View Mode</div>
                                <button onClick={() => handleRoleSwitch(null)} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600"><UserCircleIcon className="w-5 h-5"/></div>
                                    <span className="font-semibold">Full Admin Dashboard</span>
                                </button>
                                <div className="border-t border-gray-50 my-1"></div>
                                <button onClick={() => handleRoleSwitch('student')} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><AcademicCapIcon className="w-5 h-5"/></div>
                                    <span className="font-semibold">View as Student</span>
                                </button>
                                <button onClick={() => handleRoleSwitch('parent')} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><UsersIcon className="w-5 h-5"/></div>
                                    <span className="font-semibold">View as Parent</span>
                                </button>
                                <button onClick={() => handleRoleSwitch('school')} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><BuildingOfficeIcon className="w-5 h-5"/></div>
                                    <span className="font-semibold">View as School</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                    <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative text-gray-400 hover:text-sky-600 transition-colors p-2 rounded-full hover:bg-gray-50">
                        <BellIcon className="w-6 h-6" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-extrabold text-white ring-2 ring-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5">
                            <div className="px-4 py-3 font-bold text-sm bg-gray-50 border-b flex justify-between items-center text-gray-700">
                                <span>Notifications</span>
                                {unreadCount > 0 && <span className="px-2 py-0.5 bg-sky-100 text-sky-700 rounded-full text-xs">{unreadCount} New</span>}
                            </div>
                            <ul className="py-1 max-h-80 overflow-y-auto">
                                {userNotifications.length > 0 ? userNotifications.map(n => (
                                    <li key={n.id} onClick={() => handleNotificationClick(n.id)} className="cursor-pointer">
                                        <div className={`px-4 py-3 text-sm hover:bg-sky-50 transition-colors border-b border-gray-50 last:border-0 ${!n.read ? 'bg-sky-50/50' : ''}`}>
                                            <p className={`text-gray-700 leading-snug ${!n.read ? 'font-semibold' : ''}`}>{n.text}</p>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tight">{new Date(n.date).toLocaleString()}</p>
                                        </div>
                                    </li>
                                )) : (
                                    <li className="px-4 py-12 text-sm text-gray-400 text-center flex flex-col items-center gap-2">
                                        <BellIcon className="w-8 h-8 opacity-20" />
                                        <span>All caught up!</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="relative" ref={userDropdownRef}>
                    <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors">
                        <div className="relative">
                            <img src={user.avatarUrl || `https://i.pravatar.cc/40?u=${user.email}`} alt="User avatar" className="w-9 h-9 rounded-full ring-2 ring-gray-100 shadow-inner" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="hidden sm:flex flex-col items-start leading-none text-left">
                            <span className="text-sm font-bold text-gray-800">{user.name.split(' (')[0]}</span>
                            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">{user.role}</span>
                        </div>
                        <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {userDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 ring-1 ring-black ring-opacity-5">
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium">Profile Settings</a>
                            <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium">Billing & Plans</a>
                            <div className="border-t border-gray-50 my-1"></div>
                            <button onClick={onLogout} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors">
                                Logout Session
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
        
        {/* Role Switch Notice Banner */}
        {originalRole === 'admin' && user.role !== 'admin' && (
            <div className="bg-yellow-400 border-b border-yellow-500 text-yellow-950 text-xs font-black tracking-wide text-center py-2.5 flex items-center justify-center gap-3 shadow-sm animate-slide-down">
                <span className="bg-yellow-950/10 px-2 py-0.5 rounded text-[10px] uppercase">Simulation active</span>
                <span>You are currently viewing as a <span className="uppercase">{user.role}</span></span>
                <button 
                    onClick={() => handleRoleSwitch(null)} 
                    className="bg-yellow-950 text-white px-3 py-1 rounded-md text-[10px] font-black uppercase hover:bg-black transition-colors"
                >
                    Exit View
                </button>
            </div>
        )}
        <style>{`
            @keyframes fade-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fade-in 0.2s ease-out; }
            .animate-slide-down { animation: slide-down 0.3s ease-out; }
        `}</style>
    </div>
  );
};

export default DashboardHeader;