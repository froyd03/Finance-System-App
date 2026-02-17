import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function layout (){

    return (
        <SafeAreaProvider>
        <Stack
            screenOptions={
                {headerShown: false}
            }
        >
            
            <Stack.Screen 
                name='[id]'
                options={{
                    title: "Customize Template",
                }}
            />

        </Stack>
        </SafeAreaProvider>
    )
}



const styles = StyleSheet.create({})