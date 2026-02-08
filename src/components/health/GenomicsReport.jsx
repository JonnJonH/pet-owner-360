import React from 'react';
import { usePet } from '../../context/PetContext';
import { Dna, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

const GenomicsReport = () => {
    const { currentPet } = usePet();
    const { provider, breed, healthMarkers } = currentPet.genomics;
    const traits = breed.traits;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-gray-900 flex items-center">
                    <Dna className="w-5 h-5 mr-2 text-mars-blue" />
                    Genomics & Traits
                </h2>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                    {provider}
                </span>
            </div>

            {/* Breed Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Detailed Ancestry</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-xl font-extrabold text-mars-blue">{breed.primary}</h3>
                    <span className="text-2xl font-bold text-gray-900">{breed.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                    <div className="bg-mars-blue h-full rounded-full" style={{ width: `${breed.percentage}%` }}></div>
                </div>
            </div>

            {/* Health Markers */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Health Markers</h3>
                {healthMarkers.map((marker) => (
                    <div key={marker.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 hover-smooth transition-colors">
                        <div className="flex items-center">
                            {marker.status === 'Clear' ? (
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            ) : (
                                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />
                            )}
                            <div>
                                <p className="text-sm font-bold text-gray-900">{marker.name}</p>
                                <p className="text-xs text-gray-500">{marker.risk}</p>
                            </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${marker.status === 'Clear'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {marker.status}
                        </span>
                    </div>
                ))}
            </div>

            {/* Traits */}
            <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                    {traits.map((trait, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                            #{trait}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenomicsReport;
