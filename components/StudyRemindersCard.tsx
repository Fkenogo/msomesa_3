
import React, { useState, useMemo, useEffect } from 'react';
import Card from './Card';
import { User, StudyReminder, Exam } from '../types';
import { BellIcon, PlusCircleIcon, TrashIcon } from './icons';

interface StudyRemindersCardProps {
    currentUser: User;
    onSave: (reminders: StudyReminder[]) => void;
    allExams: Exam[];
}

const StudyRemindersCard: React.FC<StudyRemindersCardProps> = ({ currentUser, onSave, allExams }) => {
    const [reminders, setReminders] = useState<StudyReminder[]>(currentUser.studyReminders || []);
    const [isAdding, setIsAdding] = useState(false);
    const [newSubject, setNewSubject] = useState('');
    const [newTime, setNewTime] = useState('19:00');

    useEffect(() => {
        setReminders(currentUser.studyReminders || []);
    }, [currentUser.studyReminders]);

    const availableSubjects = useMemo(() => {
        const subjects = new Set(allExams.map(e => e.subject));
        return Array.from(subjects);
    }, [allExams]);

    useEffect(() => {
        if (availableSubjects.length > 0) {
            setNewSubject(availableSubjects[0]);
        }
    }, [availableSubjects]);

    const handleAddReminder = () => {
        if (!newSubject || !newTime) {
            alert("Please select a subject and time.");
            return;
        }

        const newReminder: StudyReminder = {
            id: `reminder-${Date.now()}`,
            subject: newSubject,
            time: newTime,
            active: true
        };
        const updatedReminders = [...reminders, newReminder];
        setReminders(updatedReminders);
        onSave(updatedReminders);
        setIsAdding(false);
    };

    const handleDeleteReminder = (id: string) => {
        const updatedReminders = reminders.filter(r => r.id !== id);
        setReminders(updatedReminders);
        onSave(updatedReminders);
    };

    const handleToggleReminder = (id: string) => {
        const updatedReminders = reminders.map(r => r.id === id ? { ...r, active: !r.active } : r);
        setReminders(updatedReminders);
        onSave(updatedReminders);
    };

    return (
        <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BellIcon className="w-6 h-6" /> My Reminders
            </h2>

            <div className="space-y-3">
                {reminders.map(reminder => (
                    <div key={reminder.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-800">{reminder.subject}</p>
                            <p className="text-sm text-gray-500">{reminder.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={reminder.active} onChange={() => handleToggleReminder(reminder.id)} className="sr-only peer" />
                                <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-sky-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                            </label>
                            <button onClick={() => handleDeleteReminder(reminder.id)} className="text-gray-400 hover:text-red-500">
                                <TrashIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isAdding ? (
                <div className="mt-4 p-3 bg-sky-50 border border-sky-200 rounded-lg space-y-2">
                     <select value={newSubject} onChange={e => setNewSubject(e.target.value)} className="w-full input-style bg-white">
                        {availableSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                     </select>
                     <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-full input-style" />
                     <div className="flex gap-2 justify-end">
                        <button onClick={() => setIsAdding(false)} className="text-sm font-semibold text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100">Cancel</button>
                        <button onClick={handleAddReminder} className="text-sm font-semibold text-white bg-sky-600 px-3 py-1 rounded-md hover:bg-sky-700">Save</button>
                     </div>
                </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="mt-4 w-full flex items-center justify-center gap-2 text-sm bg-sky-100 text-sky-700 font-semibold py-2 rounded-lg hover:bg-sky-200">
                    <PlusCircleIcon className="w-5 h-5" />
                    Add Reminder
                </button>
            )}
             <style>{`.input-style { padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; }`}</style>
        </Card>
    );
};

export default StudyRemindersCard;
