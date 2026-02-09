import React, { useState, useEffect } from 'react';
import { usePet } from '../../context/PetContext';
import { AlertTriangle, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SmartAlertStream = ({ setActiveTab }) => {
    const { currentPet } = usePet();
    const [alerts, setAlerts] = useState(currentPet.predictiveInsights.alerts);

    // Update local alerts when pet changes
    useEffect(() => {
        setAlerts(currentPet.predictiveInsights.alerts);
    }, [currentPet]);

    const dismissAlert = (id) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    };

    // Helper to get styles based on alert type
    const getAlertStyles = (type) => {
        switch (type) {
            case 'Weight': return { bg: 'bg-mars-red/5', border: 'border-mars-red/20', iconBg: 'bg-mars-red/10', iconColor: 'text-mars-red', title: 'text-mars-red' };
            case 'Trauma History': return { bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', title: 'text-blue-900' };
            case 'Orthopedic': return { bg: 'bg-orange-50', border: 'border-orange-100', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', title: 'text-orange-900' };
            case 'Dermatology': return { bg: 'bg-purple-50', border: 'border-purple-100', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', title: 'text-purple-900' };
            default: return { bg: 'bg-gray-50', border: 'border-gray-100', iconBg: 'bg-gray-100', iconColor: 'text-gray-600', title: 'text-gray-900' };
        }
    };

    if (alerts.length === 0) {
        return (
            <div className="card-clay p-6 text-center">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShieldAlert className="text-green-500 w-6 h-6" />
                </div>
                <h3 className="text-gray-900 font-bold">All Clear!</h3>
                <p className="text-sm text-gray-500">No active health alerts for {currentPet.profile.name}.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {alerts.map((alert) => {
                    const styles = getAlertStyles(alert.type);
                    return (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className={`p-4 rounded-xl border relative group ${styles.bg} ${styles.border}`}
                        >
                            <button
                                onClick={() => dismissAlert(alert.id)}
                                className="absolute top-2 right-2 p-1 text-gray-400 hover:bg-black/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Dismiss Alert"
                            >
                                <X size={14} />
                            </button>

                            <div className="flex items-start">
                                <div className={`p-2 rounded-lg mr-3 ${styles.iconBg} ${styles.iconColor}`}>
                                    {alert.type === 'Weight' ? <AlertTriangle size={18} /> : <ShieldAlert size={18} />}
                                </div>
                                <div className="flex-1 pr-4">
                                    <h3 className={`text-sm font-semibold ${styles.title}`}>
                                        {alert.type} Alert
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        {alert.message}
                                    </p>

                                    {alert.type === 'Weight' && (
                                        <button
                                            onClick={() => setActiveTab('store')}
                                            className="mt-3 flex items-center text-xs font-bold text-mars-red hover:text-red-800 transition-colors"
                                        >
                                            VIEW NUTRITION PLAN <ArrowRight size={12} className="ml-1" />
                                        </button>
                                    )}
                                    {(alert.type === 'Trauma History' || alert.type === 'Orthopedic') && (
                                        <button
                                            onClick={() => setActiveTab('health')}
                                            className={`mt-3 flex items-center text-xs font-bold ${styles.iconColor} hover:underline transition-all`}
                                        >
                                            CHECK MEDICAL RECORDS <ArrowRight size={12} className="ml-1" />
                                        </button>
                                    )}
                                    {alert.type === 'Dermatology' && (
                                        <button
                                            onClick={() => setActiveTab('diagnostics')}
                                            className="mt-3 flex items-center text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
                                        >
                                            START SYMPTOM TRIAGE <ArrowRight size={12} className="ml-1" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default SmartAlertStream;
