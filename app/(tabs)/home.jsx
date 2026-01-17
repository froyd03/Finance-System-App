import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import DashboardContent from "../../components/DashboardContent";
import TransactionCards from "../../components/TransactionCard";
import Salary from "../../assets/icons/Salary";
import Groceries from "../../assets/icons/Groceries";
import Rent from "../../assets/icons/Rent";

export default function HomeScreen() {
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
                <View style={styles.monthlyUpdates}>

                </View>
                <View style={styles.tabBtn}>

                </View>

                <View style={styles.itemContainer}>
                    <TransactionCards 
                        icon={<Salary size={24} color="#FFFFFF" />}
                        title={"Salary"}
                        date={"12:45 - May 1"}
                        expenseTitle={"Allowance"}
                        amount={"$1,200.00"}
                    />
                    <TransactionCards 
                        icon={<Groceries size={24} color="#FFFFFF" />}
                        title={"Groceries"}
                        date={"12:45 - May 1"}
                        expenseTitle={"Pantry"}
                        amount={"-300.00"}
                    />
                    <TransactionCards 
                        icon={<Rent size={24} color="#FFFFFF" />}
                        title={"Rent"}
                        date={"12:45 - May 1"}
                        expenseTitle={"Rent"}
                        amount={"-$600.00"}
                    />
                </View>
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
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        gap: 15,
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
        width: "95%",
        height: 120,
        borderRadius: 25,
        marginTop: 15,
        backgroundColor: "#00d09e",
    },

    tabBtn: {
        width: "95%",
        height: 60,
        borderRadius: 12,
        backgroundColor: "#dff7e2", 
    },

    itemContainer: {
        width: "95%",
        flexDirection: "column",
        gap: 22,
    }
});
