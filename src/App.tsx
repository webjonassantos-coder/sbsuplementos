import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductManager } from './pages/Admin/ProductManager';
import { SettingsManager } from './pages/Admin/SettingsManager';
import { AdminLayout } from './components/AdminLayout';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-clinical-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-navy border-t-transparent rounded-full animate-spin" />
          <p className="text-brand-navy font-serif italic text-lg transition-all animate-pulse">SB Suplementos...</p>
        </div>
      </div>
    );
  }

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) return <Navigate to="/login" replace />;
    return <AdminLayout>{children}</AdminLayout>;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute>
            <ProductManager />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <SettingsManager />
          </ProtectedRoute>
        } />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
