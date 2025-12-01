
import React from 'react';
import DashboardHeader from './DashboardHeader';
import { HomeIcon, AcademicCapIcon, ChartPieIcon, UserCircleIcon, Cog6ToothIcon, SparklesIcon } from './icons';
import { User, UserRole, Notification } from '../types';

interface LayoutProps {
    children: React.ReactNode;
    user: User;
    onLogout: () => void;
    originalRole?: UserRole;
    setViewAsRole?: (role: UserRole | null) => void;
    notifications: Notification[];
    onMarkNotificationRead: (id: string) => void;
}

const NavLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${active ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
        {icon}
        {label}
    </a>
);

const Layout: React.FC<LayoutProps> = (props) => {
    const { children, user } = props;
    
    const navItems = [
        { icon: <HomeIcon className="w-5 h-5"/>, label: 'Dashboard', active: true},
        { icon: <AcademicCapIcon className="w-5 h-5"/>, label: 'My Exams' },
        { icon: <ChartPieIcon className="w-5 h-5"/>, label: 'Analytics' },
        { icon: <UserCircleIcon className="w-5 h-5"/>, label: 'Profile' },
        { icon: <Cog6ToothIcon className="w-5 h-5"/>, label: 'Settings' }
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden lg:flex">
                <div className="flex items-center gap-2 h-20 border-b border-gray-200 px-6">
                    <SparklesIcon className="w-8 h-8 text-sky-500" />
                    <span className="text-xl font-bold text-gray-800">Msomesa</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                   {navItems.map(item => <NavLink key={item.label} {...item} />)}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <DashboardHeader {...props} />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
