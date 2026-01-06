import React from 'react';
import { Exam, ExamMode } from '../types';
import { BookOpenIcon, ChartBarIcon, FireIcon } from './icons';

interface ExamModeSelectionModalProps {
    exam: Exam;
    onStart: (mode: ExamMode) => void;
    onClose: () => void;
}

const ExamModeSelectionModal: React.FC<ExamModeSelectionModalProps> = ({ exam, onStart, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Start Exam</h2>
                    <p className="text-center text-gray-500 mt-1">{exam.title} - {exam.year}</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                        onClick={() => onStart('practice')}
                        className="p-6 border-2 border-gray-200 rounded-lg text-left hover:border-sky-500 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    >
                        <BookOpenIcon className="w-8 h-8 text-sky-600 mb-2"/>
                        <h3 className="font-bold text-lg text-gray-800">Practice</h3>
                        <p className="text-sm text-gray-600 mt-1">Get instant feedback. Answer questions at your own pace.</p>
                    </button>
                     <button 
                        onClick={() => onStart('quiz')}
                        className="p-6 border-2 border-gray-200 rounded-lg text-left hover:border-amber-500 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    >
                        <FireIcon className="w-8 h-8 text-amber-600 mb-2"/>
                        <h3 className="font-bold text-lg text-gray-800">Quiz Mode</h3>
                        <p className="text-sm text-gray-600 mt-1">Answer quickly! Auto-advances on correct answers.</p>
                    </button>
                     <button 
                        onClick={() => onStart('simulation')}
                        className="p-6 border-2 border-gray-200 rounded-lg text-left hover:border-green-500 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    >
                        <ChartBarIcon className="w-8 h-8 text-green-600 mb-2"/>
                        <h3 className="font-bold text-lg text-gray-800">Simulation</h3>
                        <p className="text-sm text-gray-600 mt-1">Timed test conditions. Review answers at the end.</p>
                    </button>
                </div>
                <div className="p-4 bg-gray-50 flex justify-end">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamModeSelectionModal;