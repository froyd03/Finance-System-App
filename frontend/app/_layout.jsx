import { AppState, StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout () {
  useEffect(() => {
    const handleAppStateChange = (state) => {
      if (state === 'active') {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#00d09e');
        StatusBar.setTranslucent(true);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider >
      <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#00d09e" />

        <Stack screenOptions={{headerShown: false}}/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}