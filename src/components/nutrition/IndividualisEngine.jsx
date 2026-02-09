import React, { useState } from 'react';
import { usePet } from '../../context/PetContext';
import { Scale, ChevronRight, Package, Check, Loader } from 'lucide-react';

const IndividualisEngine = () => {
    const { currentPet } = usePet();
    const { weight, targetWeight, species } = currentPet.profile;
    const isOverweight = weight > targetWeight;
    const [subscribeStatus, setSubscribeStatus] = useState('idle');

    // determine diet plan based on species (basic logic for demo)
    const currentDiet = species.includes('Turtle') || species.includes('Cooter') ? "Pellets + Greens" : "Kibble + Wet Food";
    const recommendedDiet = species.includes('Turtle') || species.includes('Cooter')
        ? "Royal Canin® Reptile Herbivore (High Fiber)"
        : "Royal Canin® Weight Care (Small Dog)";

    const handleSubscribe = () => {
        setSubscribeStatus('loading');
        setTimeout(() => {
            setSubscribeStatus('success');
        }, 1500);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Scale className="w-5 h-5 mr-2 text-mars-blue" />
                Individualis™ Nutrition
            </h2>

            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Current Weight</span>
                    <span className="font-bold text-gray-900">{weight} kg</span>
                </div>
                <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                        <div
                            style={{ width: `${(Math.min(targetWeight, weight) / Math.max(targetWeight, weight)) * 100}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        ></div>
                        {isOverweight && (
                            <div style={{ width: `${((weight - targetWeight) / weight) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"></div>
                        )}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Target: {targetWeight} kg</span>
                        {isOverweight && (
                            <span className="text-red-500 font-medium">Overweight (+{(weight - targetWeight).toFixed(1)}kg)</span>
                        )}
                    </div>
                </div>

                <div className="mt-6 p-4 bg-mars-red/5 rounded-xl border border-mars-red/10">
                    <div className="flex items-start mb-3">
                        <Package className="text-mars-red w-8 h-8 mr-3" />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Recommended Diet Change</h3>
                            <p className="text-xs text-gray-600 mt-1">
                                Based on {weight}kg weight and species.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm mb-3">
                        <p className="text-xs text-gray-500">Current</p>
                        <p className="text-sm font-medium text-gray-800">{currentDiet}</p>
                        <div className="my-1 border-t border-gray-100"></div>
                        <p className="text-xs text-mars-red font-extrabold">New Plan</p>
                        <p className="text-sm font-medium text-gray-900">{recommendedDiet}</p>
                    </div>

                    <button
                        onClick={handleSubscribe}
                        disabled={subscribeStatus !== 'idle'}
                        className={`w-full font-extrabold py-2 rounded-lg text-sm transition-all duration-300 flex items-center justify-center min-h-[44px]
                            ${subscribeStatus === 'success' ? 'bg-green-600 text-white' : 'bg-mars-red text-white hover:bg-red-700 hover-smooth focus-ring'}
                            ${subscribeStatus === 'loading' ? 'opacity-80 cursor-wait' : ''}
                        `}
                    >
                        {subscribeStatus === 'idle' && (
                            <>Subscribe & Save (15%) <ChevronRight size={16} className="ml-1" /></>
                        )}
                        {subscribeStatus === 'loading' && (
                            <Loader className="w-4 h-4 animate-spin" />
                        )}
                        {subscribeStatus === 'success' && (
                            <>Subscribed <Check size={16} className="ml-1" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IndividualisEngine;
