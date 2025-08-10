'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './component/Sidebar';
import Topbar from './component/Topbar';
import VideoManager from './component/VideoManager';
import HeroBlockList from './component/HeroBlockList';

const AdminDashboard = () => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (!storedToken) {
      router.push('/admin/login');
    } else {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar onLogout={handleLogout} />
        <main className="p-6 space-y-10 overflow-y-auto">
          <VideoManager />
          <HeroBlockList />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
