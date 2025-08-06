import React from 'react';
import { PublicHeader } from './PublicHeader';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}