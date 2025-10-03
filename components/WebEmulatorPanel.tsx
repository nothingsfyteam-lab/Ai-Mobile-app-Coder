import React from 'react';
import { SpinnerIcon } from './icons';

interface WebEmulatorPanelProps {
  code: string;
  isLoading: boolean;
}

const WebEmulatorPanel: React.FC<WebEmulatorPanelProps> = ({ code, isLoading }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-secondary p-4">
      <div className="relative w-full max-w-4xl h-[80%] bg-primary rounded-lg shadow-2xl border border-gray-700 flex flex-col">
        {/* Browser Header */}
        <div className="flex-shrink-0 h-10 bg-gray-800 rounded-t-lg flex items-center px-4 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-grow text-center text-sm text-gray-400">
            Preview
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow rounded-b-lg overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary bg-opacity-80 z-10">
              <SpinnerIcon className="w-10 h-10 text-white" />
              <p className="text-white mt-3 text-sm">Building your app...</p>
            </div>
          )}
          <iframe
            key={code}
            srcDoc={code}
            className="w-full h-full border-0 bg-white"
            title="Web Emulator"
            sandbox="allow-scripts allow-modals allow-forms"
          />
        </div>
      </div>
    </div>
  );
};

export default WebEmulatorPanel;