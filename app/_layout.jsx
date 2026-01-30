import { AppState, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { useEffect, useRef, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const RootLayout = () => {
    useEffect(() => {
    const handleAppStateChange = (state) => {
      if (state === 'active') {
        // Reapply your StatusBar settings
        StatusBar.setBarStyle('light'); // or 'dark-content'
        StatusBar.setBackgroundColor('#00d09e'); // your custom color
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription.remove();
  }, []);

    return (
        <SafeAreaProvider >
            <SafeAreaView style={{flex:1}}>
                <StatusBar style="light" backgroundColor="#00d09e" />
                <Stack screenOptions={{headerShown: false}}/>
            </SafeAreaView>
        </SafeAreaProvider>
       
    )
}

export default RootLayout

const styles = StyleSheet.create({})