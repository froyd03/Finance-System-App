import { useLocalSearchParams, Link } from "expo-router";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import Header from "../../../components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DashboardContent from "@/components/DashboardContent";
import TransactionCard from "../../../components/TransactionCard";
import * as Icons from "@/assets/icons/SvgIcons";
import { useEffect, useState } from "react";
import { transactionsAPI } from "../../../services/api";

export default function Category(){

    const { category } = useLocalSearchParams();

    const MonthSeperator = ({ dateTime, index }) => {
        
        const month = dateTime.split(" ")[2];
        const transacMonth = transactionByCategory.length < index || index !== 0
            ? 
            dateFormater(transactionByCategory[index-1].transactDate).split(" ")[2] 
            : 
            dateFormater(transactionByCategory[index].transactDate).split(" ")[2];

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

    const dateFormater = (dateTime) => {
        const formatted = new Date(dateTime).toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            month: "short",
            day: "numeric",
            timeZone: "Asia/Manila"
        }).split(', ');

        return formatted[1]+ ' - ' + formatted[0];
    } 

    const [transactionByCategory, setTransaction]= useState([]);
    useEffect(() => {
        const fetchTransactionByCategory = async () => {
            try {
                const {data} = await transactionsAPI.getTransactionByCategory(category);
                console.log(data);
                setTransaction(data);
            } catch(error) {
                console.log("fetch category error:", error.response.data)
            }
        } 

        fetchTransactionByCategory();
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
                    renderItem={({item, index}) => {
                        const Icon = Icons[item.category];
                        return(<>
                            <MonthSeperator index={index} dateTime={dateFormater(item.transactDate)}/>
                            <View style={styles.cardContainer}>
                                <View style={styles.titleContainer}>
                                    <View style={styles.iconContainer}>
                                        <Icon size={24} color="#FFF"/>
                                    </View>
                                    <View style={{justifyContent: "center", gap: 4}}>
                                        <Text style={{fontSize: 15, color: "#000000b7", fontWeight: "bold"}}>{item.expenseTitle}</Text>
                                        <Text style={{fontSize: 12, color: "#0068FF", fontWeight: "bold"}}>{dateFormater(item.transactDate)}</Text>
                                    </View>
                                </View>
                                <View style={styles.amount}>
                                    <Text style={{fontSize: 14, color: "#0068FF", fontWeight: "bold"}}>₱{item.amount}</Text>
                                </View>
                            </View>
                        </>)
                        }
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