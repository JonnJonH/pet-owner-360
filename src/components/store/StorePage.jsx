import React, { useState } from 'react';
import { usePet } from '../../context/PetContext';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Plus, Minus, Trash2, Package, Tag, Filter, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRODUCTS = [
    {
        id: 'p1',
        name: 'Royal Canin® Urinary SO',
        category: 'Nutrition',
        price: 89.99,
        image: '/products/royal-canin-urinary.jpg',
        species: ['Dog', 'Cat'],
        description: 'Veterinary exclusive diet for urinary health.'
    },
    {
        id: 'p2',
        name: 'Mazuri® Aquatic Turtle Diet',
        category: 'Nutrition',
        price: 24.99,
        image: '/products/mazuri-turtle.jpg',
        species: ['Turtle'],
        description: 'Complete nutrition for all life stages of fresh water turtles.'
    },
    {
        id: 'p3',
        name: 'Greenies™ Dental Treats',
        category: 'Treats',
        price: 18.99,
        image: '/products/greenies.jpg',
        species: ['Dog'],
        description: 'One a day helps keep tartar away.'
    },
    {
        id: 'p4',
        name: 'Fluval® UVB Bulb 13W',
        category: 'Habitat',
        price: 34.99,
        image: '/products/fluval-uvb.jpg',
        species: ['Turtle', 'Lizard'],
        description: 'Essential UVB light for calcium absorption and healthy shell growth.'
    },
    {
        id: 'p5',
        name: 'Whistle™ Health Device',
        category: 'Tech',
        price: 149.00,
        image: '/products/whistle.jpg',
        species: ['Dog'],
        description: 'Smart device to track behavior, health, and location.'
    }
];

const StorePage = () => {
    const { currentPet } = usePet();
    const { addToCart, cart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useStore();
    const [filter, setFilter] = React.useState('All');
    const [checkoutState, setCheckoutState] = useState('idle'); // idle, processing, success

    // Filter products based on current pet species (rudimentary logic)
    const isTurtle = currentPet.profile.species.includes('Turtle') || currentPet.profile.species.includes('Cooter');
    const petSpecies = isTurtle ? 'Turtle' : 'Dog';

    const recommendedProducts = PRODUCTS.filter(p => p.species.includes(petSpecies));
    const otherProducts = PRODUCTS.filter(p => !p.species.includes(petSpecies));

    const displayedProducts = filter === 'All'
        ? [...recommendedProducts, ...otherProducts]
        : PRODUCTS.filter(p => p.category === filter);

    const categories = ['All', 'Nutrition', 'Treats', 'Habitat', 'Tech'];

    const handleCheckout = () => {
        setCheckoutState('processing');
        setTimeout(() => {
            setCheckoutState('success');
            // Reset after delay (optional, or keep success state)
        }, 1500);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative min-h-screen">
            {/* Main Product Grid */}
            <div className="flex-1 pb-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Pet Care Store</h1>
                    <p className="text-gray-500">Curated recommendations for {currentPet.profile.name} (Fulfilled by Chewy)</p>
                </div>

                {/* Filters */}
                <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${filter === cat
                                ? 'bg-mars-blue text-white shadow-lg shadow-mars-blue/20'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedProducts.map(product => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={product.id}
                            className="card-clay p-0 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="h-56 overflow-hidden bg-gray-100 relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                {product.species.includes(petSpecies) && (
                                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-md">
                                        For {currentPet.profile.name}
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                            </div>
                            <div className="p-6 flex flex-col h-[200px]">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{product.category}</div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-extrabold text-mars-blue">${product.price}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-gray-900 text-white p-3 rounded-xl hover:bg-mars-blue transition-all shadow-md hover:shadow-lg active:scale-95"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Slide-over Cart */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white/90 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
                        <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
                            <ShoppingBag className="mr-3 text-mars-blue" /> Your Cart
                        </h2>
                        <button onClick={() => setIsCartOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                            Close
                        </button>
                    </div>

                    {!checkoutState.includes('success') ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="text-center py-20 opacity-50 flex flex-col items-center">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <ShoppingBag size={32} className="text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 font-bold text-lg">Your cart is empty</p>
                                        <p className="text-sm text-gray-400">add some treats for {currentPet.profile.name}!</p>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <motion.div layout key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">{item.name}</h4>
                                                    <span className="text-sm font-bold text-mars-blue">${item.price}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded-md transition-colors"><Minus size={14} /></button>
                                                        <span className="text-xs font-bold w-8 text-center">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded-md transition-colors"><Plus size={14} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            <div className="p-8 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-600 font-medium">Subtotal</span>
                                    <span className="text-3xl font-extrabold text-gray-900">${cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={cart.length === 0 || checkoutState === 'processing'}
                                    className={`w-full bg-mars-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200 flex items-center justify-center
                                        ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {checkoutState === 'processing' ? 'Processing...' : 'Checkout via Chewy'}
                                    {checkoutState !== 'processing' && <ArrowRight className="ml-2" />}
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-4">
                                    Secure checkout powered by Chewy.com integration
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-inner">
                                <Check size={48} strokeWidth={3} />
                            </div>
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Placed!</h2>
                            <p className="text-gray-500 mb-8 max-w-xs">
                                Your order has been sent to Chewy for fulfillment. Expect a confirmation email shortly.
                            </p>
                            <button
                                onClick={() => { setIsCartOpen(false); setCheckoutState('idle'); }}
                                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay Backdrops */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsCartOpen(false)}
                />
            )}
        </div>
    );
};

export default StorePage;
