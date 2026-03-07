import { FlatList, Pressable, StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransactionCard from "../../../components/TransactionCard";
import * as Icons from "@/assets/icons/SvgIcons";
import Header from '../../../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { transactionsAPI } from '../../../services/api';

const transactions = () => {

    const btnRef = useRef([]);
    
    const [isBtnActive, setBtnActive] = useState([true, false]);
    const handleBtnPress = (btnIndex) => {
        setBtnActive((prev) => prev.map((_, index) => btnIndex == index ? true : false))
    }

    const [transactions, setTransactions] = useState([]);
    const fetchTransactions = async () => {
        try {
            const {data} = await transactionsAPI.getTransactions();
            setTransactions(data);
            
        } catch (error) {
            console.log('Failed to fetch transactions:', error);
        }
    }

    useEffect(() => { fetchTransactions(); }, [])

    const MonthSeperator = ({ dateTime, index }) => {
        const month = dateTime.split(" ")[2];
        const transacMonth = transactions.length < index || index !== 0
            ? 
            dateFormater(transactions[index-1].transactDate).split(" ")[2] 
            : 
            dateFormater(transactions[index].transactDate).split(" ")[2];

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

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
            fetchTransactions();
        }, 2000);
    }, []);

    return (
        <SafeAreaProvider style={styles.body}>
            <Header backButton={true} title="Transaction"/>
            <ScrollView 
                style={{height: "32%"}} 
                contentContainerStyle={styles.headerDashboard}
                refreshControl={
                    <RefreshControl progressViewOffset={35} refreshing={refreshing} onRefresh={onRefresh} />
                } 
                >
                <View style={styles.dashboardContent}>
                    <View style={styles.totalBalance}>
                        <Text style={{fontWeight: "500"}}>Total Balance</Text>
                        <Text style={{fontWeight: "500", fontSize: 18}}>₱7,890.00</Text>
                    </View>
                    <View style={styles.incomeExpense}>
                        <Pressable 
                            ref={(el) => btnRef.current[0] = el} 
                            style={[
                                styles.rowContainer, 
                                {backgroundColor: isBtnActive[0] ? "#0068ff" : "#FFF"}
                            ]}
                            onPress={() => handleBtnPress(0)}
                        >
                            <Icons.ArrowUp 
                                size={20} 
                                color={isBtnActive[0] ? "#FFF":"#00d09e"} 
                            />
                            <Text style={{
                                    fontSize: 12, 
                                    fontWeight: "500",
                                    color: isBtnActive[0] ? "#FFF" : "#000"
                                }}
                            >
                                Income
                            </Text>
                            <Text style={{
                                    fontSize: 18, 
                                    fontWeight: "500",
                                    color: isBtnActive[0] ? "#FFF" : "#000"
                                }}>
                                ₱00.00
                            </Text>
                        </Pressable>

                        <Pressable 
                            ref={(el) => btnRef.current[1] = el} 
                            style={[
                                styles.rowContainer, 
                                {backgroundColor: isBtnActive[1] ? "#0068ff" : "#FFF"}
                            ]}
                            onPress={() => handleBtnPress(1)}
                        >
                            <Icons.ArrowDown 
                                size={20} 
                                color={isBtnActive[1] ? "#FFF":"#0068ff"} 
                            />
                            <Text style={{
                                    fontSize: 12,  
                                    fontWeight: "500",
                                    color: isBtnActive[1] ? "#FFF" : "#000"
                                }}
                            >
                                Expenses
                            </Text>
                            <Text style={{
                                    fontSize: 18, 
                                    fontWeight: "500",
                                    color: isBtnActive[1] ? "#FFF" : "#0068ff"
                                }}
                            >
                                ₱00.00
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.itemContents}>
                <FlatList 
                
                    data={transactions}
                    contentContainerStyle={styles.itemContainer}
                    keyExtractor={(item) => item.transactionId.toString()}
                    renderItem={({item, index}) => {
                        const IconComponent = Icons[item.category] || Icons["More"];
                        return(
                            <>
                            <MonthSeperator index={index} dateTime={dateFormater(item.transactDate)}/>
                            <TransactionCard 
                                icon={<IconComponent size={24} color="#FFF"/>}
                                title={item.category}
                                date={dateFormater(item.transactDate)}
                                expenseTitle={item.expenseTitle}
                                amount={item.amount}
                            />
                            </>
                        )
                    }}
                    showsVerticalScrollIndicator={false}         
                />
            </View>
        </SafeAreaProvider>
    )
}

export default transactions

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#00d09e",
    },

    headerDashboard: {
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

    dashboardContent : {
        width: "85%",
        flexDirection: "column",
        gap: 12,
        marginTop: 52
    },

    totalBalance: {
        width: "100%",
        paddingVertical: 8,
        borderRadius: 14,
        backgroundColor: "#FFF",
        alignItems: "center"
    },

    incomeExpense: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "space-around"
    },

    rowContainer : {
        alignItems: "center",
        width: "45%",
        padding: 8,
        borderRadius: 14
    },

    itemContainer: {
        width: "95%",
        flexDirection: "column",
        alignItems: "center",
        gap: 20
    },
});
