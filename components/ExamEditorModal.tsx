
import React, { useState, useEffect, FormEvent } from 'react';
import { Exam, EducationLevel, Question } from '../types';
import { PencilIcon, TrashIcon, PlusCircleIcon } from './icons';
import QuestionEditModal from './QuestionEditModal';

interface ExamEditorModalProps {
    examToEdit: Exam | null;
    onSave: (exam: Exam) => void;
    onClose: () => void;
}

const ExamEditorModal: React.FC<ExamEditorModalProps> = ({ examToEdit, onSave, onClose }) => {
    const [formData, setFormData] = useState<Partial<Exam>>({});
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFeedback, setSearchFeedback] = useState('');
    const [isHighlighting, setIsHighlighting] = useState(false);

    useEffect(() => {
        setFormData(examToEdit || { 
            title: '', 
            subject: 'Mathematics', 
            topic: '',
            year: new Date().getFullYear(), 
            level: 'PLE', 
            isFree: true,
            type: 'Past Paper',
            timeLimit: 150,
            avgScore: 0,
            questions: [],
            description: '',
            difficulty: 'Easy',
        });
        setCurrentQuestionIndex(0);
    }, [examToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        let processedValue: string | number | boolean = value;

        if (type === 'number') {
             processedValue = Number(value);
        }
        
        if (name === 'isFree') {
            const isFreeValue = value === 'true';
            setFormData(prev => ({ 
                ...prev, 
                isFree: isFreeValue, 
                difficulty: isFreeValue ? 'Easy' : prev.difficulty 
            }));
            return;
        }
        
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(formData as Exam);
    };

    // --- Question Handlers ---
    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: `qn-${Date.now()}`,
            questionNumber: (formData.questions?.length || 0) + 1,
            text: '',
            parts: [{
                id: `part-${Date.now()}`,
                text: '',
                marks: 2,
                answer: '',
                explanation: ''
            }]
        };
        setEditingQuestion(newQuestion);
        setIsQuestionModalOpen(true);
    };
    
    const handleEditQuestion = (question: Question) => {
        setEditingQuestion(question);
        setIsQuestionModalOpen(true);
    };

    const handleSaveQuestion = (questionToSave: Question) => {
        const questionExists = formData.questions?.some(q => q.id === questionToSave.id);
        let updatedQuestions;
        if (questionExists) {
            updatedQuestions = formData.questions?.map(q => q.id === questionToSave.id ? questionToSave : q);
        } else {
            updatedQuestions = [...(formData.questions || []), questionToSave];
        }
        setFormData(prev => ({ ...prev, questions: updatedQuestions }));
        
        const newIndex = updatedQuestions.findIndex(q => q.id === questionToSave.id);
        if (newIndex !== -1) {
            setCurrentQuestionIndex(newIndex);
        }

        setIsQuestionModalOpen(false);
        setEditingQuestion(null);
    };

    const handleDeleteQuestion = (questionId: string) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            const updatedQuestions = formData.questions?.filter(q => q.id !== questionId) || [];
            setFormData(prev => ({...prev, questions: updatedQuestions }));

            if (currentQuestionIndex >= updatedQuestions.length && updatedQuestions.length > 0) {
                setCurrentQuestionIndex(updatedQuestions.length - 1);
            }
        }
    };
    
    const handleSearch = () => {
        if (!searchQuery.trim() || !formData.questions) return;
        const query = searchQuery.toLowerCase().trim();
        const foundIndex = formData.questions.findIndex(q => {
            const qNumMatch = q.questionNumber.toString() === query.replace(/^q#?\s?/i, '');
            const qTextMatch = q.text?.toLowerCase().includes(query);
            const pTextMatch = q.parts.some(p => p.text?.toLowerCase().includes(query));
            return qNumMatch || qTextMatch || pTextMatch;
        });

        if (foundIndex !== -1) {
            setCurrentQuestionIndex(foundIndex);
            setSearchFeedback(`Showing result for: "${searchQuery}"`);
            setIsHighlighting(true);
            setTimeout(() => setIsHighlighting(false), 1500);
        } else {
            setSearchFeedback('No question found matching your search.');
        }
        setTimeout(() => setSearchFeedback(''), 3000);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const currentQuestion = formData.questions?.[currentQuestionIndex];

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[90vh]">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-800">
                            {examToEdit ? 'Edit Exam' : 'Add New Exam'}
                        </h2>
                    </div>
                    <div className="p-6 flex-grow overflow-y-auto space-y-6">
                        {/* Exam Metadata Section */}
                        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
                            <legend className="px-2 font-semibold text-gray-700">Exam Details</legend>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600">Title</label>
                                <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required className="mt-1 w-full input-style" />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600">Description</label>
                                <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={2} className="mt-1 w-full input-style" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Subject</label>
                                <input type="text" name="subject" value={formData.subject || ''} onChange={handleChange} required className="mt-1 w-full input-style" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Topic (e.g. Algebra)</label>
                                <input type="text" name="topic" value={formData.topic || ''} onChange={handleChange} className="mt-1 w-full input-style" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Year</label>
                                <input type="number" name="year" value={formData.year || ''} onChange={handleChange} required className="mt-1 w-full input-style" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Level</label>
                                <select name="level" value={formData.level || 'PLE'} onChange={handleChange} required className="mt-1 w-full input-style bg-white">
                                    <option value="PLE">PLE</option><option value="UCE">UCE</option><option value="UACE">UACE</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Type</label>
                                <select name="type" value={formData.type || 'Past Paper'} onChange={handleChange} required className="mt-1 w-full input-style bg-white">
                                    <option value="Past Paper">Past Paper</option><option value="Practice Paper">Practice Paper</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-600">Access</label>
                                <select name="isFree" value={String(formData.isFree) || 'true'} onChange={handleChange} required className="mt-1 w-full input-style bg-white">
                                    <option value="true">Free</option><option value="false">Premium</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-600">Difficulty</label>
                                <select name="difficulty" value={formData.difficulty || 'Easy'} onChange={handleChange} required disabled={formData.isFree} className="mt-1 w-full input-style bg-white disabled:bg-gray-100">
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Time Limit (mins)</label>
                                <input type="number" name="timeLimit" value={formData.timeLimit || ''} onChange={handleChange} required className="mt-1 w-full input-style" />
                            </div>
                        </fieldset>

                        {/* Question Management Section */}
                        <fieldset className="border p-4 rounded-md">
                            <legend className="px-2 font-semibold text-gray-700">Questions ({formData.questions?.length || 0})</legend>
                            
                            <div className="mb-2">
                                <div className="flex gap-2">
                                    <input 
                                        type="text"
                                        placeholder="Search Qn # or text..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                        className="w-full input-style"
                                    />
                                    <button type="button" onClick={handleSearch} className="bg-gray-200 text-gray-700 px-4 rounded-md hover:bg-gray-300 text-sm font-semibold">Search</button>
                                </div>
                                <p className="text-xs text-gray-500 h-4 mt-1 transition-opacity">{searchFeedback}</p>
                            </div>


                            <div className={`min-h-[80px] p-4 rounded-lg flex flex-col justify-center transition-all duration-300 ${isHighlighting ? 'ring-2 ring-sky-400 bg-sky-100' : 'bg-gray-50'}`}>
                                {currentQuestion ? (
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-medium text-gray-800 flex-grow pr-4">Q{currentQuestion.questionNumber}: {currentQuestion.text}</p>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <button type="button" onClick={() => handleEditQuestion(currentQuestion)} className="text-gray-400 hover:text-blue-600" title="Edit Question"><PencilIcon className="w-5 h-5"/></button>
                                                <button type="button" onClick={() => handleDeleteQuestion(currentQuestion.id)} className="text-gray-400 hover:text-red-600" title="Delete Question"><TrashIcon className="w-5 h-5"/></button>
                                            </div>
                                        </div>
                                        {currentQuestion.imageUrl && <img src={currentQuestion.imageUrl} alt="Question visual" className="mt-2 rounded max-h-40 border" />}
                                    </div>
                                ) : (
                                    <p className="text-center text-sm text-gray-500">No questions yet. Add one below.</p>
                                )}
                            </div>

                            {formData.questions && formData.questions.length > 1 && (
                                <div className="flex justify-between items-center mt-2">
                                    <button type="button" onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0} className="text-sm font-medium text-sky-600 disabled:text-gray-400 disabled:cursor-not-allowed px-3 py-1 rounded hover:bg-sky-50">
                                        &larr; Previous
                                    </button>
                                    <span className="text-xs text-gray-500 font-mono">{currentQuestionIndex + 1} / {formData.questions.length}</span>
                                    <button type="button" onClick={() => setCurrentQuestionIndex(i => i + 1)} disabled={currentQuestionIndex === (formData.questions?.length || 0) - 1} className="text-sm font-medium text-sky-600 disabled:text-gray-400 disabled:cursor-not-allowed px-3 py-1 rounded hover:bg-sky-50">
                                        Next &rarr;
                                    </button>
                                </div>
                            )}
                             
                             <button type="button" onClick={handleAddQuestion} className="mt-4 w-full flex items-center justify-center gap-2 text-sm bg-sky-100 text-sky-700 font-semibold py-2 rounded-lg hover:bg-sky-200">
                                <PlusCircleIcon className="w-5 h-5" />
                                Add New Question
                            </button>
                        </fieldset>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end gap-3 flex-shrink-0">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-700">Save Exam</button>
                    </div>
                </form>
            </div>
        </div>
        
        {isQuestionModalOpen && editingQuestion && (
            <QuestionEditModal 
                question={editingQuestion}
                onSave={handleSaveQuestion}
                onClose={() => setIsQuestionModalOpen(false)}
            />
        )}

        <style>{`.input-style { padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; }`}</style>
        </>
    );
};

export default ExamEditorModal;
