import React, { useState } from 'react';
import { Home, Activity, MessageSquare, ShoppingBag, Menu, X, Settings, User } from 'lucide-react';
import { usePet } from '../../context/PetContext';
import { useStore } from '../../context/StoreContext';

const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const { currentPet } = usePet();
    const { cartCount } = useStore();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'health', label: 'Health Records', icon: Activity },
        { id: 'diagnostics', label: 'Diagnostics', icon: MessageSquare },
        { id: 'store', label: 'Nutrition & Shop', icon: ShoppingBag, badge: cartCount },
    ];

    return (
        <>
            {/* ... (Mobile Menu Overlay code remains same) ... */}

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:block
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col">
                    {/* ... (Logo / Header code remains same) ... */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <div className="w-8 h-8 bg-mars-blue rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-extrabold text-lg">P</span>
                        </div>
                        <span className="text-lg font-extrabold text-gray-900">PetOwner<span className="text-mars-blue">360</span></span>
                        <button
                            className="ml-auto lg:hidden text-gray-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                                        ${isActive
                                            ? 'bg-mars-blue text-white shadow-md shadow-mars-blue/20'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-mars-blue'
                                        }
                                    `}
                                >
                                    <div className="flex items-center">
                                        <Icon
                                            size={20}
                                            className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-mars-blue'}`}
                                        />
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </div>
                                    {item.badge > 0 && (
                                        <span className={`
                                            text-xs font-bold px-2 py-0.5 rounded-full
                                            ${isActive ? 'bg-white text-mars-blue' : 'bg-mars-blue text-white'}
                                        `}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* User Profile Snippet */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="bg-gray-50 rounded-xl p-3 flex items-center">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                                R
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{currentPet.profile.name}</p>
                                <p className="text-xs text-gray-500 truncate">{currentPet.profile.species}</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
