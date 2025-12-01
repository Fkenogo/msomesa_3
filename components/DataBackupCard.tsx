
import React, { useState } from 'react';
import Card from './Card';
import { CloudArrowDownIcon, CloudArrowUpIcon, DocumentCheckIcon } from './icons';
import { User, Exam } from '../types';

interface DataBackupCardProps {
    allUsers: User[];
    allExams: Exam[];
    onImportData: (users: User[], exams: Exam[]) => void;
}

const DataBackupCard: React.FC<DataBackupCardProps> = ({ allUsers, allExams, onImportData }) => {
    const [importStatus, setImportStatus] = useState('');

    const handleExportData = () => {
        try {
            const dataToExport = {
                version: '1.0',
                exportDate: new Date().toISOString(),
                users: allUsers,
                exams: allExams,
            };

            const dataStr = JSON.stringify(dataToExport, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `msomesa-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setImportStatus('✅ Data exported successfully!');
            setTimeout(() => setImportStatus(''), 3000);
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export data. Please try again.');
        }
    };

    const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target?.result as string);

                // Validate the imported data structure
                if (!importedData.users || !importedData.exams) {
                    throw new Error('Invalid backup file format');
                }

                if (window.confirm(
                    `This will import ${importedData.users.length} users and ${importedData.exams.length} exams.\n\n` +
                    `⚠️ WARNING: This will merge with existing data. Duplicate IDs will be overwritten.\n\n` +
                    `Backup exported on: ${new Date(importedData.exportDate).toLocaleString()}\n\n` +
                    `Continue?`
                )) {
                    onImportData(importedData.users, importedData.exams);
                    setImportStatus(`✅ Successfully imported ${importedData.users.length} users and ${importedData.exams.length} exams!`);
                    setTimeout(() => setImportStatus(''), 5000);
                }
            } catch (error) {
                console.error('Import error:', error);
                alert('Failed to import data. Please ensure the file is a valid Msomesa backup file.');
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset input
    };

    const handleExportLocalStorage = () => {
        try {
            const allData: Record<string, any> = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('msomesa_')) {
                    allData[key] = localStorage.getItem(key);
                }
            }

            const dataStr = JSON.stringify(allData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `msomesa-raw-localStorage-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setImportStatus('✅ Raw localStorage data exported for debugging!');
            setTimeout(() => setImportStatus(''), 3000);
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export raw data.');
        }
    };

    const getLocalStorageSize = () => {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key.startsWith('msomesa_')) {
                total += localStorage[key].length + key.length;
            }
        }
        return (total / 1024).toFixed(2); // Convert to KB
    };

    return (
        <Card>
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <DocumentCheckIcon className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-gray-800">Data Backup & Recovery</h3>
                </div>

                <p className="text-sm text-gray-600">
                    Export your data regularly to prevent loss. Import to restore from a previous backup.
                </p>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                        <strong>Storage Usage:</strong> {getLocalStorageSize()} KB used
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Current Data: {allUsers.length} users, {allExams.length} exams
                    </p>
                </div>

                {importStatus && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                        {importStatus}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={handleExportData}
                        className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 font-semibold transition"
                    >
                        <CloudArrowDownIcon className="w-5 h-5" />
                        Export Backup
                    </button>

                    <label className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-semibold cursor-pointer transition">
                        <CloudArrowUpIcon className="w-5 h-5" />
                        Import Backup
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImportData}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500 mb-2">Advanced Options:</p>
                    <button
                        onClick={handleExportLocalStorage}
                        className="w-full text-left text-sm text-gray-600 hover:text-purple-600 py-2 px-3 rounded-lg hover:bg-gray-50"
                    >
                        📦 Export Raw localStorage (for debugging)
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default DataBackupCard;
