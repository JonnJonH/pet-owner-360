import React from 'react';
import { Activity, ShieldCheck, Battery } from 'lucide-react';
import { usePet } from '../../context/PetContext';

const Header = () => {
    const { currentPet } = usePet();

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="bg-mars-blue text-white p-2 rounded-lg">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-none">
                                {currentPet.profile.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {currentPet.profile.species}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">One Health: Stable</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
