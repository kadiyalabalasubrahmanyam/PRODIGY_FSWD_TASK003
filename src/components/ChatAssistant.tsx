import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: "Warm greetings! I am Sage, your virtual botanist. I can assist you with identifying suitable houseplants, troubleshooting dry leaves, detailing soil dynamics, or clarifying how local courier freight works. What botanical curiosity is on your mind today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // User Message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // API call to our local backend Express server
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(1),
        }),
      });

      if (!response.ok) {
        throw new Error('Signal interference');
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat Assistant error:', err);
      // Graceful fallback
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "Pardon me! It seems my greenhouse connection caught a slight draft. I'm still happy to advise you that most our products like the Calathea Orbifolia ($34) are pet-safe and love ambient light. Try posing your query again shortly!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const quickPrompts = [
    { text: '🐱 What is pet safe?', label: 'Pet-safe options' },
    { text: '🌿 Best dry soil care?', label: 'Watering rules' },
    { text: '🚚 Courier delivery speed?', label: 'Courier schedule' }
  ];

  return (
    <div id="chat-assistant-container" className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {!isOpen ? (
          /* Launcher Button */
          <motion.button
            key="launcher"
            id="btn-chat-launcher"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] hover:opacity-90 px-4 py-3 rounded-none shadow-xl transition duration-200 border border-[#1C1C1C] font-sans text-[10px] uppercase font-bold tracking-widest cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Consult sage</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.button>
        ) : (
          /* Active Chat Dialog Box */
          <motion.div
            key="chat-dialog"
            id="chat-dialog-box"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="bg-[#FDFCFB] border border-[#1C1C1C]/15 shadow-2xl rounded-none w-[90vw] sm:w-[400px] h-[520px] flex flex-col overflow-hidden text-[#1C1C1C]"
          >
            {/* Header section with brand signature */}
            <div className="bg-[#1C1C1C] text-[#FDFCFB] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-none bg-[#F9F7F2]/10 flex items-center justify-center border border-[#F9F7F2]/20">
                  <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#FDFCFB]">Sage • Virtual Botanist</h4>
                  <p className="text-[8px] uppercase tracking-widest text-[#FDFCFB]/50 font-bold font-sans">Greenhouse Advisory AI</p>
                </div>
              </div>
              <button
                id="btn-chat-close"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#FDFCFB]/60 hover:text-[#FDFCFB] rounded-none transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Messages body */}
            <div id="chat-messages-body" className="flex-grow overflow-y-auto p-4 space-y-3.5 bg-[#F9F7F2]/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] rounded-none px-3.5 py-2 text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#1C1C1C] text-[#FDFCFB]'
                        : 'bg-[#FDFCFB] text-[#1C1C1C] border border-[#1C1C1C]/10'
                    }`}
                  >
                    <p className="font-sans">{msg.text}</p>
                    <span className="block text-[8px] text-right opacity-50 mt-1 font-mono">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#FDFCFB] border border-[#1C1C1C]/10 text-[#1C1C1C]/50 rounded-none px-3.5 py-2 text-xs flex items-center gap-1 shadow-xs">
                    <span className="w-1 h-1 bg-[#1C1C1C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 bg-[#1C1C1C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 bg-[#1C1C1C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[9px] uppercase tracking-wider font-bold ml-1 text-[#1C1C1C]/40">Sage is consulting...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick action suggestions */}
            <div id="chat-quick-suggestions" className="p-2 border-t border-[#1C1C1C]/10 flex gap-2 overflow-x-auto bg-[#F9F7F2]">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.text)}
                  className="px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-wider bg-[#FDFCFB] border border-[#1C1C1C]/15 text-[#1C1C1C]/70 rounded-none cursor-pointer hover:bg-[#1C1C1C] hover:text-[#FDFCFB] transition-all whitespace-nowrap"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Form Footer */}
            <form id="chat-input-form" onSubmit={handleFormSubmit} className="p-3 border-t border-[#1C1C1C]/10 flex gap-2 bg-[#FDFCFB]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Sage about plant care or orders..."
                className="flex-grow text-xs px-3 py-2 border border-[#1C1C1C]/15 rounded-none focus:outline-none focus:border-[#1C1C1C] bg-[#FDFCFB] text-[#1C1C1C]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-[#1C1C1C] text-[#FDFCFB] rounded-none hover:opacity-90 transition disabled:opacity-30 flex-shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
