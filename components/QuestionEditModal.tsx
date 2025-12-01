
import React, { useState, useEffect, FormEvent } from 'react';
import { Question, QuestionPart } from '../types';
import { TrashIcon, PlusCircleIcon } from './icons';

interface QuestionEditModalProps {
    question: Question;
    onSave: (question: Question) => void;
    onClose: () => void;
}

const QuestionEditModal: React.FC<QuestionEditModalProps> = ({ question, onSave, onClose }) => {
    const [formData, setFormData] = useState<Question>(question);

    useEffect(() => {
        setFormData(question);
    }, [question]);

    const handleMainChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? Number(value) : value 
        }));
    };
    
    const handlePartChange = (partId: string, field: keyof QuestionPart, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            parts: prev.parts.map(p => p.id === partId ? { ...p, [field]: value } : p)
        }));
    };

    const handleAddPart = () => {
        const newPart: QuestionPart = {
            id: `part-${Date.now()}`,
            text: '',
            marks: 1,
            answer: '',
            explanation: ''
        };
        setFormData(prev => ({
            ...prev,
            parts: [...prev.parts, newPart]
        }));
    };
    
    const handleDeletePart = (partId: string) => {
        if (formData.parts.length <= 1) {
            alert("A question must have at least one part.");
            return;
        }
        if (window.confirm('Are you sure you want to delete this question part?')) {
            setFormData(prev => ({
                ...prev,
                parts: prev.parts.filter(p => p.id !== partId)
            }));
        }
    };


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-800">
                            Edit Question
                        </h2>
                    </div>
                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        {/* Main Question Fields */}
                        <fieldset className="border p-4 rounded-md space-y-4">
                            <legend className="px-2 font-semibold text-gray-700">Main Question Details</legend>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-4 sm:col-span-1">
                                    <label className="block text-sm font-medium text-gray-600">Qn. No.</label>
                                    <input type="number" name="questionNumber" value={formData.questionNumber} onChange={handleMainChange} required className="mt-1 w-full input-style" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Question Stem (Main Text)</label>
                                <textarea name="text" value={formData.text} onChange={handleMainChange} rows={3} className="mt-1 w-full input-style" placeholder="Enter the main text/stem that applies to all parts..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Image URL (Optional)</label>
                                <input type="text" name="imageUrl" value={formData.imageUrl || ''} onChange={handleMainChange} className="mt-1 w-full input-style" />
                            </div>
                        </fieldset>
                        
                        {/* Question Parts */}
                        <fieldset className="border p-4 rounded-md">
                             <legend className="px-2 font-semibold text-gray-700">Question Parts</legend>
                             <div className="space-y-4">
                                {formData.parts.map((part, index) => (
                                    <div key={part.id} className="p-4 rounded-lg bg-gray-50 border relative">
                                        <h4 className="font-bold text-gray-600 mb-2">Part {index + 1}</h4>
                                        <button type="button" onClick={() => handleDeletePart(part.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500" title="Delete Part">
                                            <TrashIcon className="w-5 h-5"/>
                                        </button>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600">Part Text</label>
                                                <textarea value={part.text} onChange={e => handlePartChange(part.id, 'text', e.target.value)} required={formData.parts.length > 1} rows={2} className="mt-1 w-full input-style" placeholder="e.g., (a) Find the value of x." />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600">Correct Answer</label>
                                                    <input type="text" value={part.answer} onChange={e => handlePartChange(part.id, 'answer', e.target.value)} required className="mt-1 w-full input-style" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600">Marks</label>
                                                    <input type="number" value={part.marks} onChange={e => handlePartChange(part.id, 'marks', Number(e.target.value))} required className="mt-1 w-full input-style" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600">Explanation</label>
                                                <textarea value={part.explanation || ''} onChange={e => handlePartChange(part.id, 'explanation', e.target.value)} rows={3} className="mt-1 w-full input-style" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                             <button type="button" onClick={handleAddPart} className="mt-4 w-full flex items-center justify-center gap-2 text-sm bg-sky-100 text-sky-700 font-semibold py-2 rounded-lg hover:bg-sky-200">
                                <PlusCircleIcon className="w-5 h-5" />
                                Add Part
                            </button>
                        </fieldset>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-700">
                            Save Question
                        </button>
                    </div>
                </form>
            </div>
             <style>{`.input-style { padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; }`}</style>
        </div>
    );
};

export default QuestionEditModal;
