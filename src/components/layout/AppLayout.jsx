import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { usePet } from '../../context/PetContext';

const AppLayout = ({ children, activeTab, setActiveTab }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { currentPet } = usePet();

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Sidebar Navigation */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white border-b border-gray-200 lg:hidden px-4 h-16 flex items-center justify-between sticky top-0 z-30">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-gray-900">PetOwner360</span>
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-bold">
                        {currentPet.profile.name[0]}
                    </div>
                </header>

                {/* Scrollable Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
