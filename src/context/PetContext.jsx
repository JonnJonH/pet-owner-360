import React, { createContext, useContext, useState, useEffect } from 'react';
import { pets } from '../data/store';

const PetContext = createContext();

export const PetProvider = ({ children }) => {
    // Default to Roger initially, or persist in localStorage
    const [currentPetId, setCurrentPetId] = useState(() => {
        return localStorage.getItem('currentPetId') || 'roger';
    });

    // Make pets stateful to allow updates
    const [allPets, setAllPets] = useState(pets);

    const currentPet = allPets[currentPetId];

    const switchPet = (petId) => {
        if (allPets[petId]) {
            setCurrentPetId(petId);
            localStorage.setItem('currentPetId', petId);
            console.log(`Switched to ${allPets[petId].profile.name}`);
        }
    };

    const addMedicalHistory = (newRecords) => {
        setAllPets(prev => ({
            ...prev,
            [currentPetId]: {
                ...prev[currentPetId],
                medicalHistory: [
                    ...newRecords,
                    ...prev[currentPetId].medicalHistory
                ]
            }
        }));
    };

    return (
        <PetContext.Provider value={{ currentPet, switchPet, allPets, addMedicalHistory }}>
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
