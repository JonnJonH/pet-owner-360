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
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-white/80 backdrop-blur-md border-r border-gray-100 transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:block
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col">
                    {/* Logo Header */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <div className="w-8 h-8 bg-mars-blue rounded-xl shadow-lg shadow-mars-blue/20 flex items-center justify-center mr-3 hover:scale-105 transition-transform">
                            <span className="text-white font-extrabold text-lg">P</span>
                        </div>
                        <span className="text-lg font-extrabold text-gray-900">PetOwner<span className="text-mars-blue">360</span></span>
                        <button
                            className="ml-auto lg:hidden text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 space-y-3">
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
                                        w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                                        ${isActive
                                            ? 'bg-mars-blue text-white shadow-xl shadow-mars-blue/30 scale-105 translate-x-1 font-bold'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-mars-blue hover:translate-x-1'
                                        }
                                    `}
                                >
                                    <div className="flex items-center">
                                        <Icon
                                            size={20}
                                            className={`mr-3 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-mars-blue'}`}
                                        />
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                    {item.badge > 0 && (
                                        <span className={`
                                            text-xs font-bold px-2 py-0.5 rounded-full shadow-sm
                                            ${isActive ? 'bg-white text-mars-blue' : 'bg-mars-blue text-white'}
                                        `}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}

                        {/* Emergency Care CTA */}
                        <div className="mt-8 mx-1">
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-50"></div>

                                <div className="flex items-center mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                                    <h3 className="text-xs font-extrabold text-red-700 uppercase tracking-wider">Emergency Care</h3>
                                </div>

                                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                                    With your <span className="font-bold text-gray-800">Wellness Plan</span>, you have <span className="font-bold text-red-600">3 Remaining</span> Emergency Chat Sessions.
                                </p>

                                <button className="w-full bg-white border border-red-200 text-red-600 text-xs font-bold py-2 rounded-lg hover:bg-red-50 transition-colors shadow-sm flex items-center justify-center">
                                    Chat & Book Visit
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* User Profile Snippet */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="card-clay p-3 flex items-center cursor-pointer hover:scale-[1.02] transition-transform">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3 shadow-inner">
                                {currentPet.profile.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{currentPet.profile.name}</p>
                                <p className="text-xs text-gray-500 truncate">{currentPet.profile.species}</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full">
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
