import { Tabs } from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import { Analysis, Profile, Home, Transaction } from "@/assets/icons/SvgIcons";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

function TabIcon({ focused, icon }){

    return (
        <View style={[
            styles.iconStyle, 
            {backgroundColor: focused ? "#00d09e" : "#00000000"}]}
        >
            {icon}
        </View>
    )
}

export default function TabLayout() {

    return (
        <SafeAreaProvider>
            <Tabs 
                screenOptions={{
                    tabBarStyle: styles.tabContainer,
                    tabBarItemStyle: styles.tabItems,
                    tabBarIconStyle: styles.tabIcons,
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            > 
                <Tabs.Screen 
                    name="home" 
                    options={{ 
                        title: "Home", 
                        tabBarIcon: ({focused}) => 
                            <TabIcon focused={focused} 
                            icon={<Home size={24} color="#000000a2" />} 
                        /> 
                    }}
                />
                <Tabs.Screen 
                    name="analysis/index" 
                    options={{ 
                        title: "Analysis", 
                        tabBarIcon: ({focused}) => 
                            <TabIcon focused={focused} 
                            icon={<Analysis size={24} color="#000000a2" />} 
                        />
                    }} 
                />
                <Tabs.Screen 
                    name="transaction/index" 
                    options={{ 
                        title: "Transactions", 
                        tabBarIcon: ({focused}) => 
                            <TabIcon focused={focused} 
                            icon={<Transaction size={24} color="#000000a2" />} 
                        />
                    }}
                />
                <Tabs.Screen 
                    name="categories" 
                    options={{ 
                        title: "Categories",
                        tabBarIcon: ({focused}) => 
                            <TabIcon focused={focused} 
                            icon={<Octicons name="stack" size={24} color="#000000a2" />} 
                        />
                    }}
                />
            
                <Tabs.Screen 
                    name="profile/index" 
                    options={{ 
                        title: "Profile",
                        tabBarIcon: ({focused}) => 
                            <TabIcon 
                                focused={focused} 
                                icon={<Profile size={24} color="#000000a2" />} 
                            />
                    }}
                />
                
            </Tabs>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: "#dff7e2",
        paddingVertical: 65,
        height: 80,
        width: "100%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },

    tabItems: {
    },

    tabIcons: {
        height: "100%",
        justifyContent: "center",
        alignItems: 'center',
        
    },

    iconStyle: {
        padding: 8,
        backgroundColor: "#00d09e",
        width: 45,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 15
    }
})