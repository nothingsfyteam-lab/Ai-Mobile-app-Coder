import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AppBuilderPage from './pages/AppBuilderPage';

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'builder'>('home');
  const [credits, setCredits] = useState(5);

  const navigateToBuilder = () => setPage('builder');
  const navigateToHome = () => setPage('home');

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  const useCredit = () => {
    if (credits > 0) {
      setCredits(prev => prev - 1);
      return true;
    }
    return false;
  };


  return (
    <>
      {page === 'home' && (
        <HomePage 
          onNavigateToBuilder={navigateToBuilder} 
          credits={credits}
          addCredits={addCredits}
        />
      )}
      {page === 'builder' && (
        <AppBuilderPage 
          onNavigateToHome={navigateToHome} 
          initialCredits={credits}
          onAddCredits={addCredits}
          onUseCredit={useCredit}
        />
      )}
    </>
  );
};

export default App;