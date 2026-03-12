import { Pressable, FlatList, StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import DashboardContent from "../../../components/DashboardContent";
import { useCallback, useEffect, useState } from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TemplateCard from "../../../components/TemplateCard"
import Dashboard from "../../../components/Dashboard";
import  * as Icons from "@/assets/icons/SvgIcons";
import { Link } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from "../../../components/Header";
import { templatesAPI } from "../../../services/api";
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen() {

    const headerTabs = ["Dashboard", "Presets"];
    const [activeTab, setActiveTab] = useState("Dashboard");

    const TemplateSeperator = ({ userId, index }) => {
       
        const templateUserId = templateData.length < index || index !== 0
            ?
            templateData[index-1].userId
            :
            templateData[index].userId

        return (
            <View>
                {templateUserId !== userId && 
                    <Text style={{
                            fontWeight: "500", 
                            color: "#093030", 
                            fontSize: 16, 
                            marginTop: 12,
                            marginBottom: 18
                        }}>
                        Custom Templates
                    </Text>
                }
            </View>
        )
    }
    
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
            fetchTemplateData();
            setActiveTab("Dashboard")
        }, 2000);
    }, []);

    const [templateData, setTemplateData] = useState([]);
    const fetchTemplateData = async () => {
        try{
            const {data} = await templatesAPI.getTemplates();
            setTemplateData(data)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log('mounted')
        fetchTemplateData();
    }, [])

    // const isFocused = useIsFocused();
    // if (!isFocused) {
    //     return; // Return null to effectively unmount the component when not focused
    // }

    return (
        <SafeAreaProvider style={styles.body}>
            <Header title="Hi! Welcome Back" subText="Good Morning"/>
            <View style={styles.dashboard}>
                <ScrollView 
                    style={{marginTop: 74}}
                    refreshControl={
                        <RefreshControl progressViewOffset={-40} refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <DashboardContent />
                </ScrollView>
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
                {activeTab === "Presets" && <FlatList
                    ListHeaderComponent={
                        <View style={{ gap: 26 }}>
                            
                            <View style={styles.templateHeader}>
                                <Text style={{fontWeight: "500", color: "#093030", fontSize: 16}}>
                                    Quick Start Templates
                                </Text>
                                <Link href={`/home/-1`} asChild>
                                    <Pressable style={styles.addBtn}>
                                        <FontAwesome6 name="add" size={18} color="#000"/>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>
                    }
                    contentContainerStyle={styles.itemContainer}
                    data={templateData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => 
                        <>
                        <TemplateSeperator userId={item.userId} index={index}/>
                        <Link href={`/home/${item.id}`}>
                            <TemplateCard 
                                icon={<Icons.Profile size={24} color='#FFF'/>}
                                title={item.name}
                                budgetDuration={item.budgetPeriod}
                            />
                        </Link>
                        </>
                        
                    }
                    ListFooterComponent={<View style={{marginBottom: 30}}/>}
                    showsVerticalScrollIndicator={false}
                />}

                {
                    (activeTab === "Dashboard" && true)  
                    ? 
                    <Dashboard /> 
                    : 
                    (activeTab !== "Presets") 
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
        alignItems: "center",
        width: '100%'
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