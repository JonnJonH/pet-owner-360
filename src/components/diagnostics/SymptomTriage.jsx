import React, { useState, useRef, useEffect } from 'react';
import { usePet } from '../../context/PetContext';
import { MessageSquare, Send, User, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SymptomTriage = () => {
    const { currentPet } = usePet();
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: `Hi there! I'm the Pet Owner 360 AI Assistant. What symptoms is ${currentPet.profile.name} experiencing today?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: "I understand. Based on 'lethargy' and 'loss of appetite' in a 15-year-old tortoise, this could be related to temperature fluctuations or post-brumation stress. I recommend checking his basking spot temp."
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="card-clay flex flex-col h-[500px] p-0 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                <h2 className="text-md font-extrabold text-gray-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-mars-blue" />
                    Symptom Triage
                </h2>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1.5"></div>
                        <span className="text-xs font-bold text-green-700">AI Online</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30 scroll-smooth">
                {messages.map(msg => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.type === 'bot' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mars-blue to-blue-600 flex items-center justify-center mr-2 shadow-sm shrink-0">
                                <Sparkles size={14} className="text-white" />
                            </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed ${msg.type === 'user'
                            ? 'bg-mars-blue text-white rounded-tr-sm'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                            }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mars-blue to-blue-600 flex items-center justify-center mr-2 shadow-sm shrink-0">
                            <Sparkles size={14} className="text-white" />
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex space-x-1 items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe symptoms..."
                    className="flex-1 bg-gray-50 border-0 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mars-blue/20 transition-all font-medium"
                />
                <button
                    type="submit"
                    className="bg-mars-blue text-white p-3 rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 hover:scale-105 active:scale-95 shadow-lg shadow-mars-blue/20"
                    disabled={!input.trim()}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default SymptomTriage;
