import { Pressable, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import DashboardContent from "../../components/DashboardContent";
import TransactionCards from "../../components/TransactionCard";
import Salary from "../../assets/icons/Salary";
import Groceries from "../../assets/icons/Groceries";
import Rent from "../../assets/icons/Rent";
import Car from "../../assets/icons/Car";
import Foods from "../../assets/icons/Foods";
import Transport from "../../assets/icons/Transport"
import Gifts from "../../assets/icons/Gifts"
import { useEffect, useRef } from "react";

export default function HomeScreen() {

    const transactionItem = [
        {
            id: 1,
            icon: <Salary size={24} color="#FFFFFF" />,
            title: "Salary",
            date: "12:45 - May 1",
            expenseTitle: "Allowance",
            amount: "$1,200.00" 
        },
        {
            id: 2,
            icon: <Groceries size={24} color="#FFFFFF" />,
            title: "Groceries",
            date: "12:45 - May 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {  
            id: 3,
            icon: <Rent size={24} color="#FFFFFF" />,
            title: "Rent",
            date: "12:45 - May 1",
            expenseTitle: "Rent",  
            amount: "-$600.00"
        },
        {  
            id: 4,
            icon: <Transport size={24} color="#FFFFFF" />,
            title: "Transport",
            date: "12:45 - May 1",
            expenseTitle: "Rent",  
            amount: "-$600.00"
        },
        {  
            id: 5,
            icon: <Foods size={24} color="#FFFFFF" />,
            title: "Food",
            date: "12:45 - May 1",
            expenseTitle: "Rent",  
            amount: "-$600.00"
        },
        {
            id: 6,
            icon: <Groceries size={24} color="#FFFFFF" />,
            title: "Groceries",
            date: "12:45 - May 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {
            id: 7,
            icon: <Gifts size={24} color="#FFFFFF" />,
            title: "Gifts",
            date: "12:45 - May 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
    ]

    const btnRef = useRef([]);
    const activeBtn = (btnNumber) => {

        btnRef.current.forEach((btn, index) => {
            if(index === btnNumber){
                btn.setNativeProps({
                    style: {backgroundColor: "#00d09e"},
                });
            }else{
                btn.setNativeProps({
                    style: {backgroundColor: "#ffffff00"}
                });
            }
        });
    }

    useEffect(() => {
        btnRef.current[0].setNativeProps({
            style: {backgroundColor: "#00d09e"},
        });
    }, [])

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
                        <View style={{ gap: 18 }}>
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
                            <View style={styles.tabBtn}>
                                <Pressable 
                                    onPressOut={() => activeBtn(0)}
                                    style={styles.itemBtn}
                                    ref={(element) => btnRef.current[0] = element}
                                >
                                    <Text>Daily</Text>
                                </Pressable>
                                <Pressable 
                                    onPressOut={() => activeBtn(1)} 
                                    style={styles.itemBtn}
                                    ref={(element) => btnRef.current[1] = element}
                                >
                                    <Text>Weekly</Text>
                                </Pressable>
                                <Pressable 
                                    onPressOut={() => activeBtn(2)} 
                                    style={styles.itemBtn}
                                    ref={(element) => btnRef.current[2] = element}
                                >
                                    <Text>Monthly</Text>
                                </Pressable>
                            </View>
                        </View>
                    }
                    contentContainerStyle={styles.itemContainer}
                    data={transactionItem}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TransactionCards 
                        icon={item.icon}
                        title={item.title}
                        date={item.date}
                        expenseTitle={item.expenseTitle}
                        amount={item.amount}
                    />}
                    showsVerticalScrollIndicator={false}
                />
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

    tabBtn: {
        width: "100%",
        height: 50,
        borderRadius: 12,
        backgroundColor: "#dff7e2", 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    itemContainer: {
        width: "100%",
        flexDirection: "column",
        gap: 22,
        alignItems: "center",
    },
    
    itemBtn: {
        alignItems: "center",
        width: 90,
        padding: 10,
        borderRadius: 12,
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
