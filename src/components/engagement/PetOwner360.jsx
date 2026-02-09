import React, { useState } from 'react';
import { usePet } from '../../context/PetContext';
import { PartyPopper, Dna, ArrowUpRight, CheckCircle } from 'lucide-react';

const PetOwner360 = () => {
    const { currentPet } = usePet();
    const isAquatic = currentPet.biometrics.environment === 'Aquatic';
    const [joinedBiobank, setJoinedBiobank] = useState(false);

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-lg p-6 text-white overflow-hidden relative flex flex-col">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

            <h2 className="text-lg font-extrabold mb-4 flex items-center relative z-10">
                <PartyPopper className="w-5 h-5 mr-2 text-yellow-300" />
                Engagement & Rewards
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <p className="text-xs text-indigo-200 uppercase tracking-wider font-bold mb-1">Activity Tracking</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-2xl font-bold">{isAquatic ? '0.4 km' : currentPet.biometrics.dailySteps}</span>
                            <p className="text-xs text-indigo-100">
                                {isAquatic ? 'Swim Distance' : 'Daily Steps'} (Activity Tracker™)
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">On Track</span>
                        </div>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>

                <button
                    onClick={() => setJoinedBiobank(true)}
                    disabled={joinedBiobank}
                    className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-left transition-all relative overflow-hidden group
                        ${joinedBiobank ? 'cursor-default border-green-400/30' : 'hover:bg-white/20 cursor-pointer'}
                    `}
                >
                    {joinedBiobank && (
                        <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center backdrop-blur-[1px] z-20">
                            <span className="font-bold text-white flex items-center shadow-sm">
                                <CheckCircle className="w-5 h-5 mr-2 text-green-400" /> Joined!
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between items-start">
                        <Dna className={`w-6 h-6 mb-2 ${joinedBiobank ? 'text-green-300' : 'text-pink-300'}`} />
                        {!joinedBiobank && <ArrowUpRight className="text-indigo-300 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                    </div>
                    <h3 className="font-bold text-sm mb-1">Mars Biobank™</h3>
                    <p className="text-xs text-indigo-100 leading-snug">
                        {currentPet.profile.name}'s data is valuable! Donate genomic data?
                    </p>
                </button>
            </div>
        </div>
    );
};

export default PetOwner360;
