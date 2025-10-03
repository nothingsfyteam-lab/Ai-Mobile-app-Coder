import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { SendIcon, RobotIcon, UserIcon, LoadingSpinner, CoinIcon, MobileIcon, WebIcon } from './icons';

interface ChatPanelProps {
  messages: ChatMessage[];
  userInput: string;
  onUserInput: (input: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  credits: number;
  onAddCredits: (amount: number) => void;
  appType: 'mobile' | 'web' | null;
  onSetAppType: (type: 'mobile' | 'web') => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  messages, userInput, onUserInput, onSendMessage, isLoading, credits, onAddCredits, appType, onSetAppType 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const AppTypeSelector = () => (
    <div className="flex gap-3 mt-2">
      <button 
        onClick={() => onSetAppType('mobile')} 
        className="flex-1 flex items-center justify-center gap-2 p-3 bg-primary hover:bg-accent text-white font-semibold rounded-lg transition-colors"
      >
        <MobileIcon className="w-5 h-5" />
        Mobile App
      </button>
      <button 
        onClick={() => onSetAppType('web')}
        className="flex-1 flex items-center justify-center gap-2 p-3 bg-primary hover:bg-accent text-white font-semibold rounded-lg transition-colors"
      >
        <WebIcon className="w-5 h-5" />
        Web App
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full p-4 bg-secondary">
      <header className="flex-shrink-0 pt-8 mb-4 border-b border-primary pb-2 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">App Builder AI</h1>
        <div className="flex items-center gap-2 bg-primary px-3 py-1 rounded-full">
          <CoinIcon className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-white">{credits}</span>
        </div>
      </header>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        {messages.map((msg, index) => (
          <div key={index}>
            <div className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 flex-shrink-0 bg-accent rounded-full flex items-center justify-center">
                  <RobotIcon className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-sm rounded-lg p-3 text-sm ${
                  msg.role === 'user' ? 'bg-accent text-white rounded-br-none' : 'bg-primary text-gray-200 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            {msg.type === 'choice' && <AppTypeSelector />}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 my-4">
            <div className="w-8 h-8 flex-shrink-0 bg-accent rounded-full flex items-center justify-center">
              <RobotIcon className="w-5 h-5 text-white" />
            </div>
            <div className="bg-primary rounded-lg p-3 rounded-bl-none">
              <LoadingSpinner />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex-shrink-0">
        {credits > 0 ? (
          <div className="flex items-center bg-primary rounded-lg">
            <input
              type="text"
              value={userInput}
              onChange={(e) => onUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={!appType ? "First, choose an app type above" : "e.g., a timer app with start/stop"}
              className="w-full bg-transparent p-3 text-gray-200 placeholder-gray-500 focus:outline-none"
              disabled={isLoading || !appType}
            />
            <button
              onClick={onSendMessage}
              disabled={isLoading || !userInput.trim() || !appType}
              className="p-3 text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center p-4 bg-primary rounded-lg">
            <p className="text-sm text-gray-300 mb-3">You're out of credits!</p>
            <button
              onClick={() => onAddCredits(5)}
              className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Refill Credits
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;