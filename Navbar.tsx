import React from 'react';
import { Bot, LayoutDashboard } from 'lucide-react';

interface Props {
  activeTab: 'chat' | 'admin';
  setActiveTab: (tab: 'chat' | 'admin') => void;
}

export const Navbar: React.FC<Props> = ({ activeTab, setActiveTab }) => (
  <nav className="navbar">
    <div className="nav-inner">
      <div className="brand"><Bot size={28} /><span>DroneTV Assistant</span></div>
      <div className="nav-actions">
        <button className={activeTab === 'chat' ? 'active' : ''} onClick={() => setActiveTab('chat')}>Chat Support</button>
        <button className={activeTab === 'admin' ? 'active' : ''} onClick={() => setActiveTab('admin')}>
          <LayoutDashboard size={16} /> Admin Dashboard
        </button>
      </div>
    </div>
  </nav>
);