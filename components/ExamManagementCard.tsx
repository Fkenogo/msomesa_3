
import React, { useState, useMemo } from 'react';
import Card from './Card';
import { Exam, EducationLevel } from '../types';
import { PencilIcon, TrashIcon, PlusCircleIcon, ArrowUpTrayIcon, EyeIcon } from './icons';
import ExamEditorModal from './ExamEditorModal';

interface ExamManagementCardProps {
    exams: Exam[];
    onPdfUpload: (examId: string, fileUrl: string, summary: string) => void;
    onSaveExam: (exam: Exam) => void;
    onDeleteExam: (examId: string) => void;
    onPreviewExam: (examId: string) => void;
}

const levelColors: Record<EducationLevel, string> = {
    PLE: 'bg-yellow-100 text-yellow-800',
    UCE: 'bg-green-100 text-green-800',
    UACE: 'bg-indigo-100 text-indigo-800',
};

const difficultyColors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
};

const ExamManagementCard: React.FC<ExamManagementCardProps> = ({ exams, onPdfUpload, onSaveExam, onDeleteExam, onPreviewExam }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExam, setEditingExam] = useState<Exam | null>(null);
    const [filterDifficulty, setFilterDifficulty] = useState('All');
    const [filterType, setFilterType] = useState('All');

    const filteredExams = useMemo(() => {
        return exams.filter(exam => {
            const difficultyMatch = filterDifficulty === 'All' || exam.difficulty === filterDifficulty;
            const typeMatch = filterType === 'All' || exam.type === filterType;
            return difficultyMatch && typeMatch;
        });
    }, [exams, filterDifficulty, filterType]);


    const handleFileUpload = (examId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const dummyUrl = URL.createObjectURL(file); // Use a real blob URL for the iframe
            const summary = `Simulated summary for ${file.name}: This document contains detailed step-by-step explanations...`.slice(0, 100);
            onPdfUpload(examId, dummyUrl, summary);
            event.target.value = '';
        }
    };

    const handleEditClick = (exam: Exam) => {
        setEditingExam(exam);
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingExam(null);
        setIsModalOpen(true);
    };

    const handleSave = (exam: Exam) => {
        onSaveExam(exam);
        setIsModalOpen(false);
    };

    return (
        <>
            <Card>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                    <h2 className="text-xl font-bold text-gray-800 flex-shrink-0">Exam Content Management</h2>
                    <div className="flex items-center gap-2">
                         <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)} className="input-style bg-white text-sm">
                            <option value="All">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="input-style bg-white text-sm">
                            <option value="All">All Types</option>
                            <option value="Past Paper">Past Paper</option>
                            <option value="Practice Paper">Practice Paper</option>
                        </select>
                        <button onClick={handleAddClick} className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 text-sm">
                            <PlusCircleIcon className="w-5 h-5" />
                            <span>Add Exam</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Subject & Topic</th>
                                <th scope="col" className="px-6 py-3">Level</th>
                                <th scope="col" className="px-6 py-3">Questions</th>
                                <th scope="col" className="px-6 py-3">Difficulty</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExams.map(exam => (
                                <tr key={exam.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{exam.title}</td>
                                    <td className="px-6 py-4">
                                        <div>{exam.subject}</div>
                                        <div className="text-xs text-gray-500">{exam.topic}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelColors[exam.level]}`}>{exam.level}</span>
                                    </td>
                                    <td className="px-6 py-4">{exam.questionCount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[exam.difficulty]}`}>
                                            {exam.difficulty}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <button onClick={() => onPreviewExam(exam.id)} className="text-gray-400 hover:text-sky-600" title="Preview Exam"><EyeIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleEditClick(exam)} className="text-gray-400 hover:text-blue-600" title="Edit Exam"><PencilIcon className="w-5 h-5"/></button>
                                        <button onClick={() => onDeleteExam(exam.id)} className="text-gray-400 hover:text-red-600" title="Delete Exam"><TrashIcon className="w-5 h-5"/></button>
                                        <label className="cursor-pointer text-gray-400 hover:text-green-600" title="Upload Explanations PDF">
                                            <ArrowUpTrayIcon className="w-5 h-5"/>
                                            <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileUpload(exam.id, e)} />
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {isModalOpen && (
                <ExamEditorModal
                    examToEdit={editingExam}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
             <style>{`.input-style { padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; }`}</style>
        </>
    );
};

export default ExamManagementCard;
