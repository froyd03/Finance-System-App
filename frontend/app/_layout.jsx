import { AppState } from 'react-native'
import { Stack } from 'expo-router'
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout () {
 

  return (
    <SafeAreaProvider >
      <SafeAreaView style={{flex:1, backgroundColor: '#00d09e'}}>
        <StatusBar style='dark'/>

        <Stack screenOptions={{headerShown: false}}/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}