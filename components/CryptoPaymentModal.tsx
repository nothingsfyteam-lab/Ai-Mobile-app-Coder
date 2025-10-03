import React from 'react';
import { CloseIcon, EthereumIcon } from './icons';

interface CreditPackage {
  credits: number;
  price: number;
}

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: () => void;
  creditPackage: CreditPackage;
}

const DUMMY_WALLET_ADDRESS = "0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T";

const CryptoPaymentModal: React.FC<CryptoPaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirmPayment,
  creditPackage,
}) => {
  if (!isOpen) return null;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${DUMMY_WALLET_ADDRESS}&qzone=1&color=0a0a0a&bgcolor=ffffff`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-secondary rounded-lg shadow-2xl w-full max-w-md m-4 border border-primary relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
        </button>

        <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Complete Your Purchase</h2>
            <p className="text-gray-400 mb-6">
                Send <span className="font-bold text-white">{creditPackage.price} ETH</span> to the address below to receive <span className="font-bold text-white">{creditPackage.credits} credits</span>.
            </p>

            <div className="p-4 bg-white rounded-lg inline-block">
              <img src={qrCodeUrl} alt="Crypto Wallet QR Code" className="w-48 h-48" />
            </div>

            <div className="mt-6 text-left">
                <label className="text-sm font-semibold text-gray-400">Payment Address (ETH)</label>
                <div className="mt-1 flex items-center bg-primary rounded-md p-3">
                    <EthereumIcon className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    <input 
                        type="text"
                        readOnly
                        value={DUMMY_WALLET_ADDRESS}
                        className="bg-transparent text-sm text-gray-200 w-full focus:outline-none font-mono"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">This is a simulated transaction. No real funds will be transferred.</p>
            </div>

            <div className="mt-8">
                <button
                    onClick={onConfirmPayment}
                    className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    I've Completed Payment
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPaymentModal;
