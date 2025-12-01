
import React from 'react';
import { SparklesIcon, BookOpenIcon, ChartBarIcon, ArrowTrendingUpIcon, BuildingOfficeIcon, UsersIcon, WrenchIcon, AcademicCapIcon } from '../components/icons';
import PublicLayout from '../components/PublicLayout';

type PublicPage = 'landing' | 'past-papers' | 'practice-papers' | 'pricing';
interface LandingPageProps {
    onNavigateToAuth: () => void;
    onNavigate: (page: PublicPage) => void;
}


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToAuth, onNavigate }) => {

    return (
        <PublicLayout onNavigateToAuth={onNavigateToAuth} onNavigate={onNavigate}>
            <main>
                {/* Hero Section */}
                <section id="home" className="relative bg-gray-900 text-white py-24 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-gray-900"></div>
                     <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#6C5CE7]/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
                     <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#2D98DA]/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
                    <div className="container mx-auto text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                            Ace Your Ugandan National Exams with Msomesa
                        </h1>
                        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
                            Your Ultimate Exam Prep Partner for PLE, UCE & UACE. Access thousands of past papers, receive instant feedback, and learn from detailed AI-powered explanations to boost your exam performance.
                        </p>
                        <button onClick={onNavigateToAuth} className="mt-10 px-8 py-4 bg-gradient-to-r from-[#6C5CE7] to-[#2D98DA] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105 transform">
                            Get Started
                        </button>
                         <p className="mt-4 text-sm text-gray-400">Start Learning for Free</p>
                    </div>
                </section>
                
                {/* How It Works */}
                <section className="py-20 px-6">
                     <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-12">Get Started in 3 Simple Steps</h2>
                        <div className="grid md:grid-cols-3 gap-10 relative">
                             <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 hidden md:block z-0"></div>
                             <StepCard number="1" title="Create Your Account" description="Quickly sign up as a student, parent, or school to get started." />
                             <StepCard number="2" title="Choose Your Exam" description="Select from a vast library of past papers and choose your study mode." />
                             <StepCard number="3" title="Learn & Improve" description="Get instant feedback, review explanations, and watch your scores climb." />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 px-6 bg-gray-50">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">A Smarter Way to Prepare</h2>
                            <p className="mt-2 text-gray-500">Everything you need to succeed in one place.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={<WrenchIcon className="w-6 h-6 text-[#2D98DA]" />} title="AI-Powered Tutoring" description="Get instant, step-by-step explanations for every question. Understand the 'why' behind every answer." />
                            <FeatureCard icon={<BookOpenIcon className="w-6 h-6 text-[#2D98DA]" />} title="Practice & Simulation" description="Choose between a stress-free Practice Mode with instant feedback or a timed Exam Simulation to test your skills." />
                            <FeatureCard icon={<ChartBarIcon className="w-6 h-6 text-[#2D98DA]" />} title="Smart Review System" description="Our spaced repetition system identifies your weak spots and creates personalized review sessions to reinforce learning." />
                            <FeatureCard icon={<ArrowTrendingUpIcon className="w-6 h-6 text-[#2D98DA]" />} title="Performance Analytics" description="Track your progress with detailed charts. See your scores improve over time and identify areas for focus." />
                        </div>
                    </div>
                </section>
                
                 {/* Who We Serve */}
                <section className="py-20 px-6">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">Why Msomesa Works for Everyone</h2>
                            <p className="mt-2 text-gray-500">Personalized solutions that drive academic success.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <WhoCard icon={<AcademicCapIcon className="w-8 h-8"/>} title="For Students" points={['Practice with real exam questions', 'Track your progress and weak spots', 'Get instant feedback and AI explanations', 'Build confidence consistently']} color="purple" />
                            <WhoCard icon={<UsersIcon className="w-8 h-8"/>} title="For Parents" points={["Monitor your child's progress", 'Identify learning gaps early', 'Provide targeted support', 'Affordable access to quality resources']} color="blue" />
                            <WhoCard icon={<BuildingOfficeIcon className="w-8 h-8"/>} title="For Schools" points={["Assess students' exam readiness", 'Generate detailed performance reports', 'Supplement your curriculum', 'Improve overall student outcomes']} color="green" />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-gradient-to-r from-[#6C5CE7] to-[#2D98DA] text-white py-20 px-6">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold">Ready to Ace Your Exams?</h2>
                        <p className="mt-2 max-w-xl mx-auto">Join thousands of students who have improved their exam scores with Msomesa.</p>
                        <button onClick={onNavigateToAuth} className="mt-6 px-8 py-3 bg-white text-[#6C5CE7] font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-transform hover:scale-105">
                            Get Started Now
                        </button>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
};

// Helper Components
const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

const WhoCard: React.FC<{ icon: React.ReactNode, title: string, points: string[], color: 'purple' | 'blue' | 'green' }> = ({ icon, title, points, color }) => {
    const colors = {
        purple: 'bg-[#6C5CE7]/10 text-[#6C5CE7]',
        blue: 'bg-[#2D98DA]/10 text-[#2D98DA]',
        green: 'bg-green-500/10 text-green-600',
    };
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
             <div className={`w-14 h-14 rounded-full flex items-center justify-center ${colors[color]} mb-4`}>{icon}</div>
             <h3 className="font-bold text-xl mb-4">{title}</h3>
             <ul className="space-y-3 text-left">
                {points.map((p, i) => <li key={i} className="flex items-start gap-3"><CheckMark color={color} /> <span className="text-sm text-gray-600">{p}</span></li>)}
             </ul>
        </div>
    );
};

const StepCard: React.FC<{ number: string, title: string, description: string }> = ({ number, title, description }) => (
    <div className="relative bg-white px-4 z-10">
        <div className="mx-auto w-16 h-16 bg-[#2D98DA]/10 text-[#2D98DA] font-bold text-2xl rounded-full flex items-center justify-center mb-4 border-2 border-white">{number}</div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

const CheckMark: React.FC<{ size?: number; color?: 'purple' | 'blue' | 'green' }> = ({ size = 5, color = 'purple' }) => {
    const colors = { purple: 'text-[#6C5CE7]', blue: 'text-[#2D98DA]', green: 'text-green-500' };
    return (
        <svg className={`w-${size} h-${size} ${colors[color]} flex-shrink-0 mt-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    );
};

export default LandingPage;
