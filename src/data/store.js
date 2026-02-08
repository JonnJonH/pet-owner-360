export const pets = {
    roger: {
        id: "roger",
        profile: {
            name: "Roger",
            species: "Florida Red-Bellied Turtle (Pseudemys nelsoni)",
            dob: "2009-08-01",
            sex: "Female",
            microchip: "978000000012345",
            weight: 3.8, // kg (From 2024 Exam)
            targetWeight: 3.5, // (Based on 2021 notes)
            bcs: "6/9 (Mildly Overweight)",
            clinic: "Linnaeus Veterinary Clinic - Ashford",
            owner: "Alex Johnson",
            avatar: "🐢"
        },
        medicalHistory: [
            { date: "2024-07-15", type: "Wellness Exam", note: "Healthy, mild overweight. No new issues.", source: "Linnaeus" },
            { date: "2018-10-20", type: "Surgery Recheck", note: "Shell fracture fully healed. Hardware removed.", source: "Linnaeus" },
            { date: "2018-07-22", type: "Emergency", note: "Traumatic Carapace Fracture (Dog Attack). Surgery: Epoxy/Screw fixation.", source: "VCA Emergency" },
            { date: "2015-11-15", type: "Illness", note: "Pneumonia. Treated with Enrofloxacin.", source: "BluePearl Specialty" },
            { date: "2013-04-05", type: "Dermatology", note: "Shell Rot (Bacterial/Fungal). Resolved with Dry Docking.", source: "Banfield" },
            { date: "2009-09-20", type: "Pediatrics", note: "Intestinal Parasites (Roundworm). Treated.", source: "Antech Diagnostics" }
        ],
        biometrics: {
            waterTemp: "26°C", // Live IoT Data from API® Heater
            baskingTemp: "32°C",
            uvbOutput: "85% (Replace bulb in 3 weeks)",
            activityLevel: "Moderate (Hibernation Prep)",
            environment: "Aquatic"
        },
        predictiveInsights: {
            riskLevel: "Medium",
            alerts: [
                { id: 1, type: "Genetic/Breed", message: "Species prone to Shell Rot if humidity >70% without drying." },
                { id: 2, type: "Trauma History", message: "Previous Dog Attack (2018). Monitor shell integrity annually." },
                { id: 3, type: "Weight", message: "Current: 3.8kg. Target: 3.5kg. Obesity risk detected." }
            ]
        },
        genomics: {
            provider: "Wisdom Panel™",
            breed: {
                primary: "Florida Red-Bellied Cooter",
                percentage: 100,
                confidence: "High",
                traits: ["Aquatic", "Basking-Lover", "Herbivore"]
            },
            healthMarkers: [
                { id: 1, name: "MDR1 Drug Sensitivity", status: "Clear", risk: "None" },
                { id: 2, name: "Shell Rot Susceptibility", status: "Carrier", risk: "Medium (Requires Dry Docking)" },
                { id: 3, name: "Metabolic Bone Disease", status: "Clear", risk: "Low" }
            ]
        }
    },
    holly: {
        id: "holly",
        profile: {
            name: "Holly",
            species: "Scottish Terrier",
            dob: "2016-03-01",
            sex: "Female (Spayed)",
            microchip: "978000000045678",
            weight: 10.6, // kg
            targetWeight: 10.0,
            bcs: "5/9 (Ideal)",
            clinic: "Linnaeus Veterinary Clinic - Ashford",
            owner: "Sarah Whitfield",
            avatar: "🐕"
        },
        medicalHistory: [
            { date: "2023-11-14", type: "Orthopedic", note: "Partial cranial cruciate tear (Right Stifle). Conservative management.", source: "Linnaeus" },
            { date: "2021-03-10", type: "Dental", note: "Stage II Periodontal Disease. Scale, polish, extractions.", source: "Linnaeus" },
            { date: "2018-08-18", type: "Dermatology", note: "Atopic Dermatitis diagnosed. Cytopoint injections started.", source: "Linnaeus" },
            { date: "2016-05-12", type: "Pediatrics", note: "Giardia infection. Resolved with Fenbendazole.", source: "Linnaeus" }
        ],
        biometrics: {
            dailySteps: "4,203",
            stepsTarget: "5,000",
            activityLevel: "Moderate (Managed for Stifle)",
            sleepQuality: "Good (8h avg)",
            environment: "Terrestrial"
        },
        predictiveInsights: {
            riskLevel: "Medium",
            alerts: [
                { id: 1, type: "Orthopedic", message: "Monitor Right Stifle. Limit high-impact play." },
                { id: 2, type: "Dermatology", message: "Spring Allergy Season approaching. Check paws for redness." },
                { id: 3, type: "Genetics", message: "Breed risk: Von Willebrand's Disease (vWD). Screen before surgery." }
            ]
        },
        genomics: {
            provider: "Wisdom Panel™",
            breed: {
                primary: "Scottish Terrier",
                percentage: 100,
                confidence: "High",
                traits: ["Independent", "Spirited", "Alert"]
            },
            healthMarkers: [
                { id: 1, name: "Von Willebrand's Disease (vWD)", status: "At Risk", risk: "High (Breed Predisposition)" },
                { id: 2, name: "Craniomandibular Osteopathy", status: "Carrier", risk: "Medium" },
                { id: 3, name: "Scottie Cramp", status: "Clear", risk: "Low" }
            ]
        }
    }
};

export const calculateWellnessScore = (pet) => {
    let score = 100;

    // Weight deductions
    if (pet.profile.weight > pet.profile.targetWeight * 1.1) score -= 10; // >10% overweight

    // Risk deductions
    if (pet.predictiveInsights.riskLevel === "Medium") score -= 15;
    if (pet.predictiveInsights.riskLevel === "High") score -= 30;

    // Condition specific
    if (pet.medicalHistory.some(h => h.date.startsWith("2024") || h.date.startsWith("2025"))) {
        // Recent issues don't necessarily lower score if managed, but pending issues do
    }

    return Math.max(0, score);
};
