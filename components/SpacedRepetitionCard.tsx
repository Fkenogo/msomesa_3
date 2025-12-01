
import React, { useMemo } from 'react';
import Card from './Card';
import { User, Exam, QuestionHistoryItem, Question } from '../types';
import { SparklesIcon } from './icons';

interface SpacedRepetitionCardProps {
    currentUser: User;
    allExams: Exam[];
    onStartReview: (exam: Exam) => void;
}

const SpacedRepetitionCard: React.FC<SpacedRepetitionCardProps> = ({ currentUser, allExams, onStartReview }) => {
    
    const dueForReview = useMemo(() => {
        const now = new Date();
        return (currentUser.questionHistory || [])
            .filter(item => new Date(item.nextReview) <= now)
            .sort((a, b) => (a.streak - b.streak) || (new Date(a.lastAttempt).getTime() - new Date(b.lastAttempt).getTime()));
    }, [currentUser.questionHistory]);

    const handleStart = () => {
        if (dueForReview.length === 0) return;

        // Take top 10 or all if less than 10
        const sessionItems = dueForReview.slice(0, 10);
        
        const questionMap = new Map<string, Question>();

        sessionItems.forEach(item => {
            const exam = allExams.find(e => e.id === item.examId);
            if (!exam) return;

            for (const q of exam.questions) {
                if (q.parts.some(p => p.id === item.questionPartId)) {
                    if (!questionMap.has(q.id)) {
                        questionMap.set(q.id, { ...q, parts: [] });
                    }
                    const question = questionMap.get(q.id);
                    const part = q.parts.find(p => p.id === item.questionPartId);
                    if (question && part && !question.parts.some(p => p.id === part.id)) {
                        question.parts.push(part);
                    }
                    break; 
                }
            }
        });
        
        const reviewQuestions = Array.from(questionMap.values());
        
        if(reviewQuestions.length > 0) {
            const reviewExam: Exam = {
                id: `review-${Date.now()}`,
                title: "Spaced Repetition Review",
                subject: "Mixed",
                year: new Date().getFullYear(),
                level: currentUser.level || 'PLE',
                timeLimit: 0,
                questionCount: reviewQuestions.length,
                avgScore: 0,
                isFree: true,
                type: 'Practice Paper',
                questions: reviewQuestions,
                difficulty: 'Easy',
            };
            onStartReview(reviewExam);
        } else {
            alert("Could not prepare a review session. Please try again later.");
        }
    };

    return (
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold">Smart Review</h2>
                    <p className="text-indigo-200 mt-1">Spaced Repetition System</p>
                </div>
                <SparklesIcon className="w-8 h-8 text-yellow-300" />
            </div>
            <div className="text-center my-6">
                <p className="text-5xl font-bold">{dueForReview.length}</p>
                <p className="text-indigo-200">questions due for review</p>
            </div>
            <button
                onClick={handleStart}
                disabled={dueForReview.length === 0}
                className="w-full bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors disabled:bg-indigo-400 disabled:text-indigo-200 disabled:cursor-not-allowed"
            >
                Start Review Session
            </button>
        </Card>
    );
};

export default SpacedRepetitionCard;
