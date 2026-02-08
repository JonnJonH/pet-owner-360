import React, { useState } from 'react';
import { usePet } from '../../context/PetContext';
import { Calendar, ChevronDown, ChevronUp, AlertCircle, FileText, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DigitalTwinTimeline = () => {
    const { currentPet } = usePet();
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (index) => {
        setExpandedId(expandedId === index ? null : index);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-mars-blue" />
                Digital Twin Medical History
            </h2>

            <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                {currentPet.medicalHistory.map((event, index) => {
                    const isTrauma = event.note.includes("Traumatic Carapace Fracture");
                    const isExpanded = expandedId === index;

                    return (
                        <div key={index} className="relative pl-8">
                            <span className={`absolute top-0 left-[-9px] w-4 h-4 rounded-full border-2 ${isTrauma ? 'bg-red-500 border-red-100 ring-4 ring-red-50' : 'bg-white border-gray-300'
                                }`}></span>

                            <div
                                className={`transition-all duration-200 ${isTrauma ? 'cursor-pointer hover:bg-gray-50 rounded-lg -ml-2 p-2' : ''}`}
                                onClick={() => isTrauma && toggleExpand(index)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className={`text-sm font-semibold ${isTrauma ? 'text-red-700' : 'text-gray-900'}`}>
                                            {event.type}
                                        </h3>
                                        <p className="text-xs text-gray-500">{event.date} • {event.source}</p>
                                    </div>
                                    {isTrauma && (
                                        <button className="text-gray-400 hover:text-gray-600">
                                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 mt-1">{event.note}</p>

                                <AnimatePresence>
                                    {isExpanded && isTrauma && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 overflow-hidden"
                                        >
                                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-sm">
                                                <h4 className="font-semibold text-gray-800 flex items-center mb-2">
                                                    <FileText size={14} className="mr-1" /> Radiology Report
                                                </h4>
                                                <p className="text-gray-600 mb-2 italic">
                                                    "Dorso-lateral fracture of carapace. Coelomic membrane intact. No internal organ damage. 3 shelled eggs visible in oviducts."
                                                </p>

                                                <div className="mt-3 bg-white border border-blue-100 rounded-md p-3 shadow-sm">
                                                    <div className="flex items-start">
                                                        <ShoppingBag className="text-mars-blue mt-0.5 mr-2" size={16} />
                                                        <div>
                                                            <p className="font-bold text-mars-blue text-xs uppercase tracking-wide">Recommended Add-on</p>
                                                            <p className="font-semibold text-gray-900">Predator-Proof Pond Fencing</p>
                                                            <p className="text-xs text-gray-500 mt-1">Prevent future trauma. Rated for large breeds.</p>
                                                            <button
                                                                onClick={() => alert("Redirecting to Store...")}
                                                                className="mt-2 text-xs bg-mars-blue text-white px-3 py-1 rounded-md hover:bg-blue-800 transition-colors"
                                                            >
                                                                View Product
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DigitalTwinTimeline;
