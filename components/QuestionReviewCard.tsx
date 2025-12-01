
import React, { useState, useCallback } from 'react';
import { Question, QuestionPart } from '../types';
import Card from './Card';
import { SparklesIcon, CheckCircleIcon, XCircleIcon } from './icons';
import { getAIExplanation, generateImageFromDescription, getIncorrectAnswerFeedback } from '../services/geminiService';

interface QuestionReviewCardProps {
    question: Question;
    userAnswers: Record<string, string>;
    pdfSummary?: string;
}

const PartReview: React.FC<{ part: QuestionPart; userAnswer: string; questionText: string; pdfSummary?: string }> = ({ part, userAnswer, questionText, pdfSummary }) => {
    const [aiExplanation, setAiExplanation] = useState<string | null>(null);
    const [isLoadingAiExplanation, setIsLoadingAiExplanation] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

    const isCorrect = userAnswer.trim().toLowerCase() === part.answer.trim().toLowerCase();

    const fetchAiExplanation = useCallback(async () => {
        if (aiExplanation) return;
        setIsLoadingAiExplanation(true);
        try {
            const context = `Question Stem: ${questionText}\nSub-question: ${part.text}`;
            const fetchedExplanation = await getAIExplanation(context, part.answer, part.explanation, pdfSummary);
            setAiExplanation(fetchedExplanation);
        } catch (error) {
            setAiExplanation("Sorry, couldn't load an explanation.");
        } finally {
            setIsLoadingAiExplanation(false);
        }
    }, [aiExplanation, part, questionText, pdfSummary]);

    const fetchIncorrectFeedback = useCallback(async () => {
        if (feedback) return;
        setIsLoadingFeedback(true);
        try {
            const context = `Question Stem: ${questionText}\nSub-question: ${part.text}`;
            const fetchedFeedback = await getIncorrectAnswerFeedback(context, part.answer, userAnswer, part.explanation);
            setFeedback(fetchedFeedback);
        } catch (error) {
            setFeedback("Sorry, couldn't load feedback for your answer.");
        } finally {
            setIsLoadingFeedback(false);
        }
    }, [feedback, part, userAnswer, questionText]);

    return (
        <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="font-semibold text-gray-800">{part.text}</p>
            
            {isCorrect ? (
                <div className="mt-4 p-3 rounded-md bg-green-50 border border-green-200 text-green-800 flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold">Correct!</p>
                        <p className="text-sm">Your answer: <span className="font-mono bg-green-100 px-1 rounded">{userAnswer}</span></p>
                    </div>
                </div>
            ) : (
                <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200">
                    <div className="flex items-start gap-3">
                        <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <h4 className="font-semibold text-red-800">Incorrect</h4>
                    </div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm ml-9">
                        <div>
                            <p className="font-bold text-gray-700">Your Answer:</p>
                            <p className="mt-1 p-2 bg-white rounded font-mono text-red-700 break-words border border-red-200">{userAnswer || "No answer"}</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">Correct Answer:</p>
                            <p className="mt-1 p-2 bg-white rounded font-mono text-green-700 break-words border border-green-200">{part.answer}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="prose prose-sm mt-4 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap max-w-none">
                <h4 className="font-bold text-gray-700 not-prose mb-2">Explanation</h4>
                <p>{part.explanation || "No standard explanation provided for this question."}</p>
            </div>

            <div className="mt-4 text-sm flex items-center gap-4 flex-wrap">
                <details onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) fetchAiExplanation(); }}>
                    <summary className="cursor-pointer font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1">
                        <SparklesIcon className="w-4 h-4" /> Need a better explanation? Ask AI Tutor
                    </summary>
                    <div className="prose prose-sm mt-2 p-4 bg-sky-50 rounded-lg whitespace-pre-wrap max-w-none">
                        {isLoadingAiExplanation ? "Loading AI explanation..." : (aiExplanation || 'Click to load AI explanation.')}
                    </div>
                </details>

                {!isCorrect && (
                    <details onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) fetchIncorrectFeedback(); }}>
                        <summary className="cursor-pointer font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                             <SparklesIcon className="w-4 h-4" /> Why was my answer wrong?
                        </summary>
                         <div className="prose prose-sm mt-2 p-4 bg-orange-50 rounded-lg whitespace-pre-wrap max-w-none">
                             {isLoadingFeedback ? "Loading personalized feedback..." : (feedback || 'Click to load feedback.')}
                        </div>
                    </details>
                )}
            </div>
        </div>
    );
};

const QuestionReviewCard: React.FC<QuestionReviewCardProps> = ({ question, userAnswers, pdfSummary }) => {
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

    return (
        <Card className="mb-4">
            <div className="prose max-w-none">
                <p className="font-bold text-gray-900 text-lg">{question.questionNumber}. {question.text}</p>
                
                {(question.imageUrl || generatedImageUrl) && (
                    <div className="my-4 border rounded-md p-2 flex justify-center bg-gray-50">
                        <img src={generatedImageUrl || question.imageUrl} alt="Question illustration" className="max-h-60" />
                    </div>
                )}
                {isLoadingImage && <p className="text-sm text-center text-gray-500 my-4">Generating diagram...</p>}

                {question.table && (
                     <div className="my-4 overflow-x-auto">
                         <table className="w-full text-sm text-left text-gray-500 border">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                 <tr>
                                     {question.table.headers.map(header => <th key={header} scope="col" className="px-6 py-3 border-b">{header}</th>)}
                                 </tr>
                             </thead>
                             <tbody>
                                 {question.table.rows.map((row, rowIndex) => (
                                     <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                                         {row.map((cell, cellIndex) => <td key={cellIndex} className={`px-6 py-4 ${cellIndex === 0 ? 'font-medium text-gray-900' : ''}`}>{cell}</td>)}
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>
                )}
            </div>


            <div className="space-y-2">
                {question.parts.map(part => (
                    <PartReview 
                        key={part.id} 
                        part={part} 
                        userAnswer={userAnswers[part.id] || "No answer"}
                        questionText={question.text}
                        pdfSummary={pdfSummary}
                    />
                ))}
            </div>
        </Card>
    );
};

export default QuestionReviewCard;