import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { usePet } from '../../context/PetContext';
import { useStore } from '../../context/StoreContext';
import { Camera, CheckCircle, AlertTriangle, X, Shield, Plus } from 'lucide-react';

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    {currentConfig.icon}
                    {currentConfig.title}
                </h2>
                {step !== 'start' && (
                    <button onClick={reset} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
                {step === 'start' && (
                    <div className="text-center py-8">
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            {mode === 'dental' ? <Camera className="w-8 h-8 text-blue-600" /> : <Shield className="w-8 h-8 text-blue-600" />}
                        </div>
                        <h3 className="text-lg font-extrabold text-gray-900 mb-2">{currentConfig.startTitle}</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            {currentConfig.startDesc}
                        </p>
                        <button
                            onClick={handleStart}
                            className="bg-mars-blue text-white px-6 py-3 rounded-full font-extrabold shadow-lg hover:bg-blue-800 hover-smooth focus-ring hover:scale-105 active:scale-95 min-h-[44px]"
                        >
                            Activate Camera
                        </button>
                    </div>
                )}

                {step === 'scanning' && (
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 border-2 border-white/50 rounded-lg pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-48 border-2 border-white/80 rounded-lg"></div>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 text-center text-white z-10">
                            <p className="font-bold tracking-wider bg-black/50 inline-block px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                                {currentConfig.scanningText}
                            </p>
                        </div>
                    </div>
                )}

                {step === 'analyzing' && (
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                        {imgSrc && <img src={imgSrc} alt="captured" className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            <div className="w-16 h-16 border-4 border-mars-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-white font-extrabold text-lg animate-pulse">{currentConfig.analyzingText}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                            <div className="bg-mars-blue h-full animate-[width_2s_ease-in-out_forwards]" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                )}

                {step === 'result' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                        <div className="relative h-48 bg-black rounded-xl overflow-hidden mb-6 shrink-0">
                            {imgSrc && <img src={imgSrc} alt="analysis result" className="w-full h-full object-cover" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                <div className="flex items-center text-yellow-400">
                                    <AlertTriangle className="w-5 h-5 mr-2" />
                                    <span className="font-bold">{currentConfig.resultTitle}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-6">
                            <p className="text-sm text-yellow-800 font-medium leading-relaxed">
                                {currentConfig.resultDesc}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {currentConfig.metrics.map((metric, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                                    <p className={`${metric.color} font-bold flex items-center justify-center`}>
                                        {metric.icon} {metric.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center shadow-lg focus-ring mt-auto"
                        >
                            <Plus size={18} className="mr-2" />
                            {currentConfig.cta}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DentalCheck;
