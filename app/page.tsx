// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getAccessCookie, setAccessCookie } from '@/lib/auth';
import PasswordForm from '@/components/PasswordForm';
import WeddingInvitation from '@/components/WeddingInvitation';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasAccess = getAccessCookie();
    setIsAuthenticated(hasAccess);
    setIsLoading(false);
  }, []);

  const handleValidPassword = () => {
    setAccessCookie();
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <WeddingInvitation />
  ) : (
    <PasswordForm onValidPassword={handleValidPassword} />
  );
}
