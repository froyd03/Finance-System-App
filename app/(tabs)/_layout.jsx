import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TransactionIcon from '../../assets/icons/TransactionIcon';
import AnalysisIcon from "@/assets/icons/AnalysisIcon";
import Home from "@/assets/icons/Home";
import { StyleSheet, View } from "react-native";

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
        <Tabs 
            screenOptions={{
                tabBarStyle: styles.tabContainer,
                tabBarItemStyle: styles.tabItems,
                tabBarIconStyle: styles.tabIcons,
                tabBarShowLabel: false,

            }}
        > 
            <Tabs.Screen 
                name="home" 
                options={{ 
                    title: "Home", 
                    tabBarIcon: ({focused}) => 
                        <TabIcon focused={focused} 
                        icon={<Home color="#000000a2" />} 
                    /> 
                }}
            />
            <Tabs.Screen 
                name="analysis" 
                options={{ 
                    title: "Analysis", 
                    tabBarIcon: ({focused}) => 
                        <TabIcon focused={focused} 
                        icon={<AnalysisIcon color="#000000a2" />} 
                    />
                }} 
            />
            <Tabs.Screen 
                name="transactions" 
                options={{ 
                    title: "Transactions", 
                    tabBarIcon: ({focused}) => 
                        <TabIcon focused={focused} 
                        icon={<TransactionIcon color="#000000a2" />} 
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
                name="profile" 
                options={{ 
                    title: "Profile",
                    tabBarIcon: ({focused}) => 
                        <TabIcon 
                            focused={focused} 
                            icon={<FontAwesome5 name="user" size={24} color="#000000a2" />} 
                        />
                }}
                />
        </Tabs>
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