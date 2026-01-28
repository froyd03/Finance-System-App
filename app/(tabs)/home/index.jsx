import { Pressable, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import DashboardContent from "../../../components/DashboardContent";
import { useEffect, useRef } from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TemplateCard from "../../../components/TemplateCard"
import { Family, Student, Profile, Foods, Car, Salary } from "@/assets/icons/SvgIcons";

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

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.dashboard}>
                <View style={styles.dashboardHeader}>
                    <View style={styles.txtGreeting}>
                        <Text style={styles.h2Text}>Hi! Welcome Back</Text>
                        <Text style={[styles.labelText, {fontSize: 12}]}>Good Morning</Text>  
                    </View>
                    <Pressable style={styles.btnNotification}>
                        <Ionicons name="notifications-outline" size={20} color="black" />
                    </Pressable>
                </View>
                <DashboardContent />
            </View>
            <View style={styles.itemContents}>

                <FlatList
                    ListHeaderComponent={
                        <View style={{ gap: 28 }}>
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
                                        <Foods size={28} color="#000000b0" />
                                        <View>
                                            <Text style={{fontSize: 12}}>Food Last Month</Text>
                                            <Text style={{fontSize: 16, color: "#0068ff", fontWeight: "bold"}}>-$100.00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.templateHeader}>
                                <Text style={{fontWeight: "500", fontSize: 16}}>
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
                        <TemplateCard 
                            icon={item.icon}
                            title={item.title}
                            budgetDuration={item.budgetDuration}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                />
                {/* <FlatList 
                    ListHeaderComponent={
                        <Text style={{fontWeight: "500", fontSize: 16}}>
                            Custom Templates
                        </Text>
                    }
                /> */}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#00d09e",
    },

    dashboard: {
        height: "32%",
        flexDirection: "column",
    },

    dashboardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    
    itemContents: {
        height: "68%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingTop: 12
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
        marginTop: 15,
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
    }
});
