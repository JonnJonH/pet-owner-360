import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PetProvider, usePet } from './context/PetContext';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './components/auth/LoginPage';
import WellnessDashboard from './components/widgets/WellnessDashboard';
import SmartAlertStream from './components/widgets/SmartAlertStream';
import DigitalTwinTimeline from './components/timeline/DigitalTwinTimeline';
import IndividualisEngine from './components/nutrition/IndividualisEngine';
import PetOwner360 from './components/engagement/PetOwner360';
import DentalCheck from './components/diagnostics/DentalCheck';
import SymptomTriage from './components/diagnostics/SymptomTriage';
import HealthRecords from './components/health/HealthRecords';
import { StoreProvider } from './context/StoreContext';
import StorePage from './components/store/StorePage';

function DashboardContent({ setActiveTab }) {
  const { currentPet } = usePet();

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Holistic wellness dashboard</h1>
            <p className="text-gray-500">Real-time biometrics and care insights for {currentPet.profile.name}</p>
          </div>
          <div className="hidden sm:flex items-center bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
            <ShieldCheck className="w-4 h-4 text-green-600 mr-1.5" />
            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
              Verified by Vet • {currentPet.profile.clinic.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <WellnessDashboard setActiveTab={setActiveTab} />
          <SmartAlertStream setActiveTab={setActiveTab} />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <DigitalTwinTimeline />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <IndividualisEngine />
          <PetOwner360 />
        </div>
      </div>
    </>
  );
}

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentPet, switchPet } = usePet();

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  };

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="h-full"
        >
          {activeTab === 'dashboard' && <DashboardContent setActiveTab={setActiveTab} />}

          {activeTab === 'diagnostics' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">AI diagnostic hub</h1>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Professional-grade screening tools powered by Whistle™ Health AI.
                  Results are instantly analyzed and shared with your vet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <DentalCheck />
                <SymptomTriage />
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <HealthRecords />
          )}

          {activeTab === 'store' && (
            <StorePage />
          )}
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
}

function App() {
  return (
    <PetProvider>
      <StoreProvider>
        <MainApp />
      </StoreProvider>
    </PetProvider>
  );
}

export default App;
