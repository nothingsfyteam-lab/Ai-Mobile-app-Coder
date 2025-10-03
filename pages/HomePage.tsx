import React, { useState } from 'react';
import { CoinIcon } from '../components/icons';
import CryptoPaymentModal from '../components/CryptoPaymentModal';

interface CreditPackage {
  credits: number;
  price: number;
}

const creditPackages: CreditPackage[] = [
  { credits: 10, price: 0.001 },
  { credits: 25, price: 0.002 },
  { credits: 50, price: 0.0035 },
];

interface HomePageProps {
  onNavigateToBuilder: () => void;
  credits: number;
  addCredits: (amount: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToBuilder, credits, addCredits }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);

  const handleBuyClick = (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (selectedPackage) {
      addCredits(selectedPackage.credits);
    }
    setIsModalOpen(false);
    setSelectedPackage(null);
  };
  
  return (
    <div className="min-h-screen bg-primary text-gray-200 font-sans flex flex-col">
      <header className="absolute top-0 left-0 right-0 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Nothingsfy.de</h1>
          <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
            <CoinIcon className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-white">{credits} Credits</span>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 flex-grow flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="text-center w-full py-20">
          <div className="opacity-0 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">Nothingsfy.de</h1>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <p className="text-xl md:text-2xl text-accent">Creative Development Studio</p>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
             <p className="max-w-2xl mx-auto mt-6 text-gray-400">
              We build performant, beautiful, and accessible web & mobile experiences with a passion for clean code and user-centric design.
            </p>
          </div>
           <div className="opacity-0 animate-fade-in-up mt-8" style={{ animationDelay: '600ms' }}>
              <button
                onClick={onNavigateToBuilder}
                className="bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Create an App with AI
              </button>
           </div>
        </section>

        {/* Buy Credits Section */}
        <section id="buy-credits" className="w-full max-w-4xl py-12 text-center">
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <h2 className="text-3xl font-bold text-white mb-2">Buy Credits</h2>
            <p className="text-gray-400 mb-8">Purchase credits using cryptocurrency to continue building your apps.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creditPackages.map((pkg, index) => (
                <div key={index} className="bg-secondary p-6 rounded-lg border border-primary transform hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white">{pkg.credits} Credits</h3>
                  <p className="text-accent text-xl font-semibold my-3">{pkg.price} ETH</p>
                  <button 
                    onClick={() => handleBuyClick(pkg)}
                    className="w-full bg-accent/20 text-accent font-bold py-2 px-4 rounded-lg hover:bg-accent hover:text-white transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="text-center py-8 border-t border-secondary">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Nothingsfy.de. All Rights Reserved.</p>
      </footer>

      {isModalOpen && selectedPackage && (
        <CryptoPaymentModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirmPayment={handleConfirmPayment}
          creditPackage={selectedPackage}
        />
      )}
    </div>
  );
};

export default HomePage;