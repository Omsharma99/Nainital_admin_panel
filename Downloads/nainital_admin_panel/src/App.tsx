import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="app-shell"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="app-main"><Header onMenu={() => setSidebarOpen(true)} /><Dashboard /></div></div>;
}

export default App;
