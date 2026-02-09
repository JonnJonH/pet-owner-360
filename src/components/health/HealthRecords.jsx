import React, { useState } from 'react';
import DigitalTwinTimeline from '../timeline/DigitalTwinTimeline';
import GenomicsReport from './GenomicsReport';
import { FileText, Download, Calendar, CheckCircle, Loader, ChevronRight } from 'lucide-react';
import { usePet } from '../../context/PetContext';

const HealthRecords = () => {
    const { addMedicalHistory } = usePet();
    const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, success

    // Link Account State
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkStep, setLinkStep] = useState('select'); // select, login, success
    const [selectedProvider, setSelectedProvider] = useState('');
    const [linkLoading, setLinkLoading] = useState(false);

    const handleBooking = () => {
        setBookingStatus('loading');
        setTimeout(() => {
            setBookingStatus('success');
            setTimeout(() => setBookingStatus('idle'), 3000);
        }, 1500);
    };

    const handleLinkAccount = () => {
        setLinkLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLinkLoading(false);
            setLinkStep('success');

            // Add mock records
            const newRecords = [
                { date: "2024-01-15", type: "Vaccination: Distemper", source: selectedProvider, note: "Booster shot administered. Next due 2025." },
                { date: "2023-11-20", type: "Dental Cleaning", source: selectedProvider, note: "Routine scaling and polishing. No extractions needed." },
                { date: "2023-08-05", type: "Annual Physical", source: selectedProvider, note: "Weight 32kg. Heart and lungs clear. Coat healthy." }
            ];
            addMedicalHistory(newRecords);

            // Close modal after delay
            setTimeout(() => {
                setIsLinkModalOpen(false);
                setLinkStep('select');
                setSelectedProvider('');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="space-y-6 relative">
            {/* LINK ACCOUNT MODAL */}
            {isLinkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-extrabold text-gray-900">Link External Account</h2>
                                <button onClick={() => setIsLinkModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                            </div>

                            {linkStep === 'select' && (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-500 mb-4">Select a provider to import missing health records.</p>
                                    {['VCA Animal Hospitals', 'Banfield Pet Hospital', 'BluePearl Specialty'].map(provider => (
                                        <button
                                            key={provider}
                                            onClick={() => { setSelectedProvider(provider); setLinkStep('login'); }}
                                            className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-mars-blue hover:bg-blue-50 transition-all font-bold text-gray-700 hover:text-mars-blue text-left"
                                        >
                                            {provider}
                                            <ChevronRight size={16} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {linkStep === 'login' && (
                                <div className="space-y-4">
                                    <div className="flex items-center mb-4 text-mars-blue font-bold">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                            <FileText size={16} />
                                        </div>
                                        Login to {selectedProvider}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                                        <input type="email" placeholder="user@example.com" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-mars-blue focus:border-transparent outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-mars-blue focus:border-transparent outline-none" />
                                    </div>
                                    <button
                                        onClick={handleLinkAccount}
                                        disabled={linkLoading}
                                        className="w-full bg-mars-blue text-white py-3 rounded-xl font-bold mt-4 hover:bg-blue-800 transition-colors flex items-center justify-center"
                                    >
                                        {linkLoading ? <Loader className="animate-spin" /> : 'Connect Account'}
                                    </button>
                                    <button onClick={() => setLinkStep('select')} className="w-full text-center text-gray-400 text-xs mt-2 hover:text-gray-600">
                                        Back to providers
                                    </button>
                                </div>
                            )}

                            {linkStep === 'success' && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">Success!</h3>
                                    <p className="text-gray-500">
                                        Account linked successfully.<br />
                                        Importing records from {selectedProvider}...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Health records & genomics</h1>
                    <p className="text-gray-500 text-sm">Comprehensive digital twin data provided by Linnaeus & Wisdom Panel™</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsLinkModalOpen(true)}
                        className="flex items-center px-4 py-2.5 rounded-xl font-bold text-mars-blue bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        Link Account
                    </button>
                    <button
                        onClick={handleBooking}
                        disabled={bookingStatus !== 'idle'}
                        className={`flex items-center px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg focus:ring-4 focus:ring-mars-blue/20
                            ${bookingStatus === 'success' ? 'bg-green-600 text-white' : 'bg-mars-blue text-white hover:bg-blue-800'}
                        `}
                    >
                        {bookingStatus === 'idle' && (
                            <>
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Vet Appointment
                            </>
                        )}
                        {bookingStatus === 'loading' && (
                            <>
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                Checking Availability...
                            </>
                        )}
                        {bookingStatus === 'success' && (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Request Sent
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Timeline (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    <DigitalTwinTimeline />
                </div>

                {/* Right Column: Genomics (1/3 width) */}
                <div className="space-y-6">
                    <GenomicsReport />

                    {/* Interactive Documents Card */}
                    <div className="card-clay p-6 !bg-mars-blue text-white">
                        <div className="flex items-center mb-6">
                            <div className="p-2 bg-white/10 rounded-lg mr-3">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-extrabold text-lg">Recent Documents</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { name: "Lab Results (2024)", type: "PDF", size: "2.4 MB" },
                                { name: "Vaccination Cert", type: "PDF", size: "1.1 MB" },
                                { name: "Insurance Policy", type: "PDF", size: "0.8 MB" }
                            ].map((doc, idx) => (
                                <li key={idx}>
                                    <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-xl hover:bg-white/20 hover:scale-[1.02] hover:shadow-lg transition-all group text-left">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 font-bold text-xs">
                                                {doc.type}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-white group-hover:text-yellow-300 transition-colors">{doc.name}</p>
                                                <p className="text-xs text-indigo-200">{doc.size}</p>
                                            </div>
                                        </div>
                                        <Download className="w-4 h-4 text-indigo-300 group-hover:text-white" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-6 py-3 text-sm font-bold text-indigo-100 hover:text-white flex items-center justify-center group opacity-80 hover:opacity-100 transition-opacity">
                            View All Documents <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthRecords;
