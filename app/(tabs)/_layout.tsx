import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { MUTED, PRIMARY } from '../../constants/inventor-theme';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: MUTED,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      {/* 1. Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />

      {/* 2. Add */}
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={22} color={color} />
          ),
        }}
      />

      {/* 3. Products - แก้ไขชื่อ name ให้ถูกต้องตรงกับไฟล์ products.tsx */}
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cube' : 'cube-outline'} size={22} color={color} />
          ),
        }}
      />

      {/* 4. Categories */}
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'folder' : 'folder-outline'} size={22} color={color} />
          ),
        }}
      />

      {/* 5. Analytics */}
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'analytics' : 'analytics-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}