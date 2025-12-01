
import React, { useState } from 'react';
import PublicLayout from '../components/PublicLayout';

type PublicPage = 'landing' | 'past-papers' | 'practice-papers' | 'pricing';
interface PricingPageProps {
    onNavigateToAuth: () => void;
    onNavigate: (page: PublicPage) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onNavigateToAuth, onNavigate }) => {
    const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annual'>('monthly');

    return (
        <PublicLayout onNavigateToAuth={onNavigateToAuth} onNavigate={onNavigate}>
            <main>
                <section id="pricing" className="py-20 px-6 bg-gray-50">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Choose Your Perfect Plan</h2>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Flexible options for students, parents, and schools. Start for free to experience the full power of Msomesa.</p>
                        <div className="flex justify-center items-center gap-4 mb-12">
                            <span className={`font-semibold ${pricingPlan === 'monthly' ? 'text-[#6C5CE7]' : 'text-gray-500'}`}>Monthly</span>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={pricingPlan === 'annual'} onChange={() => setPricingPlan(p => p === 'monthly' ? 'annual' : 'monthly')} className="sr-only peer" />
                                <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#6C5CE7]"></div>
                            </label>
                            <span className={`font-semibold ${pricingPlan === 'annual' ? 'text-[#6C5CE7]' : 'text-gray-500'}`}>
                                Annual <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Save 2 months!</span>
                            </span>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                            <PricingCard 
                                title="Free Trial" 
                                subtitle="Try Before You Buy" 
                                price="0" 
                                features={['Full access to first 3 past papers per level', 'Preview exam structure', 'Experience full features', 'No credit card required']} 
                                onSelect={onNavigateToAuth} 
                                cta="Start Free Trial"
                            />
                             <PricingCard 
                                title="Premium Package" 
                                subtitle="For Serious Achievers" 
                                price={pricingPlan === 'monthly' ? '20,000' : '16,667'} 
                                features={['Everything in Basic, plus:', 'AI tutor with detailed explanations', 'AI chatbot for personalized Q&A', 'Customized AI-assisted revisions', 'Detailed analytics & weak area ID', 'Progress tracking dashboard']} 
                                featured 
                                onSelect={onNavigateToAuth}
                                cta="Go Premium"
                            />
                            <PricingCard 
                                title="Basic Package" 
                                subtitle="For Dedicated Students" 
                                price={pricingPlan === 'monthly' ? '10,000' : '8,333'} 
                                features={['Unlimited past exam papers', 'Unlimited practice papers', 'Answer feedback & instant scoring', 'Basic performance analytics', 'Leaderboard rankings & badges', 'Performance challenges']} 
                                onSelect={onNavigateToAuth}
                                cta="Get Started"
                            />
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8 items-stretch mt-8 max-w-4xl mx-auto">
                           <SmallPricingCard title="Pay-per-Paper" subtitle="Flexible Access" price="1,500" per="per paper" features={['Access to one specific paper', 'Answer key included', 'Score performance tracking']} cta="Buy Single Paper" onSelect={onNavigateToAuth} />
                           <SmallPricingCard title="Schools Package" subtitle="For Institutions" price="5,000" per="/student/month" features={['Unlimited papers & sets (min 50 students)', 'Bulk student management', 'Progress monitoring dashboard']} cta="Contact Us" onSelect={onNavigateToAuth} />
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
};

// Helper Components
const PricingCard: React.FC<{ title: string, subtitle: string, price: string, features: string[], cta: string, featured?: boolean, onSelect: () => void }> = ({ title, subtitle, price, features, cta, featured, onSelect }) => (
    <div className={`flex flex-col p-8 rounded-xl border ${featured ? 'bg-white border-[#6C5CE7] shadow-2xl relative' : 'bg-white border-gray-200'}`}>
        {featured && <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#6C5CE7] text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{subtitle}</p>
        <p className="text-4xl font-extrabold mb-1">UGX {price}<span className="text-base font-medium text-gray-500">{price !== "0" && "/month"}</span></p>
        <ul className="text-left space-y-3 my-8 flex-grow">
            {features.map((feat, i) => <li key={i} className="flex items-start gap-3"><CheckMark /><span>{feat}</span></li>)}
        </ul>
        <button onClick={onSelect} className={`w-full py-3 font-bold rounded-lg transition-colors ${featured ? 'bg-[#6C5CE7] text-white hover:bg-opacity-90' : 'bg-blue-100 text-[#2D98DA] hover:bg-blue-200'}`}>
           {cta}
        </button>
    </div>
);

const SmallPricingCard: React.FC<{ title: string, subtitle: string, price: string, per: string, features: string[], cta: string, onSelect: () => void }> = ({ title, subtitle, price, per, features, cta, onSelect }) => (
     <div className="p-6 bg-white rounded-xl border border-gray-200 text-left flex flex-col">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{subtitle}</p>
        <p className="font-bold text-xl">{price} UGX <span className="text-sm font-normal">{per}</span></p>
        <ul className="text-xs space-y-2 my-4 flex-grow">
            {features.map((feat, i) => <li key={i} className="flex items-start gap-2"><CheckMark size={4}/><span>{feat}</span></li>)}
        </ul>
        <button onClick={onSelect} className="w-full py-2 text-sm bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">{cta}</button>
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

export default PricingPage;
