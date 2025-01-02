import { Stack } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Slot } from 'expo-router';
import { SessionProvider } from './utils/ctx';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Slot />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="createAccount" options={{ headerShown: false }} />
        <Toast />
      </Stack>
    </SessionProvider>

  );
}
