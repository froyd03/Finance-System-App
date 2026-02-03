import { useLocalSearchParams, Link } from "expo-router";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import Header from "../../../components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DashboardContent from "@/components/DashboardContent";
import TransactionCard from "../../../components/TransactionCard";
import { 
    Groceries, 
    Food, 
    Salary, 
    Rent, 
    Gifts, 
    Transport,
    Savings,
    Medicine,
    Entertainment,
    ArrowUp,
    ArrowDown
} from "@/assets/icons/SvgIcons";
import { useEffect, useState } from "react";

export default function Category(){

    const { category } = useLocalSearchParams();

    const transactionItem = [
        {
            icon: <Salary size={24} color="#FFFFFF" />,
            title: "Salary",
            date: "12:45 - January 1",
            expenseTitle: "Allowance",
            amount: "1,200.00" 
        },
        {
            icon: <Groceries size={24} color="#FFFFFF" />,
            title: "Groceries",
            date: "12:45 - January 5",
            expenseTitle: "Canned Food",  
            amount: "-300.00"
        },
        {  
            icon: <Rent size={24} color="#FFFFFF" />,
            title: "Rent",
            date: "12:45 - Febuary 1",
            expenseTitle: "Rent",  
            amount: "-$600.00"
        },
        {  
            icon: <Transport size={24} color="#FFFFFF" />,
            title: "Transport",
            date: "12:45 - Febuary 2",
            expenseTitle: "New Tires",  
            amount: "-$600.00"
        },
        {  
            icon: <Food size={24} color="#FFFFFF" />,
            title: "Food",
            date: "12:45 - Febuary 1",
            expenseTitle: "Lunch",  
            amount: "-$600.00"
        },
        {
            icon: <Groceries size={24} color="#FFFFFF" />,
            title: "Groceries",
            date: "12:45 - Jun 1",
            expenseTitle: "Veggies",  
            amount: "-300.00"
        },
        {
            icon: <Groceries size={24} color="#FFFFFF" />,
            title: "Groceries",
            date: "12:45 - Jun 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {
            icon: <Gifts size={24} color="#FFFFFF" />,
            title: "Gifts",
            date: "12:45 - Jun 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {
            icon: <Gifts size={24} color="#FFFFFF" />,
            title: "Gifts",
            date: "12:45 - December 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {
            id: 10,
            icon: <Gifts size={24} color="#FFFFFF" />,
            title: "Gifts",
            date: "12:45 - December 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
    ]

    const MonthSeperator = ({ dateTime, index }) => {
        
        const month = dateTime.split(" ")[2];
        const transacMonth = transactionByCategory.length < index || index !== 0
            ? 
            transactionByCategory[index-1]?.date.split(" ")[2] 
            : 
            transactionByCategory[index]?.date.split(" ")[2];

        let isMonthDisplay = true;

        if(index === 0){
            isMonthDisplay = true
        }else if(month === transacMonth){
            isMonthDisplay = false
        }else{
            isMonthDisplay = true
        }

        return(
            <View style={{
                marginTop: isMonthDisplay ? 18 : 0,
                marginBottom: isMonthDisplay ? 14 : 0

            }}>
                {isMonthDisplay && 
                    <Text style={{fontWeight: "500", color: "#000000b7"}}>
                        {month}
                    </Text>
                }
            </View>
        )
    }

    const [transactionByCategory, setTransaction]= useState([]);
    useEffect(() => {
        setTransaction(transactionItem.filter((item) => item.title === category))
    }, []);
    
    return(
        <SafeAreaProvider style={styles.body}>
            <Header backButton={true} title={category}/>
            <View style={styles.headerDashboard}>
                <View style={{marginTop: 41}}>
                    <DashboardContent />
                </View>
            </View>
            <View style={styles.itemContents}>
                <FlatList 
                    data={transactionByCategory}
                    contentContainerStyle={styles.itemContainer}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item, index}) => 
                        <>
                            <MonthSeperator index={index} dateTime={item.date}/>
                            <View style={styles.cardContainer}>
                                <View style={styles.titleContainer}>
                                    <View style={styles.iconContainer}>
                                        {item.icon}
                                    </View>
                                    <View style={{justifyContent: "center", gap: 4}}>
                                        <Text style={{fontSize: 15, color: "#000000b7", fontWeight: "bold"}}>{item.expenseTitle}</Text>
                                        <Text style={{fontSize: 12, color: "#0068FF", fontWeight: "bold"}}>{item.date}</Text>
                                    </View>
                                </View>
                                <View style={styles.amount}>
                                    <Text style={{fontSize: 14, color: "#0068FF", fontWeight: "bold"}}>₱{item.amount}</Text>
                                </View>
                            </View>
                        </> 
                    }  
                    showsVerticalScrollIndicator={false}         
                />
                <Link href={`/categories/AddExpense`} asChild>
                <Pressable style={styles.btnExpense}>
                    <Text style={{color: "#093030", fontSize: 16, fontWeight: "500"}}>Add Expenses</Text>
                </Pressable>
                </Link>
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
    
    dashboardContent : {
        width: "85%",
        flexDirection: "column",
        gap: 12,
        marginTop: 52
    },

    headerDashboard: {
        height: "32%",
        alignItems: "center",
        justifyContent: "center"
    },
    
    itemContents: {
        height: "68%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        padding: 12
    },

    itemContainer: {
        width: "95%",
        flexDirection: "column",
        alignItems: "center",
        gap: 20
    },

    iconContainer: {
        padding: 12,
        borderRadius: 18,
        backgroundColor: "#0068ff",
    },

    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
    },

    titleContainer: {
        flexDirection: "row",
        gap: 12,
    },

    btnExpense: {
        backgroundColor: "#00D09E",
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 14,
    }
})