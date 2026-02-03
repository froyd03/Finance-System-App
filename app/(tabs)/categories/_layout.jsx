import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function CategoryLayout(){
    return(
        <SafeAreaProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="index" />
                <Stack.Screen name="[category]" options={{title: "Category"}}/>
                <Stack.Screen name="[addExpense]" options={{title: "Add Expenses"}}/>
            </Stack>
        </SafeAreaProvider>
    )
}