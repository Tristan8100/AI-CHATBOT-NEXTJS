'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { ChatInterfaceDash } from '@/components/chat-interface-dashboard';
export default function DashboardPage() {
    const { user } = useAuth();

  return (
    <>
      <ChatInterfaceDash />
    </>
  );
}