import React, { useState, useMemo } from 'react';
import PublicLayout from '../components/PublicLayout';
import { DocumentTextIcon, SparklesIcon, ShareIcon } from '../components/icons';
import { Exam, EducationLevel, AuthMode } from '../types';

type PublicPage = 'landing' | 'past-papers' | 'practice-papers' | 'pricing';

interface ExamListPageProps {
    pageType: 'Past Paper' | 'Practice Paper';
    allExams: Exam[];
    onNavigateToAuth: (mode?: AuthMode) => void;
    onNavigate: (page: PublicPage) => void;
}

const subjectColors: { [key: string]: string } = {
    Mathematics: 'bg-blue-100 text-blue-800', English: 'bg-red-100 text-red-800',
    Science: 'bg-green-100 text-green-800', SST: 'bg-yellow-100 text-yellow-800',
    Physics: 'bg-indigo-100 text-indigo-800', Chemistry: 'bg-purple-100 text-purple-800',
    Biology: 'bg-pink-100 text-pink-800',
};

const difficultyColors: { [key: string]: string } = {
    Easy: 'bg-green-100 text-green-800', Medium: 'bg-yellow-100 text-yellow-800', Hard: 'bg-red-100 text-red-800',
};

const ExamListPage: React.FC<ExamListPageProps> = ({ pageType, allExams, onNavigateToAuth, onNavigate }) => {
    const [selectedLevel, setSelectedLevel] = useState<EducationLevel | 'All'>('All');
    const [selectedSubject, setSelectedSubject] = useState<string>('All');
    const [selectedYear, setSelectedYear] = useState<string>('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const papersForType = useMemo(() => allExams.filter(e => e.type === pageType), [allExams, pageType]);

    const { availableSubjects, availableYears } = useMemo(() => {
        const papers = selectedLevel === 'All' ? papersForType : papersForType.filter(p => p.level === selectedLevel);
        const subjects = ['All', ...new Set(papers.map(p => p.subject))];
        const years = ['All', ...new Set(papers.map(p => p.year.toString()))].sort((a, b) => (b === 'All' ? -1 : a === 'All' ? 1 : Number(b) - Number(a)));
        return { availableSubjects: subjects, availableYears: years };
    }, [selectedLevel, papersForType]);

    const filteredPapers = useMemo(() => {
        const lowercasedQuery = searchQuery.toLowerCase().trim();
        return papersForType.filter(paper => {
            const levelMatch = selectedLevel === 'All' || paper.level === selectedLevel;
            const subjectMatch = selectedSubject === 'All' || paper.subject === selectedSubject;
            const yearMatch = selectedYear === 'All' || paper.year.toString() === selectedYear;
            const difficultyMatch = selectedDifficulty === 'All' || paper.difficulty === selectedDifficulty;
            
            const searchMatch = !lowercasedQuery ||
                paper.title.toLowerCase().includes(lowercasedQuery) ||
                paper.subject.toLowerCase().includes(lowercasedQuery) ||
                paper.year.toString().includes(lowercasedQuery);

            return levelMatch && subjectMatch && yearMatch && difficultyMatch && searchMatch;
        });
    }, [papersForType, selectedLevel, selectedSubject, selectedYear, selectedDifficulty, searchQuery]);

    const handleShare = async (exam: Exam) => {
        const shareData = {
            title: `Msomesa Exam: ${exam.title}`,
            text: `Check out this exam paper, "${exam.title} (${exam.year})", on Msomesa! It's a great resource for exam prep.`,
            url: window.location.href, // Using current page URL as a placeholder
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                alert('Link copied to clipboard! You can now share it.');
            }
        } catch (err) {
            console.error('Error sharing:', err);
            // This can happen if the user cancels the share dialog, so no need for an aggressive alert.
        }
    };

    return (
        <PublicLayout onNavigateToAuth={onNavigateToAuth} onNavigate={onNavigate}>
            <main className="container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">{pageType}s</h1>
                    <p className="mt-2 text-lg text-gray-600">Browse our collection of {pageType.toLowerCase()}s to sharpen your skills.</p>
                </div>

                {/* Filters */}
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 mb-8 sticky top-20 z-40">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="md:col-span-5">
                            <label className="block text-sm font-bold text-gray-700 mb-2 text-center md:text-left">Find Exams by Your Level</label>
                             <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {(['All', 'PLE', 'UCE', 'UACE'] as const).map(level => (
                                    <button key={level} onClick={() => setSelectedLevel(level)} className={`px-6 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${selectedLevel === level ? 'bg-[#6C5CE7] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700">Search Exams</label>
                            <input
                                id="search-filter"
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="e.g., Mathematics, 2023..."
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            />
                        </div>
                         <div className="col-span-1 md:col-span-1">
                            <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700">Subject</label>
                            <select id="subject-filter" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                {availableSubjects.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="col-span-1 md:col-span-1">
                             <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700">Year</label>
                             <select id="year-filter" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                {availableYears.map(y => <option key={y}>{y}</option>)}
                            </select>
                        </div>
                        <div className="col-span-1 md:col-span-1">
                            <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-700">Difficulty</label>
                            <select id="difficulty-filter" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="All">All</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Exam List */}
                {filteredPapers.length > 0 ? (
                    <ul className="space-y-4">
                        {filteredPapers.map(paper => (
                             <li key={paper.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between sm:items-center">
                                <div className="flex items-start gap-4 flex-grow">
                                    <div className={`p-2 rounded-lg mt-1 flex-shrink-0 ${subjectColors[paper.subject] || 'bg-gray-100 text-gray-800'}`}>
                                        <DocumentTextIcon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-semibold text-gray-800">{paper.title} ({paper.year})</p>
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${difficultyColors[paper.difficulty]}`}>{paper.difficulty}</span>
                                            {!paper.isFree && <span className="px-2 py-0.5 text-xs font-semibold text-amber-800 bg-amber-100 rounded-full flex items-center gap-1"><SparklesIcon className="w-3 h-3"/>Premium</span>}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{paper.description}</p>
                                    </div>
                                </div>
                                <div className="mt-3 sm:mt-0 ml-0 sm:ml-4 flex items-center gap-2 flex-shrink-0">
                                    <button onClick={() => handleShare(paper)} title="Share this exam" className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-sky-600 transition-colors">
                                        <ShareIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onNavigateToAuth()} className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors text-sm">
                                        Start Exam
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-300" />
                        <h3 className="mt-4 text-lg font-medium text-gray-800">No Papers Found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your filters or check back later for new content.
                        </p>
                    </div>
                )}
            </main>
        </PublicLayout>
    );
};

export default ExamListPage;
