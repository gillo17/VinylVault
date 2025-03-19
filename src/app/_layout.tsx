import { Stack } from 'expo-router';
import { SessionProvider } from '../utils/ctx';
import ToastProvider from './components/ToastProvider';

export default function RootLayout() {
  return (
    <SessionProvider>
      <ToastProvider />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pages" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="createAccount" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}