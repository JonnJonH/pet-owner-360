import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { usePet } from '../../context/PetContext';
import { useStore } from '../../context/StoreContext';
import { Camera, CheckCircle, AlertTriangle, X, Shield, Plus, Loader, Scan } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DentalCheck = () => {
    const { currentPet } = usePet();
    const { addToCart } = useStore();
    const webcamRef = useRef(null);
    const [step, setStep] = useState('start'); // start, scanning, analyzing, result
    const [imgSrc, setImgSrc] = useState(null);

    // Determine mode based on species
    const isTurtle = currentPet.profile.species.includes('Turtle') || currentPet.profile.species.includes('Cooter');
    const mode = isTurtle ? 'shell' : 'dental';

    // Content configuration
    const config = {
        dental: {
            title: "Greenies™ Dental Check",
            icon: <Camera className="w-5 h-5 mr-2 text-mars-blue" />,
            startTitle: "Scan your dog's teeth",
            startDesc: "Real-time AI analysis of gum health and dental hygiene using your camera.",
            scanningText: "ALIGNING MOUTH...",
            analyzingText: "Analyzing Plaque Levels...",
            resultTitle: "Mild Tartar Detected",
            resultDesc: "We detected early signs of tartar buildup on the upper molars.",
            metrics: [
                { label: "Gum Health", value: "Healthy", color: "text-green-600", icon: <CheckCircle size={14} className="mr-1" /> },
                { label: "Plaque Score", value: "2.5 / 5.0", color: "text-yellow-600", icon: null }
            ],
            product: {
                id: 'p3',
                name: 'Greenies™ Dental Treats',
                price: 18.99,
                image: '/products/greenies.jpg',
                species: ['Dog']
            },
            cta: "Add Greenies™ to Next Order"
        },
        shell: {
            title: "Shell Health AI™",
            icon: <Shield className="w-5 h-5 mr-2 text-mars-blue" />,
            startTitle: "Scan shell condition",
            startDesc: "Advanced computer vision detects shell rot and pyramidal growth patterns.",
            scanningText: "MAPPING SCUTES...",
            analyzingText: "Analyzing Keratin Density...",
            resultTitle: "UVB Deficiency Risk",
            resultDesc: "Minor scute retention detected. May indicate insufficient UVB exposure.",
            metrics: [
                { label: "Shell Hardness", value: "Optimal", color: "text-green-600", icon: <CheckCircle size={14} className="mr-1" /> },
                { label: "UVB Absorption", value: "Low", color: "text-yellow-600", icon: <AlertTriangle size={14} className="mr-1" /> }
            ],
            product: {
                id: 'p4',
                name: 'Fluval® UVB Bulb 13W',
                price: 34.99,
                image: '/products/fluval-uvb.jpg',
                species: ['Turtle']
            },
            cta: "Add UVB Bulb to Cart"
        }
    };

    const currentConfig = config[mode];

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setStep('analyzing');
        setTimeout(() => {
            setStep('result');
        }, 2000);
    }, [webcamRef]);

    const handleStart = () => {
        setStep('scanning');
        // Auto-capture after 3 seconds for demo purposes
        setTimeout(() => {
            if (webcamRef.current) {
                capture();
            }
        }, 3000);
    };

    const handleAddToCart = () => {
        addToCart(currentConfig.product);
        setTimeout(() => {
            alert(`Added ${currentConfig.product.name} to cart!`);
        }, 200);
    };

    const reset = () => {
        setStep('start');
        setImgSrc(null);
    };

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment"
    };

    return (
        <div className="card-clay overflow-hidden h-full flex flex-col p-0">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center shrink-0 bg-white/50 backdrop-blur-sm">
                <h2 className="text-lg font-extrabold text-gray-900 flex items-center">
                    {currentConfig.icon}
                    {currentConfig.title}
                </h2>
                {step !== 'start' && (
                    <button onClick={reset} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col relative">
                <AnimatePresence mode="wait">
                    {step === 'start' && (
                        <motion.div
                            key="start"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center py-8 flex flex-col items-center justify-center h-full"
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-20 h-20 rounded-2xl shadow-inner flex items-center justify-center mb-6 transform rotate-3">
                                {mode === 'dental' ? <Camera className="w-10 h-10 text-mars-blue" /> : <Shield className="w-10 h-10 text-mars-blue" />}
                            </div>
                            <h3 className="text-xl font-extrabold text-gray-900 mb-3">{currentConfig.startTitle}</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                                {currentConfig.startDesc}
                            </p>
                            <button
                                onClick={handleStart}
                                className="bg-mars-blue text-white px-8 py-3.5 rounded-xl font-extrabold shadow-lg shadow-mars-blue/30 hover:bg-blue-800 hover:scale-105 transition-all w-full md:w-auto"
                            >
                                Activate Camera
                            </button>
                        </motion.div>
                    )}

                    {step === 'scanning' && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black flex items-center justify-center"
                        >
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute inset-4 border-2 border-white/30 rounded-2xl">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-mars-blue rounded-tl-xl"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-mars-blue rounded-tr-xl"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-mars-blue rounded-bl-xl"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-mars-blue rounded-br-xl"></div>
                                </div>
                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500/50"></div>
                                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-500/50"></div>
                            </div>
                            <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                                <div className="inline-flex items-center bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                    <Scan className="w-4 h-4 text-mars-blue animate-pulse mr-2" />
                                    <span className="font-bold text-white text-xs tracking-widest">{currentConfig.scanningText}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            className="absolute inset-0 bg-black flex flex-col items-center justify-center"
                        >
                            {imgSrc && <img src={imgSrc} alt="captured" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />}
                            <div className="z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center">
                                <Loader className="w-12 h-12 text-mars-blue animate-spin mx-auto mb-4" />
                                <p className="text-white font-extrabold text-lg animate-pulse">{currentConfig.analyzingText}</p>
                            </div>
                        </motion.div>
                    )}

                    {step === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="h-full flex flex-col"
                        >
                            <div className="relative h-48 bg-gray-900 rounded-xl overflow-hidden mb-6 shrink-0 shadow-inner">
                                {imgSrc && <img src={imgSrc} alt="analysis result" className="w-full h-full object-cover opacity-80" />}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex items-center text-yellow-400 bg-gray-900/80 backdrop-blur-sm self-start inline-flex px-3 py-1.5 rounded-lg border border-yellow-500/30">
                                        <AlertTriangle className="w-4 h-4 mr-2" />
                                        <span className="font-bold text-sm tracking-wide">{currentConfig.resultTitle}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50/50 border border-yellow-100 rounded-xl p-4 mb-6">
                                <p className="text-sm text-yellow-800 font-medium leading-relaxed">
                                    {currentConfig.resultDesc}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {currentConfig.metrics.map((metric, idx) => (
                                    <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                                        <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-wider">{metric.label}</p>
                                        <p className={`${metric.color} font-extrabold flex items-center justify-center text-lg`}>
                                            {metric.icon} {metric.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-all flex items-center justify-center shadow-lg hover:shadow-green-900/20 active:scale-95 mt-auto"
                            >
                                <Plus size={18} className="mr-2" />
                                {currentConfig.cta}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DentalCheck;
