import React, { createContext, useContext, useState, useEffect } from 'react';
import { pets } from '../data/store';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
    // Default to Roger initially, or persist in localStorage
    const [currentPetId, setCurrentPetId] = useState(() => {
        return localStorage.getItem('currentPetId') || 'roger';
    });

    const currentPet = pets[currentPetId];

    const switchPet = (petId) => {
        if (pets[petId]) {
            setCurrentPetId(petId);
            localStorage.setItem('currentPetId', petId);
            console.log(`Switched to ${pets[petId].profile.name}`);
        }
    };

    return (
        <PetContext.Provider value={{ currentPet, switchPet, allPets: pets }}>
            {children}
        </PetContext.Provider>
    );
};

export const usePet = () => {
    const context = useContext(PetContext);
    if (!context) {
        throw new Error('usePet must be used within a PetProvider');
    }
    return context;
};
