import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#207178',
      tabBarStyle: {
        backgroundColor: '#F2DDCE',
        },
      headerShadowVisible: false,
      headerStyle: {
          backgroundColor: '#F2DDCE',
      }
    }}
    >
      <Tabs.Screen 
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen 
        name="wishlist"
        options={{
          title: 'wishlist',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart-sharp' : 'heart-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen 
        name="scan"
        options={{
          title: 'scan',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-sharp' : 'add-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen 
        name="collections"
        options={{
          title: 'collections',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'albums-sharp' : 'albums-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen 
        name="account"
        options={{
          title: 'account',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
