import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'

export default function layout (){
    function LogoTitle(props) {
        return (
            <Text>Helooo</Text>

        );
    }

    return (
        <Stack
            screenOptions={
                {headerShown: false}
            }
        >
            
            <Stack.Screen 
                name='[id]'
                options={{
                    headerShown: true,
                    title: "Customize Template",
                    headerTitle: props => <LogoTitle {...props} />,
                    headerRight: () => <Button title="Update count" />,
                }}
            />

        </Stack>
    )
}



const styles = StyleSheet.create({})