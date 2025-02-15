import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../utils/ctx';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export default function PageLayout() {

  const { session, isLoading } = useSession();

  if (!session) {
    return <Redirect href="/" />;
  }
 
  return (
    <NavigationContainer>
      <Stack initialRouteName="pages">
        <Toast />
        <Stack.Screen name="createCollection" options={{ headerShown: false }}/>
        <Stack.Screen name="vinylResultsScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="saveToCollection" options={{ headerShown: false }}/>
        <Stack.Screen name="vinylNotFound" options={{ headerShown: false }}/>
        <Stack.Screen name="collectionInfoPage" options={{ headerShown: false }}/>
        <Stack.Screen name="vinylInfo" options={{ headerShown: false }}/>
        <Stack.Screen name="submitImageForTraining" options={{ headerShown: false }}/>
        <Stack.Screen name="recommendedVinyls" options={{ headerShown: false }}/>
      </Stack>
    </NavigationContainer>
    );
}
    