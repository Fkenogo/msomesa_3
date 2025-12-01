
import React, { useState, useMemo } from 'react';
import Card from './Card';
import { DocumentTextIcon, SparklesIcon } from './icons';
import { Exam, EducationLevel, ExamMode } from '../types';
import ExamModeSelectionModal from './ExamModeSelectionModal';

const subjectColors: { [key: string]: string } = {
    Mathematics: 'bg-blue-100 text-blue-800',
    English: 'bg-red-100 text-red-800',
    Science: 'bg-green-100 text-green-800',
    SST: 'bg-yellow-100 text-yellow-800',
    Physics: 'bg-indigo-100 text-indigo-800',
    Chemistry: 'bg-purple-100 text-purple-800',
    Biology: 'bg-pink-100 text-pink-800',
};

const difficultyColors: { [key: string]: string } = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
};

interface PastPapersListProps {
    level: EducationLevel;
    onStartExam: (examId: string, mode: ExamMode) => void;
    isPremium: boolean;
    allExams: Exam[];
}

const PastPapersList: React.FC<PastPapersListProps> = ({ level, onStartExam, isPremium, allExams }) => {
    const [selectedLevel, setSelectedLevel] = useState<EducationLevel>(level);
    const [selectedSubject, setSelectedSubject] = useState<string>('All');
    const [selectedYear, setSelectedYear] = useState<string>('All');
    const [selectedType, setSelectedType] = useState<string>('All');
    const [examForModeSelection, setExamForModeSelection] = useState<Exam | null>(null);


    const { levelPapers, availableSubjects, availableYears, availableTypes } = useMemo(() => {
        const papers = allExams.filter(p => p.level === selectedLevel);
        const subjects = ['All', ...new Set(papers.map(p => p.subject))];
        const years = ['All', ...new Set(papers.map(p => p.year.toString()))].sort((a, b) => (b === 'All' ? -1 : a === 'All' ? 1 : Number(b) - Number(a)));
        const types = ['All', ...new Set(papers.map(p => p.type))];
        return { levelPapers: papers, availableSubjects: subjects, availableYears: years, availableTypes: types };
    }, [selectedLevel, allExams]);

    const filteredPapers = useMemo(() => {
        return levelPapers.filter(paper => {
            const subjectMatch = selectedSubject === 'All' || paper.subject === selectedSubject;
            const yearMatch = selectedYear === 'All' || paper.year.toString() === selectedYear;
            const typeMatch = selectedType === 'All' || paper.type === selectedType;
            return subjectMatch && yearMatch && typeMatch;
        });
    }, [levelPapers, selectedSubject, selectedYear, selectedType]);
    
    const papersGroupedBySubject = useMemo(() => {
        return filteredPapers.reduce((acc, paper) => {
            (acc[paper.subject] = acc[paper.subject] || []).push(paper);
            return acc;
        }, {} as Record<string, Exam[]>);
    }, [filteredPapers]);

    const handleLevelChange = (lvl: EducationLevel) => {
        setSelectedLevel(lvl);
        setSelectedSubject('All');
        setSelectedYear('All');
        setSelectedType('All');
    };

    const handleStart = (mode: ExamMode) => {
        if (examForModeSelection) {
            onStartExam(examForModeSelection.id, mode);
            setExamForModeSelection(null);
        }
    };

    return (
        <>
        <Card>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex-shrink-0">Available Past Papers</h2>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
                        {(['PLE', 'UCE', 'UACE'] as EducationLevel[]).map(lvl => (
                            <button
                                key={lvl}
                                onClick={() => handleLevelChange(lvl)}
                                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${selectedLevel === lvl ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-sm"
                    >
                        {availableSubjects.map(subject => (
                            <option key={subject} value={subject}>{subject === 'All' ? 'All Subjects' : subject}</option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-sm"
                    >
                        {availableYears.map(year => (
                            <option key={year} value={year}>{year === 'All' ? 'All Years' : year}</option>
                        ))}
                    </select>
                     <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-sm"
                    >
                        {availableTypes.map(type => (
                            <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {Object.keys(papersGroupedBySubject).length > 0 ? (
                Object.entries(papersGroupedBySubject).map(([subject, papers]) => (
                    <div key={subject} className="mb-6">
                        <h3 className="font-bold text-lg text-gray-700 mb-2">{subject}</h3>
                        <ul className="divide-y divide-gray-200">
                            {papers.map(paper => {
                                const isLocked = !paper.isFree && !isPremium;
                                return (
                                <li key={paper.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div className="flex items-start gap-4 flex-grow">
                                        <div className={`p-2 rounded-lg mt-1 ${subjectColors[paper.subject] || 'bg-gray-100 text-gray-800'}`}>
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
                                    <button 
                                        onClick={() => setExamForModeSelection(paper)} 
                                        disabled={isLocked}
                                        className="mt-3 sm:mt-0 bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0"
                                        title={isLocked ? "Requires Premium Subscription" : "Start Exam"}
                                    >
                                        {isLocked ? 'Locked' : 'Start Exam'}
                                    </button>
                                </li>
                                )}
                            )}
                        </ul>
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-300" />
                    <h3 className="mt-2 text-lg font-medium text-gray-800">No papers found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your filters to find more past papers.
                    </p>
                </div>
            )}
        </Card>
        {examForModeSelection && (
             <ExamModeSelectionModal
                exam={examForModeSelection}
                onStart={handleStart}
                onClose={() => setExamForModeSelection(null)}
            />
        )}
        </>
    );
};

export default PastPapersList;
