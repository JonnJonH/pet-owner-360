import React, { useState } from 'react';
import { Home, Activity, MessageSquare, ShoppingBag, Menu, X, Settings, User, Calendar, Send } from 'lucide-react';
import { usePet } from '../../context/PetContext';
import { useStore } from '../../context/StoreContext';

const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen, isBookingModalOpen, setIsBookingModalOpen }) => {
    const { currentPet } = usePet();
    const { cartCount } = useStore();

    // Removed local state: const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState('date'); // date, confirming, success

    const handleBooking = () => {
        setBookingStep('confirming');
        setTimeout(() => {
            setBookingStep('success');
            setTimeout(() => {
                setIsBookingModalOpen(false);
                setBookingStep('date');
            }, 2000);
        }, 1500);
    };

    // Emergency Chat State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [isVetTyping, setIsVetTyping] = useState(false);
    const [chatStep, setChatStep] = useState('connecting'); // connecting, connected, chatting

    const startEmergencyChat = () => {
        setIsChatOpen(true);
        setChatMessages([]);
        setChatStep('connecting');

        // Simulate connection sequence
        setTimeout(() => {
            setChatStep('connected');
            setTimeout(() => {
                setChatStep('chatting');
                setIsVetTyping(true);
                setTimeout(() => {
                    setIsVetTyping(false);
                    setChatMessages([{
                        sender: 'vet',
                        text: "This is the Emergency Triage Line. I'm Dr. Sarah. Please briefly describe your pet's emergency."
                    }]);
                }, 1500);
            }, 1000);
        }, 1500);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = { sender: 'user', text: chatInput };
        setChatMessages(prev => [...prev, userMsg]);
        setChatInput('');
        setIsVetTyping(true);

        // Simulate vet response
        setTimeout(() => {
            setIsVetTyping(false);
            setChatMessages(prev => [...prev, {
                sender: 'vet',
                text: "I understand. Based on your location, I'm alerting the nearest 24/7 clinic. Please proceed to: 123 Pet Health Way. They are expecting you."
            }]);
        }, 2000);
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'health', label: 'Health Records', icon: Activity },
        { id: 'diagnostics', label: 'Diagnostics', icon: MessageSquare },
        { id: 'store', label: 'Nutrition & Shop', icon: ShoppingBag, badge: cartCount },
    ];

    return (
        <>
            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsBookingModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-extrabold text-gray-900 flex items-center">
                                    <Calendar className="mr-2 text-mars-blue" />
                                    Book Appointment
                                </h3>
                                <button onClick={() => setIsBookingModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            {bookingStep === 'date' && (
                                <div className="space-y-4">
                                    <p className="text-gray-600">Select a preferred time for your visit to <strong>Banfield Pet Hospital</strong>.</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Tomorrow, 9:00 AM', 'Tomorrow, 2:00 PM', 'Wed, 10:30 AM', 'Wed, 4:15 PM'].map((time) => (
                                            <button key={time} className="p-3 rounded-xl border border-gray-200 hover:border-mars-blue hover:bg-blue-50 text-left transition-colors group">
                                                <span className="block text-sm font-bold text-gray-900 group-hover:text-mars-blue">{time}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="pt-4">
                                        <button onClick={handleBooking} className="w-full btn-mars-primary py-3">
                                            Confirm Booking
                                        </button>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 'confirming' && (
                                <div className="py-12 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 border-4 border-mars-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <h4 className="text-lg font-bold text-gray-900">Scheduling...</h4>
                                </div>
                            )}

                            {bookingStep === 'success' && (
                                <div className="py-8 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                        <Calendar size={32} />
                                    </div>
                                    <h4 className="text-xl font-extrabold text-gray-900 mb-2">Appointment Confirmed!</h4>
                                    <p className="text-gray-500">We've sent the details to your email.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Emergency Chat Modal */}
            {isChatOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsChatOpen(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] max-h-[90vh] relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col">
                        {/* Header */}
                        <div className="bg-red-600 p-4 flex justify-between items-center shadow-md z-20">
                            <h3 className="text-white font-extrabold flex items-center">
                                <Activity className="mr-2 text-white animate-pulse" />
                                Emergency Triage
                            </h3>
                            <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col space-y-4">
                            {chatStep === 'connecting' && (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                                    <p className="text-sm font-semibold animate-pulse">Connecting to Vet Professional...</p>
                                </div>
                            )}

                            {chatStep === 'connected' && (
                                <div className="flex justify-center my-4">
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        Secure Connection Established
                                    </span>
                                </div>
                            )}

                            {(chatStep === 'chatting' || chatStep === 'connected') && (
                                <>
                                    {chatMessages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`
                                                max-w-[80%] rounded-2xl p-3 text-sm shadow-sm
                                                ${msg.sender === 'user'
                                                    ? 'bg-mars-blue text-white rounded-tr-none'
                                                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                                                }
                                            `}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}

                                    {isVetTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder={chatStep === 'chatting' ? "Type a message..." : "Connecting..."}
                                    disabled={chatStep !== 'chatting'}
                                    className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-mars-blue focus:ring-0 rounded-xl px-4 py-3 text-sm transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!chatInput.trim() || chatStep !== 'chatting'}
                                    className="bg-mars-blue text-white p-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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


                        {/* Book Appointment CTA */}
                        <div className="mt-6 mx-1">
                            <div
                                className="bg-blue-50 border border-blue-100 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setIsBookingModalOpen(true)}
                            >
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-blue-100 rounded-full blur-xl opacity-50"></div>

                                <div className="flex items-center mb-2">
                                    <div className="p-1.5 bg-blue-100 rounded-lg mr-2 text-blue-600">
                                        <Calendar size={14} strokeWidth={3} />
                                    </div>
                                    <h3 className="text-xs font-extrabold text-blue-800 uppercase tracking-wider">Vet Visit</h3>
                                </div>

                                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                                    Time for a checkup? Schedule your next visit with <span className="font-bold text-gray-800">Banfield</span>.
                                </p>

                                <button className="w-full bg-white border border-blue-200 text-blue-600 text-xs font-bold py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center">
                                    Book Appointment
                                </button>
                            </div>
                        </div>

                        {/* Emergency Care CTA */}
                        <div className="mt-4 mx-1">
                            <div
                                className="bg-red-50 border border-red-100 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
                                onClick={startEmergencyChat}
                            >
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
