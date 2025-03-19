import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../utils/ctx';
import Toast from 'react-native-toast-message';

export default function PageLayout() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <Stack initialRouteName="createCollection">
        <Stack.Screen name="createCollection" options={{ headerShown: false }} />
        <Stack.Screen name="vinylResultsScreen" options={{ headerShown: false }} />
        <Stack.Screen name="saveToCollection" options={{ headerShown: false }} />
        <Stack.Screen name="vinylNotFound" options={{ headerShown: false }} />
        <Stack.Screen name="collectionInfoPage" options={{ headerShown: false }} />
        <Stack.Screen name="vinylInfo" options={{ headerShown: false }} />
        <Stack.Screen name="submitImageForTraining" options={{ headerShown: false }} />
        <Stack.Screen name="RecommendedVinyls" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}