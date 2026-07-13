import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Slot จะทำหน้าที่เรนเดอร์หน้าจอตามโฟลเดอร์ของ Expo Router เช่น หน้า index.tsx หรือ products.tsx */}
      <Slot />
    </ThemeProvider>
  );
}