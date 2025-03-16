import { Stack } from 'expo-router';
import React from 'react';
import { Slot } from 'expo-router';
import { SessionProvider } from '../utils/ctx';
import ToastProvider from './components/ToastProvider';
import PageLayout from './pages/_layout';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Slot />
        <ToastProvider />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="createAccount" options={{ headerShown: false }} />
        <PageLayout></PageLayout>
      </Stack>
    </SessionProvider>

  );
}