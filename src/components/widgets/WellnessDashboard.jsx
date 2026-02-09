import React, { useState } from 'react';
import { calculateWellnessScore } from '../../data/store';
import { usePet } from '../../context/PetContext';
import { Droplets, Thermometer, Sun, Activity, Footprints, Moon, CheckCircle, Loader } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const WellnessDashboard = () => {
    const { currentPet } = usePet();
    const [period, setPeriod] = useState('Week');
    const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, success

    // Simulate score variation based on period
    const baseScore = calculateWellnessScore(currentPet);
    const scoreMap = {
        'Day': baseScore,
        'Week': Math.min(100, baseScore + 2),
        'Month': Math.max(0, baseScore - 3)
    };
    const activeScore = scoreMap[period];

    const data = [
        { name: 'Score', value: activeScore },
        { name: 'Remote', value: 100 - activeScore }
    ];

    const COLORS = ['#10B981', '#E5E7EB'];

    const handleBooking = () => {
        setBookingStatus('loading');
        setTimeout(() => {
            setBookingStatus('success');
            // Reset after 3 seconds
            setTimeout(() => setBookingStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <div className="card-clay p-6">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-mars-blue" />
                Live wellness score
            </h2>

            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center">
                    {/* Gauge Container - Increased width to prevent clipping */}
                    <div className="relative w-48 h-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="70%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    startAngle={180}
                                    endAngle={0}
                                    paddingAngle={0}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={6} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                            <span className="text-4xl font-extrabold text-gray-900">{activeScore}</span>
                            <span className="text-xs text-gray-500 font-bold">/100</span>
                        </div>
                    </div>

                    {/* Toggles - Now underneath */}
                    <div className="flex space-x-1 mt-[-20px] z-10">
                        {['Day', 'Week', 'Month'].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all border border-transparent ${period === p
                                    ? 'bg-mars-blue text-white shadow-lg scale-105'
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-mars-blue'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-right pl-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Impact Factors</p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-end">
                            <span className="text-xs font-bold text-gray-600 mr-2">Weight Trend</span>
                            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-lg border ${currentPet.profile.weight > currentPet.profile.targetWeight
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-100'
                                    : 'bg-green-50 text-green-700 border-green-100'
                                }`}>
                                {currentPet.profile.weight > currentPet.profile.targetWeight ? '+' : ''}
                                {(currentPet.profile.weight - currentPet.profile.targetWeight).toFixed(1)}kg
                            </span>
                        </div>
                        <div className="flex items-center justify-end">
                            <span className="text-xs font-bold text-gray-600 mr-2">Health Risk</span>
                            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                                {currentPet.predictiveInsights.riskLevel}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {currentPet.biometrics.environment === 'Aquatic' ? 'Environment (API® Connect)' : 'Activity (Whistle®)'}
                </p>
                <div className="grid grid-cols-3 gap-2">
                    {currentPet.biometrics.environment === 'Aquatic' ? (
                        <>
                            <div className="bg-blue-50 p-2 rounded-lg text-center">
                                <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                                <span className="text-xs font-medium text-blue-900">{currentPet.biometrics.waterTemp}</span>
                            </div>
                            <div className="bg-orange-50 p-2 rounded-lg text-center">
                                <Sun className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                                <span className="text-xs font-medium text-orange-900">{currentPet.biometrics.baskingTemp}</span>
                            </div>
                            <div className="bg-purple-50 p-2 rounded-lg text-center">
                                <Thermometer className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                                <span className="text-xs font-medium text-purple-900">Stable</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-green-50 p-2 rounded-lg text-center">
                                <Footprints className="w-4 h-4 text-green-500 mx-auto mb-1" />
                                <span className="text-xs font-medium text-green-900">{currentPet.biometrics.dailySteps}</span>
                                <span className="block text-xs text-green-700">steps</span>
                            </div>
                            <div className="bg-indigo-50 p-2 rounded-lg text-center">
                                <Activity className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                                <span className="text-xs font-medium text-indigo-900">{currentPet.biometrics.activityLevel.split(' ')[0]}</span>
                            </div>
                            <div className="bg-purple-50 p-2 rounded-lg text-center">
                                <Moon className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                                <span className="text-xs font-medium text-purple-900">{currentPet.biometrics.sleepQuality.split(' ')[0]}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <button
                onClick={handleBooking}
                disabled={bookingStatus !== 'idle'}
                className={`w-full mt-4 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center
                    ${bookingStatus === 'success' ? 'bg-green-600 text-white' : 'btn-mars-primary'}
                    ${bookingStatus === 'loading' ? 'opacity-80 cursor-wait' : ''}
                `}
            >
                {bookingStatus === 'idle' && "Book Antech RapidRead™"}
                {bookingStatus === 'loading' && (
                    <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing Request...
                    </>
                )}
                {bookingStatus === 'success' && (
                    <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Appointment Confirmed
                    </>
                )}
            </button>
        </div>
    );
};

export default WellnessDashboard;
