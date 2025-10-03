import React from 'react';
import { SpinnerIcon } from './icons';

interface EmulatorPanelProps {
  code: string;
  isLoading: boolean;
}

const EmulatorPanel: React.FC<EmulatorPanelProps> = ({ code, isLoading }) => {
  const files = {
    'App.js': {
      type: 'CODE',
      contents: code,
    },
  };
  const encodedFiles = encodeURIComponent(JSON.stringify(files));
  const snackUrl = `https://snack.expo.dev/embedded?preview=true&platform=ios&theme=dark&files=${encodedFiles}`;

  return (
    <div className="w-full h-full flex items-center justify-center bg-secondary p-4">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-10">
              <SpinnerIcon className="w-10 h-10 text-white" />
              <p className="text-white mt-3 text-sm">Building your app...</p>
            </div>
          )}
          <iframe
            key={code}
            src={snackUrl}
            className="w-full h-full border-0"
            title="Expo Snack Emulator"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default EmulatorPanel;