import React from 'react';
import DigitalTwinTimeline from '../timeline/DigitalTwinTimeline';
import GenomicsReport from './GenomicsReport';
import { FileText, Download } from 'lucide-react';

const HealthRecords = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Health records & genomics</h1>
                    <p className="text-gray-500">Comprehensive digital twin data provided by Linnaeus & Wisdom Panel™</p>
                </div>
                <button
                    onClick={() => alert("Downloading full PDF report...")}
                    className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-mars-blue hover:bg-gray-50 hover-smooth focus-ring"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Export Full Report
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Timeline (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    <DigitalTwinTimeline />
                </div>

                {/* Right Column: Genomics (1/3 width) */}
                <div className="space-y-6">
                    <GenomicsReport />

                    {/* Placeholder for Documents */}
                    <div className="bg-mars-blue rounded-xl shadow-sm p-6 text-white">
                        <div className="flex items-center mb-4">
                            <FileText className="w-5 h-5 mr-2" />
                            <h3 className="font-extrabold text-lg">Recent Documents</h3>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-between text-sm border-b border-white/20 pb-2">
                                <span>Lab Results (2024)</span>
                                <span className="opacity-70 text-xs">PDF</span>
                            </li>
                            <li className="flex items-center justify-between text-sm border-b border-white/20 pb-2">
                                <span>Vaccination Cert</span>
                                <span className="opacity-70 text-xs">PDF</span>
                            </li>
                            <li className="flex items-center justify-between text-sm">
                                <span>Insurance Policy</span>
                                <span className="opacity-70 text-xs">PDF</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthRecords;
