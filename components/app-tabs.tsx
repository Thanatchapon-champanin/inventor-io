import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BORDER, CARD, MUTED, PRIMARY } from '../constants/inventor-theme';
import { ThemedText } from './themed-text';

type IoniconName = keyof typeof Ionicons.glyphMap;

function TabIcon({ name, focused }: { name: IoniconName; focused: boolean }) {
  return <Ionicons name={name} size={22} color={focused ? PRIMARY : MUTED} />;
}

function AddTabButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.addWrap, pressed && styles.addWrapPressed]}
      hitSlop={8}>
      <Ionicons name="add" size={26} color="#1A1A2E" />
      <ThemedText type="small" style={styles.addLabel}>
        Add
      </ThemedText>
    </Pressable>
  );
}

export default function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: MUTED,
        tabBarStyle: [styles.tabBar, { height: 58 + insets.bottom, paddingBottom: insets.bottom || 8 }],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: '/(tabs)',
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} />,
        }}
      />

      {/* "Add" opens a modal/action instead of navigating to a screen */}
      <Tabs.Screen
        name="add"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => null,
          tabBarButton: () => (
            <View style={styles.addSlot}>
              <AddTabButton onPress={() => {
                // TODO: open your "add product" modal/screen here
              }} />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => e.preventDefault(),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          href: '/(tabs)/products',
          title: 'Products',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'pricetags' : 'pricetags-outline'} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          href: '/(tabs)/categories',
          title: 'Categories',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'folder' : 'folder-outline'} focused={focused} />
          ),
        }}
      />

      {/* Hide product details + auxiliary screens from the tab bar */}
      <Tabs.Screen name="product/[id]" options={{ href: null }} />
      <Tabs.Screen name="stores" options={{ href: null }} />
      <Tabs.Screen name="finances" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: CARD,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabBarItem: {
    paddingTop: 6,
  },
  addSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addWrapPressed: {
    opacity: 0.6,
  },
  addLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: MUTED,
  },
});