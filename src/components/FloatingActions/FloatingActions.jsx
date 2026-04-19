import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Chatbot from '../Chatbot/Chatbot';
import WhatsApp from '../WhatsApp/WhatsApp';
import './FloatingActions.css';

export default function FloatingActions() {
  return (
    <div className="floating-actions">
      <a
        href="mailto:zainulzain043@gmail.com"
        className="floating-email-btn"
        aria-label="Send email"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </a>
      <WhatsApp />
      <Chatbot />
      <ScrollToTop />
    </div>
  );
}
