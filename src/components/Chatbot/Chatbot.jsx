import { useState, useEffect, useRef, useCallback } from 'react';
import { getAnswer, WELCOME } from '../../data/chatbotKnowledge';
import './Chatbot.css';

const SUGGESTIONS = [
  'Who is Zainul?',
  'What are his skills?',
  'Tell me about his experience',
  'What projects has he built?',
  'How can I contact him?',
  'What services does he offer?',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !hasInteracted) {
      setMessages([{ id: 1, role: 'bot', text: WELCOME, time: new Date() }]);
      setHasInteracted(true);
    }
  }, [isOpen, hasInteracted]);

  const handleSend = useCallback((text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), role: 'user', text: trimmed, time: new Date() };
    const botMsgId = Date.now() + 1;
    const botMsg = { id: botMsgId, role: 'bot', text: '', time: new Date() };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setIsTyping(true);
    setInput('');

    // Simulate realistic typing delay
    const delay = 600 + Math.random() * 600;

    setTimeout(() => {
      const answer = getAnswer(trimmed);
      setMessages((prev) =>
        prev.map((m) => m.id === botMsgId ? { ...m, text: answer } : m)
      );
      setIsTyping(false);
    }, delay);
  }, [input]);

  const handleSuggestion = useCallback((suggestion) => {
    setInput(suggestion);
    handleSend(suggestion);
  }, [handleSend]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Rotate through suggestions for variety
  const nextSuggestions = () => {
    setSuggestionIndex((prev) => (prev + 1) % 2);
  };

  return (
    <div className="chatbot">
      {/* Chat Panel */}
      <div className={`chatbot-panel ${isOpen ? 'is-open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="chatbot-header-info">
            <span className="chatbot-header-name">AI Chatbot</span>
            <span className="chatbot-header-status">
              <span className="chatbot-status-dot" />
              Always Available
            </span>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="chatbot-body">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg chatbot-msg-${msg.role}`}>
              {msg.role === 'bot' && (
                <div className="chatbot-msg-avatar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
              <div className="chatbot-msg-content">
                <div className="chatbot-msg-bubble">
                  {msg.text.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </div>
                {msg.time && <span className="chatbot-msg-time">{formatTime(msg.time)}</span>}
              </div>
            </div>
          ))}

          {isTyping && !messages[messages.length - 1]?.text && (
            <div className="chatbot-msg chatbot-msg-bot">
              <div className="chatbot-msg-avatar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="chatbot-msg-content">
                <div className="chatbot-msg-bubble">
                  <span className="chatbot-typing"><span /><span /><span /></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {!isTyping && messages.length <= 1 && isOpen && (
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chatbot-suggestion-btn" onClick={() => handleSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="chatbot-footer">
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Ask about Zainul..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={300}
          />
          <button
            className="chatbot-send"
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            aria-label="Send"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        className={`chatbot-fab ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
