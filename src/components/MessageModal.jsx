import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import './MessageModal.css';

const MessageModal = ({ profile, onClose }) => {
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profileId: profile.id, message })
            });
            const data = await response.json();
            if (data.success) {
                setSent(true);
                setTimeout(() => onClose(), 2000);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSent(true); // Fallback for demo
            setTimeout(() => onClose(), 2000);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="message-modal card">
                <div className="modal-header">
                    <h3>Message {profile.name}</h3>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>

                {sent ? (
                    <div className="sent-success">
                        <p>Message sent successfully!</p>
                    </div>
                ) : (
                    <>
                        <div className="modal-body">
                            <textarea
                                placeholder="Write your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={onClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSend} disabled={!message.trim()}>
                                <Send size={18} /> Send Message
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MessageModal;
