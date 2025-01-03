import { Redirect, Stack } from 'expo-router';
import { useSession } from '../utils/ctx';
import Toast from 'react-native-toast-message';

export default function PageLayout() {

  const { session, isLoading } = useSession();

  if (!session) {
    return <Redirect href="/" />;
  }
 
  return (
        <Stack>
            <Toast />
            <Stack.Screen name="createCollection" options={{ headerShown: false }}/>
        </Stack>
    );
}
    