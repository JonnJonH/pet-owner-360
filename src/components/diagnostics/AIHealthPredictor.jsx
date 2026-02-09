import React, { useState, useEffect } from 'react';
import { usePet } from '../../context/PetContext';
import { useStore } from '../../context/StoreContext';
import { Brain, ShieldCheck, Lock, Check, ChevronRight, AlertCircle, TrendingUp, Database, FileText, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIHealthPredictor = () => {
    const { currentPet } = usePet();
    const { addToCart } = useStore();
    const [state, setState] = useState('opt-in'); // opt-in, analyzing, results
    const [progress, setProgress] = useState(0);
    const [analysisStep, setAnalysisStep] = useState('Initializing...');

    const isTurtle = currentPet.profile.species.includes('Turtle') || currentPet.profile.species.includes('Cooter');

    // Prediction Data
    const prediction = isTurtle ? {
        risk: "Vitamin A Deficiency (Hypovitaminosis A)",
        probability: "Medium (45%)",
        reasoning: [
            "Species predisposition (River Cooter)",
            "Indoor habitat constraints",
            "Seasonal diet variation detected"
        ],
        product: {
            id: 'p6', // Unique ID
            name: 'Mazuri® Aquatic Turtle Diet (Vitamin A enriched)',
            price: 12.99,
            image: '/products/mazuri-turtle.jpg', // Reusing image for demo
            species: ['Turtle']
        }
    } : {
        risk: "Osteoarthritis / Joint Mobility",
        probability: "High (78%)",
        reasoning: [
            "Advanced age (12 years)",
            "Breed risk factor (Golden Retriever mix)",
            "Step count trend declined 15% in Q4"
        ],
        product: {
            id: 'p7', // Unique ID
            name: 'Royal Canin® Eukanuba Joint Mobility',
            price: 94.99,
            image: '/products/royal-canin-urinary.jpg', // Reusing placeholder for demo (in real app would be different)
            species: ['Dog']
        }
    };

    const runAnalysis = () => {
        setState('analyzing');
        const steps = [
            { pct: 10, text: "Connecting to Mars Petcare Global Data Lake..." },
            { pct: 30, text: `Anonymizing ${currentPet.profile.name}'s records...` },
            { pct: 50, text: "Comparing against 20 million peer records..." },
            { pct: 75, text: "Identifying breed-specific genetic markers..." },
            { pct: 90, text: "Calculating predictive trajectories..." },
            { pct: 100, text: "Finalizing recommendation..." }
        ];

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep >= steps.length) {
                clearInterval(interval);
                setState('results');
                return;
            }
            setProgress(steps[currentStep].pct);
            setAnalysisStep(steps[currentStep].text);
            currentStep++;
        }, 800);
    };

    return (
        <div className="card-clay p-0 overflow-hidden relative min-h-[400px] flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-indigo-200">
                        <Brain className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-gray-900">Renaissance™ AI Predictor</h2>
                        <p className="text-xs text-gray-500 font-medium">Powered by Mars Petcare Science</p>
                    </div>
                </div>
                {state === 'results' && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Analysis Complete
                    </span>
                )}
            </div>

            <div className="p-8 flex-1 flex flex-col items-center justify-center relative">
                <AnimatePresence mode="wait">
                    {/* OPT-IN STATE */}
                    {state === 'opt-in' && (
                        <motion.div
                            key="opt-in"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center max-w-lg mx-auto"
                        >
                            <Database className="w-16 h-16 text-indigo-200 mx-auto mb-6" />
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Predict health issues before they happen.</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                By connecting {currentPet.profile.name}'s medical history with our global database of <strong>20 million pets</strong>,
                                Renaissance™ AI can identify proactive care opportunities unique to their biology.
                            </p>

                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-8 text-left flex items-start">
                                <Lock className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-indigo-900 text-sm">Data Privacy Guarantee</h4>
                                    <p className="text-xs text-indigo-700 mt-1">
                                        Your data is anonymized and encrypted. It is never sold to third parties and is used solely for generating your pet's health insights.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={runAnalysis}
                                className="w-full md:w-auto bg-mars-blue text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-mars-blue/20 hover:scale-105 transition-transform flex items-center justify-center mx-auto"
                            >
                                <Brain className="w-5 h-5 mr-2" />
                                Analyze {currentPet.profile.name}'s Records
                            </button>
                        </motion.div>
                    )}

                    {/* ANALYZING STATE */}
                    {state === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-md mx-auto text-center"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-8">
                                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-indigo-600">{progress}%</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{analysisStep}</h3>
                            <div className="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
                                <motion.div
                                    className="bg-indigo-600 h-full rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="mt-8 grid grid-cols-3 gap-4 opacity-50">
                                <div className="flex flex-col items-center">
                                    <FileText className="w-6 h-6 mb-2 text-gray-400" />
                                    <span className="text-xs font-bold text-gray-300">Med History</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Database className="w-6 h-6 mb-2 text-gray-400" />
                                    <span className="text-xs font-bold text-gray-300">Global Data</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Activity className="w-6 h-6 mb-2 text-gray-400" />
                                    <span className="text-xs font-bold text-gray-300">Biometrics</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* RESULTS STATE */}
                    {state === 'results' && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {/* Left: Findings */}
                            <div className="text-left space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Primary Prediction</h3>
                                    <div className="flex items-start text-indigo-900 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                        <AlertCircle className="w-6 h-6 text-indigo-600 mr-3 shrink-0" />
                                        <div>
                                            <span className="font-extrabold text-xl block mb-1">{prediction.risk}</span>
                                            <span className="text-sm font-medium text-indigo-700">Probability: {prediction.probability}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Analysis Factors</h3>
                                    <ul className="space-y-3">
                                        {prediction.reasoning.map((reason, idx) => (
                                            <li key={idx} className="flex items-center text-gray-700 font-medium">
                                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 shrink-0">
                                                    <Check className="w-3 h-3 text-green-600" />
                                                </div>
                                                {reason}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right: Recommendation */}
                            <div className="bg-white rounded-2xl border-2 border-green-100 p-6 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                    AI Recommended
                                </div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Preventative Care Plan</h3>

                                <div className="flex items-center mb-6">
                                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0 mr-4 border border-gray-200">
                                        <img src={prediction.product.image} alt={prediction.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 leading-tight mb-1">{prediction.product.name}</h4>
                                        <p className="text-green-600 font-bold text-lg">${prediction.product.price}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { addToCart(prediction.product); alert("Added to cart!"); }}
                                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-mars-blue transition-colors flex items-center justify-center"
                                >
                                    Add Prevention to Order <ChevronRight className="ml-1 w-4 h-4" />
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-3">
                                    Clinically proven to address {prediction.risk.split(' ')[0]} issues.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AIHealthPredictor;
