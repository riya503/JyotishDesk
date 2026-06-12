import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import authService from './services/authService';

import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ClientsList from './pages/ClientsList';
import ClientProfile from './pages/ClientProfile';
import Consultations from './pages/Consultations';
import Followups from './pages/Followups';
import AIInsights from './pages/AIInsights';
import Settings from './pages/Settings';

// Authentication Guard Component
function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Redirects logged-in users away from auth pages
function PublicRoute({ children }) {
  if (authService.isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: 'var(--tw-toast-bg, #1A1A1A)',
            color: 'var(--tw-toast-color, #fff)',
            border: '1px solid var(--tw-toast-border, #2A2A2A)',
          },
        }}/>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />

          {/* Landing Page Route */}
          <Route path="/" element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          } />

          {/* Protected Application Shell Layout */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<ClientsList />} />
            <Route path="clients/:id" element={<ClientProfile />} />
            <Route path="consultations" element={<Consultations />} />
            <Route path="followups" element={<Followups />} />
            <Route path="insights" element={<AIInsights />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Redirect Fallbacks */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
