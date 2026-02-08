import React from 'react';
import { calculateWellnessScore } from '../../data/store';
import { usePet } from '../../context/PetContext';
import { Droplets, Thermometer, Sun, Activity, Footprints, Moon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const WellnessDashboard = () => {
    const { currentPet } = usePet();
    const score = calculateWellnessScore(currentPet);
    const data = [
        { name: 'Score', value: score },
        { name: 'Remote', value: 100 - score }
    ];

    const COLORS = ['#10B981', '#E5E7EB'];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-mars-blue" />
                Live wellness score
            </h2>

            <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                    {['Day', 'Week', 'Month'].map((period) => (
                        <button
                            key={period}
                            className={`px-3 py-1 text-xs font-medium rounded-full hover-smooth focus-ring ${period === 'Week'
                                ? 'bg-mars-blue text-white shadow-md shadow-mars-blue/20'
                                : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
                <div className="relative w-32 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={55}
                                startAngle={180}
                                endAngle={0}
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                        <span className="text-3xl font-extrabold text-gray-900">{score}</span>
                        <span className="text-xs text-gray-500">/100</span>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Impact Factors</p>
                    <div className="space-y-1">
                        <span className="inline-block px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-md border border-yellow-100">
                            Weight ({currentPet.profile.weight > currentPet.profile.targetWeight ? '+' : ''}
                            {(currentPet.profile.weight - currentPet.profile.targetWeight).toFixed(1)}kg)
                        </span>
                        <br />
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-100">
                            Risk: {currentPet.predictiveInsights.riskLevel}
                        </span>
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
                                <span className="block text-[10px] text-green-600">steps</span>
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
                onClick={() => alert("Booking functionality coming soon via Antech API...")}
                className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
                Book Antech RapidRead™
            </button>
        </div>
    );
};

export default WellnessDashboard;
