import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Chatbot } from './components/Chatbot';
import { EnquiryDashboard } from './components/EnquiryDashboard';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat'|'admin'>('chat');
  return <div className="app"><Navbar activeTab={activeTab} setActiveTab={setActiveTab}/><main>{activeTab==='chat'?<Chatbot/>:<EnquiryDashboard/>}</main></div>;
};
export default App;