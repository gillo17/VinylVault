import { Tabs, Redirect } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSession } from '../../utils/ctx';
import Toast from 'react-native-toast-message';

export default function TabLayout() {

  const { session, isLoading } = useSession();

  if (!session) {
    return <Redirect href="/" />;
  }
 
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#207178',
          tabBarStyle: {
            backgroundColor: '#F2DDCE',
          },
          headerStyle: {
            backgroundColor: '#F2DDCE',
          },
        }}
      >
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            headerShown: false,
            title: 'wishlist',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'heart-sharp' : 'heart-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            headerShown: false,
            title: 'scan',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'add-sharp' : 'add-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="collections"
          options={{
            headerShown: false,
            title: 'collections',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'albums-sharp' : 'albums-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            headerShown: false,
            title: 'account',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}