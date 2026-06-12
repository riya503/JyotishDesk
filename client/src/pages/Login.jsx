import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import authService from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login(creds.email, creds.password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0B0B] text-gray-900 dark:text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-8 shadow-premium flex flex-col gap-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sign in to Astrologer CRM</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter your credentials to manage clients and consultations.</p>
        </div>

        {error && (
          <div className="p-3.5 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg text-xs text-[#EF4444] font-medium text-center">
            {error}
          </div>
        )}

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input 
            label="Email Address" 
            name="email" 
            type="email"
            value={creds.email} 
            onChange={(e) => setCreds(prev => ({ ...prev, email: e.target.value }))}
            required
            placeholder="pandit@humarapandit.com"
          />
          
          <Input 
            label="Password" 
            name="password" 
            type="password"
            value={creds.password} 
            onChange={(e) => setCreds(prev => ({ ...prev, password: e.target.value }))}
            required
            placeholder="••••••••"
          />

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Navigation actions */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-[#2A2A2A] pt-4 mt-1">
          Don't have an account?{" "}
          <button onClick={() => navigate('/signup')} className="text-[#8B5CF6] hover:underline font-semibold">
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}
