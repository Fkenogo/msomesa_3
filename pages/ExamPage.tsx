import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Exam, Question, ExamMode, QuestionPart } from '../types';
import Card from '../components/Card';
import QuestionReviewCard from '../components/QuestionReviewCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, XCircleIcon, EyeIcon, SparklesIcon } from '../components/icons';
import { getAIExplanation, getIncorrectAnswerFeedback, checkAnswerWithAI } from '../services/geminiService';
import MarkdownRenderer from '../components/MarkdownRenderer';

// --- Practice Mode Part Component ---
const PracticePart: React.FC<{ part: QuestionPart; onAttempt: (isCorrect: boolean) => void; questionText: string; pdfSummary?: string }> = ({ part, onAttempt, questionText, pdfSummary }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [isAttempted, setIsAttempted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [aiExplanation, setAiExplanation] = useState<string | null>(null);
    const [isLoadingAiExplanation, setIsLoadingAiExplanation] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [aiCheckFeedback, setAiCheckFeedback] = useState<string | null>(null);
    const [showOpenEnded, setShowOpenEnded] = useState(false);

    const handleCheckAnswer = async () => {
        if (!userAnswer.trim()) {
            alert("Please enter an answer.");
            return;
        }

        setIsChecking(true);
        setAiCheckFeedback(null);

        // 1. Quick local check for an exact match (fast path)
        const isExactMatch = userAnswer.trim().toLowerCase() === part.answer.trim().toLowerCase();
        if (isExactMatch) {
            setIsCorrect(true);
            setIsAttempted(true);
            onAttempt(true);
            setIsChecking(false);
            return;
        }

        // 2. If no exact match, use AI for semantic check
        try {
            const result = await checkAnswerWithAI(
                `${questionText} ${part.text}`, 
                part.answer, 
                userAnswer, 
                part.explanation || ''
            );
            
            setIsCorrect(result.isCorrect);
            setAiCheckFeedback(result.feedback);
            setIsAttempted(true);
            onAttempt(result.isCorrect);

        } catch (error) {
            // Fallback to strict checking if AI fails
            console.error("AI check failed, falling back to strict check", error);
            const isStrictlyCorrect = userAnswer.trim().toLowerCase() === part.answer.trim().toLowerCase();
            setIsCorrect(isStrictlyCorrect);
            setAiCheckFeedback("AI check failed. Your answer was compared literally.");
            setIsAttempted(true);
            onAttempt(isStrictlyCorrect);
        } finally {
            setIsChecking(false);
        }
    };
    
    const fetchAiExplanation = useCallback(async () => {
        if (aiExplanation) return;
        setIsLoadingAiExplanation(true);
        try {
            const context = `Question Stem: ${questionText}\nSub-question: ${part.text}`;
            const fetched = await getAIExplanation(context, part.answer, part.explanation, pdfSummary);
            setAiExplanation(fetched);
        } catch (error) {
            setAiExplanation("Sorry, couldn't load an AI explanation at this time.");
        } finally {
            setIsLoadingAiExplanation(false);
        }
    }, [aiExplanation, part, questionText, pdfSummary]);
    
    const fetchIncorrectFeedback = useCallback(async () => {
        if (feedback) return;
        setIsLoadingFeedback(true);
        try {
            const context = `Question Stem: ${questionText}\nSub-question: ${part.text}`;
            const fetched = await getIncorrectAnswerFeedback(context, part.answer, userAnswer, part.explanation);
            setFeedback(fetched);
        } catch (error) {
            setFeedback("Sorry, couldn't load feedback for your answer.");
        } finally {
            setIsLoadingFeedback(false);
        }
    }, [feedback, part, userAnswer, questionText]);

    if (part.answerType === 'open-ended') {
        return (
             <div key={part.id} className="mt-4 border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-1">{part.text}</p>
                {!showOpenEnded && (
                    <button onClick={() => setShowOpenEnded(true)} className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg text-sm">
                        Reveal Model Answer
                    </button>
                )}
                {showOpenEnded && (
                    <div className="mt-3 text-sm animate-fade-in">
                        <div className="p-4 bg-gray-50 rounded-lg max-w-none">
                            <h4 className="font-bold text-gray-700 mb-2">Model Answer & Explanation</h4>
                            <MarkdownRenderer text={part.explanation || "No explanation provided."} />
                        </div>
                    </div>
                )}
                <style>{`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.5s ease; }`}</style>
            </div>
        )
    }

    return (
        <div key={part.id} className="mt-4 border-t pt-4">
            <label htmlFor={`answer-${part.id}`} className="block text-sm font-medium text-gray-700 mb-1">{part.text}</label>
            <div className="flex items-center gap-2">
                 <input
                    id={`answer-${part.id}`}
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={isAttempted || isChecking}
                    className="mt-1 w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 disabled:bg-gray-100"
                />
                {!isAttempted && 
                    <button onClick={handleCheckAnswer} disabled={isChecking} className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg text-sm disabled:bg-sky-300 w-24 text-center">
                        {isChecking ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                        ) : 'Check'}
                    </button>
                }
                {isAttempted && (isCorrect ? <CheckCircleIcon className="w-7 h-7 text-green-500"/> : <XCircleIcon className="w-7 h-7 text-red-500"/>)}
            </div>

            {aiCheckFeedback && (
                <div className={`mt-2 text-xs p-2 rounded-md ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    <strong>AI Marker:</strong> {aiCheckFeedback}
                </div>
            )}

            {isAttempted && (
                <div className="mt-3 text-sm" >
                    {!isCorrect && (
                        <p className="font-semibold mb-3">Correct Answer: <span className="font-mono bg-green-100 text-green-800 px-1 rounded">{part.answer}</span></p>
                    )}

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-bold text-gray-700 not-prose mb-2">Explanation</h4>
                        <MarkdownRenderer text={part.explanation} />
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-4">
                        <details onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) fetchAiExplanation(); }}>
                            <summary className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer animate-pulse-slow list-none">
                                <SparklesIcon className="w-5 h-5" /> Need a better explanation? Ask AI Tutor
                            </summary>
                            <div className="mt-2 p-4 bg-sky-50 rounded-lg">
                                {isLoadingAiExplanation ? "Loading AI explanation..." : <MarkdownRenderer text={aiExplanation} />}
                            </div>
                        </details>

                        {!isCorrect && (
                            <details onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) fetchIncorrectFeedback(); }}>
                                <summary className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer list-none">
                                    <SparklesIcon className="w-5 h-5" /> Why was my answer wrong?
                                </summary>
                                <div className="mt-2 p-4 bg-orange-50 rounded-lg">
                                    {isLoadingFeedback ? "Loading personalized feedback..." : <MarkdownRenderer text={feedback} />}
                                </div>
                            </details>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};


interface ExamPageProps {
    exam: Exam;
    onExit: (result?: { score: number, total: number }) => void;
    mode: ExamMode;
    isPreview?: boolean;
    onPartAttempt: (questionPartId: string, examId: string, isCorrect: boolean) => void;
}

type ExamStatus = 'taking' | 'submitted' | 'reviewing';

const ExamPage: React.FC<ExamPageProps> = ({ exam, onExit, mode, isPreview = false, onPartAttempt }) => {
    const { questions } = exam;
    const [status, setStatus] = useState<ExamStatus>('taking');
    const [currentQnIndex, setCurrentQnIndex] = useState(0);
    const [reviewQnIndex, setReviewQnIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(exam.timeLimit * 60);
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

    const handleSubmit = useCallback((confirm = true) => {
        if (isPreview) {
            onExit();
            return;
        }
        if (confirm && !window.confirm('Are you sure you want to submit your answers?')) {
            return;
        }

        // For simulation mode, log all attempts on submission
        if (mode === 'simulation' && !isPreview) {
             questions.forEach(q => {
                q.parts.forEach(p => {
                    const answer = userAnswers[p.id] || "";
                    const isCorrect = answer.trim().toLowerCase() === p.answer.trim().toLowerCase();
                    onPartAttempt(p.id, exam.id, isCorrect);
                });
            });
        }

        setStatus('submitted');
    }, [isPreview, onExit, mode, userAnswers, questions, exam.id, onPartAttempt]);

    useEffect(() => {
        if (status === 'taking' && questions.length > 0 && !isPreview && mode === 'simulation') {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        handleSubmit(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [status, questions, handleSubmit, isPreview, mode]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (status !== 'taking') return;
            if (event.key === 'ArrowRight') {
                setCurrentQnIndex(i => Math.min(questions.length - 1, i + 1));
            } else if (event.key === 'ArrowLeft') {
                setCurrentQnIndex(i => Math.max(0, i - 1));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status, questions.length]);

    const handleAnswerChange = (partId: string, answer: string) => {
        setUserAnswers(prev => ({ ...prev, [partId]: answer }));
    };
    
    const totalParts = useMemo(() => questions.reduce((sum, q) => sum + q.parts.length, 0), [questions]);
    const answeredPartsCount = useMemo(() => Object.values(userAnswers).filter(ans => ans.trim() !== '').length, [userAnswers]);

    const score = useMemo(() => {
        if (isPreview) return 0;
        let correctCount = 0;
        questions.forEach(q => {
            q.parts.forEach(p => {
                // FIX: Handle case where userAnswers[p.id] is undefined by providing a default empty string.
                if ((userAnswers[p.id] || '').trim().toLowerCase() === p.answer.trim().toLowerCase()) {
                    correctCount++;
                }
            });
        });
        return correctCount;
    }, [userAnswers, questions, isPreview]);
    
    const finishAndExit = () => {
        onExit(mode === 'simulation' ? { score, total: totalParts } : undefined);
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    if (questions.length === 0) {
        return (
             <div className="p-4 sm:p-8 max-w-4xl mx-auto">
                 <Card className="text-center">
                    <h1 className="text-2xl font-bold">Exam Content Missing</h1>
                    <p className="mt-2 text-gray-600">This exam currently has no questions. Please contact an administrator.</p>
                     <div className="mt-6">
                        <button onClick={() => onExit()} className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg">Back to Dashboard</button>
                    </div>
                 </Card>
             </div>
        )
    }
    
    const breadcrumbItems = [
        { label: 'Dashboard', href: '#' },
        { label: 'Exams', href: '#' },
        { label: exam.title }
    ];

    if (status === 'submitted' || status === 'reviewing') {
        const reviewedQuestion = questions[reviewQnIndex];
        const incorrectCount = answeredPartsCount - score;
        const unansweredCount = totalParts - answeredPartsCount;

        return (
            <div className="p-4 sm:p-8 max-w-4xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} onBreadcrumbClick={() => onExit()} />
                <Card>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Exam Results</h1>
                        <p className="text-gray-600">{exam.title} - {exam.year}</p>
                    </div>
                     <div className="my-8 flex flex-col sm:flex-row justify-around items-center text-center gap-8">
                        <div>
                            <p className="text-lg font-medium text-gray-500">Your Score</p>
                            <p className="text-6xl font-bold text-sky-600">{score} / {totalParts}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="text-green-600"><p className="text-3xl font-bold">{score}</p><p className="text-sm">Correct</p></div>
                            <div className="text-red-500"><p className="text-3xl font-bold">{incorrectCount}</p><p className="text-sm">Incorrect</p></div>
                            <div className="text-gray-500"><p className="text-3xl font-bold">{unansweredCount}</p><p className="text-sm">Unanswered</p></div>
                        </div>
                    </div>
                    <div className="flex justify-center flex-wrap gap-4 border-t pt-6">
                        <button onClick={() => setStatus('reviewing')} className="bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg">Review Answers</button>
                         {exam.explanationPdfUrl && (
                            <button onClick={() => setIsPdfModalOpen(true)} className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700">View PDF Explanation</button>
                        )}
                        <button onClick={finishAndExit} className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg">Finish</button>
                    </div>
                </Card>
                {status === 'reviewing' && (
                     <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Reviewing Question {reviewQnIndex + 1} of {questions.length}</h2>
                            <button onClick={() => setStatus('submitted')} className="text-sm font-medium text-gray-600 hover:text-sky-700">Back to results</button>
                        </div>
                        <QuestionReviewCard key={reviewedQuestion.id} question={reviewedQuestion} userAnswers={userAnswers} pdfSummary={exam.pdfSummary}/>
                        <div className="mt-4 flex justify-between">
                            <button onClick={() => setReviewQnIndex(i => i - 1)} disabled={reviewQnIndex === 0} className="flex items-center gap-2 bg-white text-gray-700 font-semibold px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50">
                                <ChevronLeftIcon className="w-5 h-5" /> Previous
                            </button>
                            <button onClick={() => setReviewQnIndex(i => i + 1)} disabled={reviewQnIndex === questions.length - 1} className="flex items-center gap-2 bg-white text-gray-700 font-semibold px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50">
                                Next <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                     </div>
                )}
                {isPdfModalOpen && exam.explanationPdfUrl && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
                            <header className="p-4 border-b flex justify-between items-center flex-shrink-0">
                                <h2 className="text-lg font-bold">PDF Explanation</h2>
                                <button onClick={() => setIsPdfModalOpen(false)} className="text-gray-500 hover:text-gray-800 font-bold text-2xl leading-none">&times;</button>
                            </header>
                            <div className="flex-grow p-2"><iframe src={exam.explanationPdfUrl} title="PDF Explanation" className="w-full h-full border-0"></iframe></div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
    const currentQuestion = questions[currentQnIndex];
    const progress = ((currentQnIndex + 1) / questions.length) * 100;

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} onBreadcrumbClick={() => onExit()} />
            {isPreview && (
                <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded-lg flex items-center gap-3">
                    <EyeIcon className="w-6 h-6"/>
                    <p className="font-semibold">You are in Preview Mode. Answers will not be saved.</p>
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-sky-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
            </div>
            <header className="flex justify-between items-center mb-4">
                 <div>
                    <h1 className="text-xl sm:text-2xl font-bold">{exam.title} - {exam.year}</h1>
                    <p className="text-sm font-semibold text-gray-500 capitalize">{mode} Mode</p>
                 </div>
                <div className="flex items-center gap-4">
                    {mode === 'simulation' && !isPreview && (
                        <span className="font-mono text-xl bg-gray-800 text-white px-3 py-1 rounded-lg shadow-inner">{formatTime(timeLeft)}</span>
                    )}
                     {mode === 'simulation' && isPreview && (
                         <span className="font-mono text-xl bg-gray-200 text-gray-600 px-3 py-1 rounded-lg">Timer Disabled</span>
                    )}
                    <button onClick={() => onExit()} className="text-sm font-medium text-gray-600 hover:text-red-600">Exit</button>
                </div>
            </header>
            
            <div className="bg-white rounded-xl shadow-sm p-6 relative">
                 <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-sm font-semibold px-3 py-1 rounded-full">
                    Question {currentQnIndex + 1} of {questions.length}
                </div>
                <div className="prose max-w-none">
                    {currentQuestion.text && <MarkdownRenderer text={currentQuestion.text} />}
                    {currentQuestion.imageUrl && <img src={currentQuestion.imageUrl} alt="Question illustration" className="my-4 rounded-md border" />}
                    {currentQuestion.table && (
                         <div className="my-4 overflow-x-auto">
                             <table className="w-full text-sm text-left text-gray-500 border">
                                 <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                     <tr>
                                         {currentQuestion.table.headers.map(header => <th key={header} scope="col" className="px-6 py-3 border-b">{header}</th>)}
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {currentQuestion.table.rows.map((row, rowIndex) => (
                                         <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                                             {row.map((cell, cellIndex) => <td key={cellIndex} className={`px-6 py-4 ${cellIndex === 0 ? 'font-medium text-gray-900' : ''}`}>{cell}</td>)}
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                    )}
                </div>

                <div className="mt-6 space-y-6">
                    {currentQuestion.parts.map(part => (
                        mode === 'simulation' ? (
                            <div key={part.id}>
                                <label htmlFor={`answer-${part.id}`} className="block text-sm font-medium text-gray-700 mb-1">{part.text}</label>
                                <input
                                    id={`answer-${part.id}`}
                                    type="text"
                                    value={userAnswers[part.id] || ''}
                                    onChange={(e) => handleAnswerChange(part.id, e.target.value)}
                                    className="mt-1 w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                                />
                            </div>
                        ) : (
                           <PracticePart 
                                key={part.id} 
                                part={part} 
                                onAttempt={(isCorrect) => onPartAttempt(part.id, exam.id, isCorrect)}
                                questionText={currentQuestion.text} 
                                pdfSummary={exam.pdfSummary} 
                           />
                        )
                    ))}
                </div>
            </div>

            <footer className="mt-6 flex justify-between items-center">
                <button onClick={() => setCurrentQnIndex(i => Math.max(0, i - 1))} disabled={currentQnIndex === 0} className="flex items-center gap-2 bg-white text-gray-700 font-semibold px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50">
                    <ChevronLeftIcon className="w-5 h-5" /> Previous
                </button>
                
                {currentQnIndex === questions.length - 1 ? (
                     <button onClick={() => (mode === 'simulation' ? handleSubmit(true) : onExit())} className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700">
                        {mode === 'simulation' ? (isPreview ? 'End Preview' : 'Submit Exam') : 'Finish Practice'}
                    </button>
                ) : (
                    <button onClick={() => setCurrentQnIndex(i => Math.min(questions.length - 1, i + 1))} className="flex items-center gap-2 bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-700">
                        Next <ChevronRightIcon className="w-5 h-5" />
                    </button>
                )}
            </footer>
        </div>
    );
};

export default ExamPage;