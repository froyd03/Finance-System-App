import { Pressable, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import DashboardContent from "../../../components/DashboardContent";
import { useEffect, useRef, useState } from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TemplateCard from "../../../components/TemplateCard"
import PresetsContent from "../../../components/PresetsContent";
import { Family, Student, Profile, Food, Car, Salary } from "@/assets/icons/SvgIcons";
import { Link } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from "../../../components/Header";

export default function HomeScreen() {

    const templateData = [
        {
            id: 1,
            icon: <Student size={24} color="#FFF"/>,
            title: "Student Budget",
            budgetDuration: "Weekly"
        },
        {
            id: 2,
            icon: <Family size={24} color="#FFF"/>,
            title: "Family Essentials",
            budgetDuration: "Monthly"
        },
        {
            id: 3,
            icon: <Profile size={24} color="#FFF"/>,
            title: "Everyday Spending",
            budgetDuration: "Daily"
        },
    ];

    const headerTabs = ["Dashboard", "Presets"];
    const [activeTab, setActiveTab] = useState("Dashboard");

    return (
        <SafeAreaProvider style={styles.body}>
            <Header title="Hi! Welcome Back" subText="Good Morning"/>
            <View style={styles.dashboard}>
                <View style={{marginTop: 74}}>
                    <DashboardContent />
                </View>
            </View>
            <View style={styles.itemContents}>
                <View style={styles.headerTab}>
                    {headerTabs.map(tab => (
                        <Pressable
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 6,
                                borderRadius: 16,
                                backgroundColor: activeTab === tab ? "#3299FF" : null,
                            }}
                        >
                            <Text 
                                style={{
                                    fontWeight: "500",
                                    color: activeTab === tab ? "#FFF" : "#000000a2"
                                }}
                            >
                                {tab}
                            </Text>
                        </Pressable>
                    ))}
                </View>
                {activeTab === "Dashboard" && <FlatList
                    ListHeaderComponent={
                        <View style={{ gap: 26 }}>
                            <View style={styles.monthlyUpdates}>
                                <View style={{width:"35%", justifyContent: "center", alignItems: "center",}}>
                                    <View style={styles.iconCircle}>
                                        <Car size={42} color="#000000b0" />
                                    </View>
                                    <Text style={{textAlign: "center", fontSize: 12, width: "55%"}}>Savings On Goals</Text>
                                
                                </View>
                                <View style={{height: "100%", width: 2, marginRight: 10, backgroundColor: "#FFFF"}}/>

                                <View style={{width:"60%", gap: 8, justifyContent: "center", alignItems: "flex-start",}}>
                                    <View style={styles.itemRow}>
                                        <Salary size={28} color="#000000b0" />
                                        <View>
                                            <Text style={{fontSize: 12}}>Revenue Last Month</Text>
                                            <Text style={{fontSize: 16, fontWeight: "bold"}}>$500.00</Text>
                                        </View>
                                    </View>
                                    <View style={{width: "100%", height: 2, backgroundColor: "#FFFF"}}/>
                                    <View style={styles.itemRow}>
                                        <Food size={28} color="#000000b0" />
                                        <View>
                                            <Text style={{fontSize: 12}}>Food Last Month</Text>
                                            <Text style={{fontSize: 16, color: "#0068ff", fontWeight: "bold"}}>-$100.00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.templateHeader}>
                                <Text style={{fontWeight: "500", color: "#093030", fontSize: 16}}>
                                    Quick Start Templates
                                </Text>
                                <Pressable style={styles.addBtn}>
                                    <FontAwesome6 name="add" size={18} color="#000"/>
                                </Pressable>
                            </View>
                        </View>
                    }
                    contentContainerStyle={styles.itemContainer}
                    data={templateData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => 
                        <Link href={`/home/${item.id}`}>
                            <TemplateCard 
                                icon={item.icon}
                                title={item.title}
                                budgetDuration={item.budgetDuration}
                            />
                        </Link>
                    }
                    showsVerticalScrollIndicator={false}
                />}

                {
                    (activeTab === "Presets" && true)  
                    ? 
                    <PresetsContent /> 
                    : 
                    (activeTab !== "Dashboard") 
                    && 
                    <Text style={{fontStyle: "italic"}}>No Template Active</Text>
                }
                
            </View>
            
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#00d09e",
    },

    dashboard: {
        height: "32%",
        flexDirection: "column",
        gap: 22,    
    },

    dashboardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 4,
    },
    
    itemContents: {
        height: "68%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingTop: 8,
        gap: 6
    },

    h2Text:{
        fontSize: 20,
        fontWeight: "500",
        color: "#000000c7",
    },

    btnNotification: {
        backgroundColor: "#FFFFFF",
        padding: 8,
        borderRadius: 50,
    },

    monthlyUpdates: {
        width: "100%",
        height: 145,
        borderRadius: 25,
        backgroundColor: "#00d09e",
        padding: 20,
        flexDirection: "row",
    },

    itemContainer: {
        width: "100%",
        flexDirection: "column",
        gap: 22,
        alignItems: "center",
    },

    templateHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    addBtn: {
        backgroundColor: "#00D09E",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 12
    },
    
    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 80,
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#FFFFFF",
    },

    itemRow: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 12
    },

    headerTab: { 
        flexDirection: "row", 
        width: "100%", 
        justifyContent: "space-around", 
        alignSelf: "center", 
        paddingVertical: 8,
    }
});