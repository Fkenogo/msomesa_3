
import React from 'react';
import { SparklesIcon } from './icons';

type PublicPage = 'landing' | 'past-papers' | 'practice-papers' | 'pricing';

interface PublicLayoutProps {
    children: React.ReactNode;
    onNavigateToAuth: () => void;
    onNavigate: (page: PublicPage) => void;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onNavigateToAuth, onNavigate }) => {
    return (
         <div className="bg-white text-gray-800 font-sans antialiased">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
                        <SparklesIcon className="w-8 h-8 text-[#6C5CE7]" />
                        <span className="text-xl font-bold">Msomesa</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                         <button onClick={() => onNavigate('landing')} className="text-sm font-medium text-gray-600 hover:text-[#6C5CE7] transition-colors">Home</button>
                         <button onClick={() => onNavigate('past-papers')} className="text-sm font-medium text-gray-600 hover:text-[#6C5CE7] transition-colors">Past Papers</button>
                         <button onClick={() => onNavigate('practice-papers')} className="text-sm font-medium text-gray-600 hover:text-[#6C5CE7] transition-colors">Practice Papers</button>
                         <button onClick={() => onNavigate('pricing')} className="text-sm font-medium text-gray-600 hover:text-[#6C5CE7] transition-colors">Pricing</button>
                    </nav>
                    <div className="flex items-center gap-2">
                        <button onClick={onNavigateToAuth} className="text-sm font-semibold text-[#2D98DA] hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">Sign In</button>
                        <button onClick={onNavigateToAuth} className="text-sm font-semibold bg-[#6C5CE7] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg">Get Started</button>
                    </div>
                </div>
            </header>
            
            {children}

            {/* Footer */}
            <footer className="bg-[#1E293B] text-gray-300 py-12 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <SparklesIcon className="w-8 h-8 text-white" />
                                <span className="text-xl font-bold text-white">Msomesa</span>
                            </div>
                             <p className="text-sm text-gray-400 mt-2">Transforming the way we learn.</p>
                        </div>
                        <FooterLinks title="Quick Links" links={['PLE Papers', 'UCE Papers', 'UACE Papers']} onNavigate={onNavigate}/>
                        <FooterLinks title="Resources" links={['About Us', 'Pricing', 'Contact']} onNavigate={onNavigate}/>
                        <FooterLinks title="Support" links={['FAQ', 'Terms of Service', 'Privacy Policy']} onNavigate={onNavigate}/>
                    </div>
                    <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-700 pt-8">
                        &copy; {new Date().getFullYear()} Msomesa. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};


// FIX: Destructure onNavigate from props to make it available in the component.
const FooterLinks: React.FC<{title: string, links: string[], onNavigate: (page: PublicPage) => void}> = ({ title, links, onNavigate }) => {
    const handleFooterClick = (link: string) => {
        const page = link.toLowerCase().replace(' ', '-') as PublicPage;
        if (['pricing'].includes(page)) {
            onNavigate(page);
        } else if (link.includes('Papers')) {
            onNavigate('past-papers');
        }
    };
    
    return (
        <div>
            <h4 className="font-semibold text-white mb-4">{title}</h4>
            <ul className="space-y-2">
                {links.map(link => <li key={link}><button onClick={() => handleFooterClick(link)} className="text-sm text-gray-400 hover:text-white">{link}</button></li>)}
            </ul>
        </div>
    );
}

export default PublicLayout;
