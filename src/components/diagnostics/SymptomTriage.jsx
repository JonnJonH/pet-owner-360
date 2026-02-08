import React, { useState, useRef, useEffect } from 'react';
import { usePet } from '../../context/PetContext';
import { MessageSquare, Send, User, ChevronRight } from 'lucide-react';

const SymptomTriage = () => {
    const { currentPet } = usePet();
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: `Hi there! I'm the Pet Owner 360 AI Assistant. What symptoms is ${currentPet.profile.name} experiencing today?` }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock AI response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: "I understand. Based on 'lethargy' and 'loss of appetite' in a 15-year-old tortoise, this could be related to temperature fluctuations or post-brumation stress. I recommend checking his basking spot temp."
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-md font-extrabold text-gray-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-mars-blue" />
                    Symptom Triage
                </h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Online</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.type === 'user'
                            ? 'bg-mars-blue text-white rounded-tr-sm'
                            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a symptom (e.g., 'not eating')..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mars-blue/20 focus:border-mars-blue transition-all"
                />
                <button
                    type="submit"
                    className="bg-mars-blue text-white p-2 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-50"
                    disabled={!input.trim()}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default SymptomTriage;
