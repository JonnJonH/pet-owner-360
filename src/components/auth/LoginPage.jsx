import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { usePet } from '../../context/PetContext';

const LoginPage = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { allPets, currentPet, switchPet } = usePet();
    const [selectedPetId, setSelectedPetId] = useState(currentPet.id);

    const handlePetSelect = (petId) => {
        setSelectedPetId(petId);
        switchPet(petId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay for realism
        setTimeout(() => {
            onLogin();
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">
            {/* Left Column - Brand Showcase */}
            <div className="hidden lg:flex w-1/2 bg-mars-blue relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-pet-blue/30 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-mars-blue font-extrabold text-2xl">P</span>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight">PetOwner360</span>
                    </div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                        The future of <br />
                        <span className="text-pet-green">connected care</span>
                    </h1>
                    <p className="text-lg text-indigo-100 leading-relaxed mb-8">
                        Experience a unified ecosystem where data, genomics, and nutrition converge to create A Better World For Pets.
                    </p>

                    <div className="flex items-center space-x-4 text-sm font-bold tracking-wide uppercase opacity-80">
                        <span>Powered by One Health™</span>
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        <span>Mars Petcare</span>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-indigo-200">
                    © 2026 Mars or Affiliates. All Rights Reserved.
                </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden flex justify-center mb-6">
                            <div className="w-12 h-12 bg-mars-blue rounded-xl flex items-center justify-center">
                                <span className="text-white font-extrabold text-xl">P</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
                        <p className="mt-2 text-gray-500">
                            Select a profile to access your dashboard
                        </p>
                    </div>

                    {/* Profile Selector */}
                    <div className="grid grid-cols-2 gap-4">
                        {Object.values(allPets).map((pet) => (
                            <div
                                key={pet.id}
                                onClick={() => handlePetSelect(pet.id)}
                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center transition-all duration-200 hover:shadow-md ${selectedPetId === pet.id
                                    ? 'border-mars-blue bg-blue-50'
                                    : 'border-gray-200 bg-white hover:border-blue-200'
                                    }`}
                            >
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm mb-3 border border-gray-100">
                                    {pet.profile.avatar || (pet.profile.species.includes('Turtle') ? '🐢' : '🐕')}
                                </div>
                                <h3 className={`font-bold text-sm ${selectedPetId === pet.id ? 'text-mars-blue' : 'text-gray-900'
                                    }`}>
                                    {pet.profile.owner.split(' ')[0]} & {pet.profile.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">{pet.profile.species.split(' ')[0]}</p>
                            </div>
                        ))}
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-mars-blue focus:border-mars-blue focus:z-10 sm:text-sm"
                                        placeholder="roger.owner@example.com"
                                        defaultValue="jonathan.doe@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-mars-blue focus:border-mars-blue focus:z-10 sm:text-sm"
                                        placeholder="••••••••"
                                        defaultValue="password123"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-mars-blue focus:ring-mars-blue border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-bold text-mars-blue hover:text-blue-800">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-extrabold rounded-lg text-white bg-mars-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mars-blue disabled:opacity-70 transition-all"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        Sign In <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Protected by Mars Identity & Access Management (IAM). <br />
                            Unauthorized access is prohibited.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
