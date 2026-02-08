import React from 'react';
import { usePet } from '../../context/PetContext';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Plus, Minus, Trash2, Package, Tag, Filter } from 'lucide-react';

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

    // Filter products based on current pet species (rudimentary logic)
    const isTurtle = currentPet.profile.species.includes('Turtle') || currentPet.profile.species.includes('Cooter');
    const petSpecies = isTurtle ? 'Turtle' : 'Dog';

    const recommendedProducts = PRODUCTS.filter(p => p.species.includes(petSpecies));
    const otherProducts = PRODUCTS.filter(p => !p.species.includes(petSpecies));

    const displayedProducts = filter === 'All'
        ? [...recommendedProducts, ...otherProducts]
        : PRODUCTS.filter(p => p.category === filter);

    const categories = ['All', 'Nutrition', 'Treats', 'Habitat', 'Tech'];

    return (
        <div className="flex flex-collg:flex-row gap-8 relative">
            {/* Main Product Grid */}
            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Pet Care Store</h1>
                    <p className="text-gray-500">Curated recommendations for {currentPet.profile.name}</p>
                </div>

                {/* Filters */}
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filter === cat
                                ? 'bg-mars-blue text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="h-48 overflow-hidden bg-gray-100 relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                {product.species.includes(petSpecies) && (
                                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                                        For {currentPet.profile.name}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{product.category}</div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xl font-extrabold text-mars-blue">${product.price}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-gray-900 text-white p-2.5 rounded-full hover:bg-mars-blue transition-colors shadow-sm"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Slide-over Cart (or Sidebar on large screens) */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                        <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
                            <ShoppingBag className="mr-2" /> Your Cart
                        </h2>
                        <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                            Close
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="text-center py-10 opacity-50">
                                <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                                <p className="text-gray-500 font-medium">Your cart is empty</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm font-bold text-mars-blue">${item.price}</span>
                                            <div className="flex items-center bg-gray-100 rounded-lg">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-red-500 px-2"><Minus size={14} /></button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-green-500 px-2"><Plus size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 font-medium">Subtotal</span>
                            <span className="text-xl font-extrabold text-gray-900">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-mars-blue text-white py-3.5 rounded-xl font-bold hover:bg-blue-800 transition-shadow shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
                            Checkout via Chewy
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay Backdrops */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setIsCartOpen(false)}
                />
            )}
        </div>
    );
};

export default StorePage;
