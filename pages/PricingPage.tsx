import React from 'react';
import PublicLayout from '../components/PublicLayout';
import { AuthMode } from '../types';
import { CheckCircleIcon, SparklesIcon, ChatBubbleLeftRightIcon, BuildingOfficeIcon, ChevronRightIcon } from '../components/icons';

type PublicPage = 'landing' | 'past-papers' | 'practice-papers' | 'pricing';
interface PricingPageProps {
    onNavigateToAuth: (mode?: AuthMode) => void;
    onNavigate: (page: PublicPage) => void;
}

const PricingFeature: React.FC<{ text: string; included?: boolean }> = ({ text, included = true }) => (
    <li className="flex items-start gap-3">
        {included ? (
            <CheckCircleIcon className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
        ) : (
            <span className="w-5 h-5 flex items-center justify-center text-gray-300 font-bold flex-shrink-0 mt-0.5">✕</span>
        )}
        <span className={`text-sm ${included ? 'text-gray-700' : 'text-gray-400'}`}>{text}</span>
    </li>
);

const PricingPage: React.FC<PricingPageProps> = ({ onNavigateToAuth, onNavigate }) => {
    return (
        <PublicLayout onNavigateToAuth={onNavigateToAuth} onNavigate={onNavigate}>
            <main className="bg-gray-50 pb-20">
                {/* Header Section */}
                <section className="pt-16 pb-10 px-6 text-center">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice how you want.</h1>
                        <p className="text-gray-600 text-lg font-medium">Upgrade anytime.</p>
                    </div>
                </section>

                {/* Pricing Tiers Container */}
                <div className="container mx-auto px-4 max-w-md space-y-6">
                    
                    {/* Standard Price Card (Premium Access) */}
                    <div className="bg-white rounded-2xl shadow-xl border-2 border-sky-500 overflow-hidden relative">
                        <div className="bg-sky-500 text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
                            Recommended
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-2xl font-bold text-gray-900">Premium Access</h2>
                                <SparklesIcon className="w-6 h-6 text-amber-400" />
                            </div>
                            <p className="text-gray-600 text-sm mb-4">Best for students preparing seriously for exams.</p>
                            
                            <div className="mb-6">
                                <span className="text-3xl font-extrabold text-gray-900">UGX 20,000</span>
                                <span className="text-gray-500 font-medium"> / month</span>
                            </div>
                            
                            <p className="font-bold text-gray-800 mb-4">Unlimited exam practice.</p>
                            
                            <ul className="space-y-3 mb-8">
                                <PricingFeature text="Unlimited access to all past exam papers" />
                                <PricingFeature text="Full step-by-step explanations for every question" />
                                <PricingFeature text="Real exam timing and scoring" />
                                <PricingFeature text="Progress tracking over time" />
                                <PricingFeature text="Parent access to results and performance" />
                            </ul>

                            <button 
                                onClick={() => onNavigateToAuth('signup-student')}
                                className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-sky-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                👉 Go Standard
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4 italic">Cancel anytime</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-2">
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="text-gray-400 font-bold text-sm">OR</span>
                        <div className="flex-grow h-px bg-gray-200"></div>
                    </div>

                    {/* Pay-Per-Paper Card */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
                        <h2 className="text-xl font-bold text-gray-900">Pay per paper</h2>
                        <div className="mt-2 mb-4">
                            <span className="text-2xl font-bold text-gray-900">UGX 2,000</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">One full past exam.</p>
                        
                        <ul className="space-y-2 mb-6 border-t pt-4">
                            <PricingFeature text="Instant score" />
                            <PricingFeature text="Full detailed explanations" />
                            <li className="flex items-start gap-3">
                                <span className="w-5 h-5 flex items-center justify-center text-amber-500 font-bold flex-shrink-0 mt-0.5">⚠</span>
                                <span className="text-xs text-amber-600 font-medium italic">Max 2 papers per month</span>
                            </li>
                        </ul>

                        <button 
                            onClick={() => onNavigateToAuth('login')}
                            className="w-full bg-white text-gray-800 border-2 border-gray-200 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                        >
                            👉 Buy this paper
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-3 italic">Standard is cheaper if you practice often</p>
                    </div>

                    {/* Free Trial Card */}
                    <div className="bg-gray-100 rounded-2xl p-8 border border-dashed border-gray-300">
                        <h2 className="text-xl font-bold text-gray-800">Free trial</h2>
                        <p className="text-sm text-gray-600 mb-4">Try 1 full exam.</p>
                        
                        <div className="space-y-4 mb-6">
                            <ul className="space-y-2">
                                <PricingFeature text="Instant score" />
                                <PricingFeature text="Sample explanations" />
                            </ul>
                            <div className="pt-2 border-t border-gray-200">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Does not include</p>
                                <ul className="space-y-1">
                                    <PricingFeature text="Repeat attempts" included={false} />
                                    <PricingFeature text="Progress tracking" included={false} />
                                    <PricingFeature text="Parent dashboard" included={false} />
                                </ul>
                            </div>
                        </div>

                        <button 
                            onClick={() => onNavigateToAuth('signup-student')}
                            className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-400 transition-all active:scale-95"
                        >
                            👉 Start free trial
                        </button>
                    </div>

                    {/* For Parents Section */}
                    <div className="pt-10 pb-6">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-sky-100 rounded-lg text-sky-600">
                                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">👨‍👩‍👧 For Parents</h2>
                        </div>
                        <p className="text-gray-700 mb-4">Msomesa helps you:</p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex gap-2 text-sm text-gray-600 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                                <span>See how often your child practices</span>
                            </li>
                            <li className="flex gap-2 text-sm text-gray-600 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                                <span>Understand weak areas</span>
                            </li>
                            <li className="flex gap-2 text-sm text-gray-600 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                                <span>Track improvement over time</span>
                            </li>
                        </ul>
                        <p className="font-bold text-gray-800 italic">No guesswork. Just results.</p>
                    </div>

                    {/* Schools Section */}
                    <div className="bg-sky-50 rounded-2xl p-8 border border-sky-100">
                        <div className="flex items-center gap-3 mb-3">
                            <BuildingOfficeIcon className="w-6 h-6 text-sky-600" />
                            <h2 className="text-xl font-bold text-gray-900">🏫 Schools & Institutions</h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            We offer special plans for schools. Bulk access. Student performance reports.
                        </p>
                        <button className="text-sky-600 font-bold text-sm hover:underline flex items-center gap-1">
                            👉 Contact us to learn more
                        </button>
                    </div>

                    {/* FAQ Section */}
                    <div className="pt-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">❓Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Can I upgrade anytime?</h3>
                                <p className="text-sm text-gray-600">Yes. Upgrade or cancel whenever you want.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Do I need a credit card?</h3>
                                <p className="text-sm text-gray-600">No. Pay using Mobile Money.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Can one account be used by multiple students?</h3>
                                <p className="text-sm text-gray-600">Each student needs their own account for accurate tracking.</p>
                            </div>
                        </div>
                    </div>

                    {/* One Last Thing */}
                    <div className="pt-12 pb-10 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">One Last Thing</h2>
                        <p className="text-gray-600 mb-6 italic">Exams reward practice. Msomesa makes practice simple.</p>
                        <button 
                            onClick={() => onNavigateToAuth()}
                            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-black transition-all active:scale-95"
                        >
                            👉 Get Started
                        </button>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default PricingPage;
