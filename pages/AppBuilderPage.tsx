import React, { useState } from 'react';
import ChatPanel from '../components/ChatPanel';
import EmulatorPanel from '../components/EmulatorPanel';
import WebEmulatorPanel from '../components/WebEmulatorPanel';
import SidePanel from '../components/SidePanel';
import { ChatMessage } from '../types';
import { INITIAL_APP_CODE, INITIAL_WEB_CODE } from '../constants';
import { generateAppCode } from '../services/geminiService';
import { MobileIcon, WebIcon } from '../components/icons';

interface AppBuilderPageProps {
  onNavigateToHome: () => void;
  initialCredits: number;
  onAddCredits: (amount: number) => void;
  onUseCredit: () => boolean;
}

const AppBuilderPage: React.FC<AppBuilderPageProps> = ({ onNavigateToHome, initialCredits, onAddCredits, onUseCredit }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Welcome! What would you like to build today?", type: 'choice' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [appCode, setAppCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [credits, setCredits] = useState(initialCredits);
  const [appType, setAppType] = useState<'mobile' | 'web' | null>(null);

  const handleSetAppType = (type: 'mobile' | 'web') => {
    setAppType(type);
    setAppCode(type === 'mobile' ? INITIAL_APP_CODE : INITIAL_WEB_CODE);
    setMessages(prev => {
      // Remove the choice message
      const filtered = prev.filter(msg => msg.type !== 'choice');
      const confirmation: ChatMessage = {
        role: 'model',
        content: `Great! I'll help you build a ${type} app. What should we create?`
      };
      return [...filtered, confirmation];
    });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading || credits <= 0 || !appType) return;

    const creditUsed = onUseCredit();
    if (!creditUsed) return; // Should not happen due to guard above but good practice
    
    setCredits(prev => prev - 1);

    const newUserMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const result = await generateAppCode(userInput, appType);
      setAppCode(result.code);
      const newModelMessage: ChatMessage = { role: 'model', content: result.message };
      setMessages(prev => [...prev, newModelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I ran into an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddCredits = (amount: number) => {
    onAddCredits(amount);
    setCredits(prev => prev + amount);
  }

  return (
    <div className="flex h-screen bg-secondary text-white font-sans">
       <button onClick={onNavigateToHome} className="absolute top-4 left-4 text-accent hover:underline text-sm z-20">
        &larr; Back to Home
      </button>
      <div className="w-1/4 min-w-[350px] max-w-[450px] border-r border-primary z-10">
        <ChatPanel
          messages={messages}
          userInput={userInput}
          onUserInput={setUserInput}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          credits={credits}
          onAddCredits={handleAddCredits}
          appType={appType}
          onSetAppType={handleSetAppType}
        />
      </div>
      <div className="flex-grow">
        {!appType ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center"><MobileIcon className="w-12 h-12 text-accent" /></div>
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center"><WebIcon className="w-12 h-12 text-accent" /></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Select an App Type</h2>
              <p>Choose "Mobile App" or "Web App" in the chat to begin building.</p>
          </div>
        ) : appType === 'mobile' ? (
          <EmulatorPanel code={appCode} isLoading={isLoading} />
        ) : (
          <WebEmulatorPanel code={appCode} isLoading={isLoading} />
        )}
      </div>
      <div className="w-1/4 min-w-[350px] max-w-[450px] border-l border-primary z-10">
        <SidePanel code={appCode} appType={appType} />
      </div>
    </div>
  );
};

export default AppBuilderPage;