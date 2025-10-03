import React, { useState, useEffect } from 'react';

interface SidePanelProps {
  code: string;
  appType: 'mobile' | 'web' | null;
}

const SidePanel: React.FC<SidePanelProps> = ({ code, appType }) => {
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (appType === 'mobile') {
      setFileName('App.js');
    } else if (appType === 'web') {
      setFileName('index.html');
    } else {
      setFileName('');
    }
  }, [appType]);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-secondary text-gray-300">
      <header className="flex-shrink-0 pt-8 mb-4 border-b border-primary pb-2 px-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Code View</h2>
        <button
          onClick={handleCopy}
          disabled={!code}
          className="bg-primary hover:bg-accent disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-1 px-3 rounded-lg text-sm transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </header>
      <div className="flex-grow overflow-hidden p-4">
        <div className="bg-primary rounded-lg h-full flex flex-col">
          <div className="flex-shrink-0 bg-gray-800 px-4 py-2 rounded-t-lg">
            <span className="text-sm font-mono text-gray-400">{fileName || 'No file selected'}</span>
          </div>
          <div className="relative flex-grow">
            <pre className="text-sm p-4 overflow-auto absolute inset-0 w-full h-full">
              <code className="font-mono whitespace-pre-wrap break-words">{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
