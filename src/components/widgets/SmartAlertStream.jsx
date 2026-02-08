import React from 'react';
import { usePet } from '../../context/PetContext';
import { AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';

const SmartAlertStream = ({ setActiveTab }) => {
    const { currentPet } = usePet();
    const alerts = currentPet.predictiveInsights.alerts;

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

    return (
        <div className="space-y-4">
            {alerts.map((alert) => {
                const styles = getAlertStyles(alert.type);
                return (
                    <div
                        key={alert.id}
                        className={`p-4 rounded-xl border ${styles.bg} ${styles.border}`}
                    >
                        <div className="flex items-start">
                            <div className={`p-2 rounded-lg mr-3 ${styles.iconBg} ${styles.iconColor}`}>
                                {alert.type === 'Weight' ? <AlertTriangle size={18} /> : <ShieldAlert size={18} />}
                            </div>
                            <div className="flex-1">
                                <h3 className={`text-sm font-semibold ${styles.title}`}>
                                    {alert.type} Alert
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    {alert.message}
                                </p>

                                {alert.type === 'Weight' && (
                                    <button
                                        onClick={() => setActiveTab('store')}
                                        className="mt-3 flex items-center text-xs font-bold text-mars-red hover:text-red-800"
                                    >
                                        VIEW NUTRITION PLAN <ArrowRight size={12} className="ml-1" />
                                    </button>
                                )}
                                {(alert.type === 'Trauma History' || alert.type === 'Orthopedic') && (
                                    <button
                                        onClick={() => setActiveTab('health')}
                                        className={`mt-3 flex items-center text-xs font-bold ${styles.iconColor}`}
                                    >
                                        CHECK MEDICAL RECORDS <ArrowRight size={12} className="ml-1" />
                                    </button>
                                )}
                                {alert.type === 'Dermatology' && (
                                    <button
                                        onClick={() => setActiveTab('diagnostics')}
                                        className="mt-3 flex items-center text-xs font-bold text-purple-700 hover:text-purple-900"
                                    >
                                        START SYMPTOM TRIAGE <ArrowRight size={12} className="ml-1" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SmartAlertStream;
