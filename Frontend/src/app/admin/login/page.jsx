'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ App Router
import { loginAdmin } from '../../../../api/auth';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const router = useRouter(); // ✅ Add router
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginAdmin({ username, password });
      setToken(data.token);

      // ✅ Optionally store token (in localStorage)
      localStorage.setItem('admin_token', data.token);

      // ✅ Redirect after short delay
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 items-center justify-center">
        <h1 className="text-white text-4xl font-extrabold">Admin Portal</h1>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Login to your admin account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="admin@yopmail.com"
                className="w-full text-black px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full text-black px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Login
            </motion.button>
          </form>

          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          {token && <p className="text-green-500 text-sm mt-4 text-center">Login Success! Redirecting...</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
