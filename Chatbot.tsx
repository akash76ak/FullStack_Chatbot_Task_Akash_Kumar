import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message { sender: 'bot' | 'user'; text: string; type?: 'options' | 'form' | 'text'; }

const FAQ_RESPONSES: Record<string, string> = {
  services: 'We offer Drone Aerial Filming, Mapping & Surveying, Agriculture Inspection, and Drone Pilot Training.',
  pricing: 'Our Drone Services start from ₹15,000 per project. Training courses start from ₹25,000.',
  contact: 'You can reach us at contact@dronetv.in or call +91 9876543210.'
};

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! Welcome to DroneTV Support. How can I assist you today?', type: 'options' }
  ]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Drone Filming', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (key: string) => {
    const labels: Record<string, string> = { services: 'What services do you offer?', pricing: 'What is the pricing?', contact: 'Contact details?', enquiry: 'Submit an Enquiry' };
    setMessages(prev => [...prev, { sender: 'user', text: labels[key] }]);
    setTimeout(() => setMessages(prev => [...prev, {
      sender: 'bot',
      text: key === 'enquiry' ? 'Please fill out the enquiry form below:' : FAQ_RESPONSES[key],
      type: key === 'enquiry' ? 'form' : 'options'
    }]), 300);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    const lower = text.toLowerCase();
    let reply = "I'm sorry, I couldn't understand that. You can select one of the options or fill out our enquiry form.";
    if (lower.includes('service') || lower.includes('work')) reply = FAQ_RESPONSES.services;
    else if (lower.includes('price') || lower.includes('cost')) reply = FAQ_RESPONSES.pricing;
    else if (lower.includes('contact') || lower.includes('phone')) reply = FAQ_RESPONSES.contact;
    setTimeout(() => setMessages(prev => [...prev, { sender: 'bot', text: reply, type: 'options' }]), 300);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
      setMessages(prev => [...prev, { sender: 'bot', text: `Thank you ${formData.name}! Your enquiry has been recorded. Our team will contact you soon.`, type: 'options' }]);
    } catch {
      alert('Failed to submit enquiry. Please check backend execution.');
    }
  };

  return (
    <div className="chat-card">
      <div className="chat-header"><Bot size={25} /><div><h3>DroneTV AI Assistant</h3><p>● Online (Rule-Based)</p></div></div>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-row ${msg.sender}`}>
            <div className={`bubble ${msg.sender}`}>
              <p>{msg.text}</p>
              {msg.type === 'options' && <div className="options">
                <button onClick={() => handleOptionClick('services')}>Our Services</button>
                <button onClick={() => handleOptionClick('pricing')}>Pricing Info</button>
                <button onClick={() => handleOptionClick('contact')}>Contact Us</button>
                <button className="enquiry" onClick={() => handleOptionClick('enquiry')}>Book / Enquire</button>
              </div>}
              {msg.type === 'form' && !submitted && <form onSubmit={handleFormSubmit} className="enquiry-form">
                <input required placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})}/>
                <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})}/>
                <input required placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone:e.target.value})}/>
                <select value={formData.service} onChange={e => setFormData({...formData, service:e.target.value})}>
                  <option>Drone Filming</option><option>Mapping & Survey</option><option>Drone Pilot Training</option>
                </select>
                <textarea required placeholder="Your Query/Requirement" rows={3} value={formData.message} onChange={e => setFormData({...formData, message:e.target.value})}/>
                <button type="submit">Submit Request</button>
              </form>}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-input">
        <input placeholder="Ask a question..." value={input} onChange={e => setInput(e.target.value)}/>
        <button><Send size={19}/></button>
      </form>
    </div>
  );
};