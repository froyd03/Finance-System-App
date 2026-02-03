import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
import Header from '../../../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const transactions = () => {

    const btnRef = useRef([]);
    
    const [isBtnActive, setBtnActive] = useState([true, false]);
    const handleBtnPress = (btnIndex) => {
        setBtnActive((prev) => prev.map((_, index) => btnIndex == index ? true : false))
    }

    const transactionItem = [
        {
            id: 1,
            icon: <Salary size={24} color="#FFFFFF" />,
            title: "Salary",
            date: "12:45 - January 1",
            expenseTitle: "Allowance",
            amount: "$1,200.00" 
        },
        {
            id: 2,
            icon: <Groceries size={24} color="#FFFFFF" />,
            title: "Groceries",
            date: "12:45 - January 5",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {  
            id: 3,
            icon: <Rent size={24} color="#FFFFFF" />,
            title: "Rent",
            date: "12:45 - Febuary 1",
            expenseTitle: "Rent",  
            amount: "-$600.00"
        },
        {  
            id: 4,
            icon: <Transport size={24} color="#FFFFFF" />,
            title: "Transport",
            date: "12:45 - Febuary 2",
            expenseTitle: "Rent",  
            amount: "-$600.00"
        },
        {  
            id: 5,
            icon: <Food size={24} color="#FFFFFF" />,
            title: "Food",
            date: "12:45 - Febuary 1",
            expenseTitle: "Rent",  
            amount: "-$600.00"
        },
        {
            id: 6,
            icon: <Groceries size={24} color="#FFFFFF" />,
            title: "Groceries",
            date: "12:45 - Jun 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {
            id: 7,
            icon: <Groceries size={24} color="#FFFFFF" />,
            title: "Groceries",
            date: "12:45 - Jun 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {
            id: 8,
            icon: <Gifts size={24} color="#FFFFFF" />,
            title: "Gifts",
            date: "12:45 - Jun 1",
            expenseTitle: "Pantry",  
            amount: "-300.00"
        },
        {
            id: 9,
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
        const transacMonth = transactionItem.length < index || index !== 1
            ? 
            transactionItem[index-2].date.split(" ")[2] 
            : 
            transactionItem[index-1].date.split(" ")[2];

        let isMonthDisplay = true;

        if(index === 1){
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

    return (
        <SafeAreaProvider style={styles.body}>
            <Header backButton={true} title="Transaction"/>
            <View style={styles.headerDashboard}>
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
                            onPressOut={() => handleBtnPress(0)}
                        >
                            <ArrowUp 
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
                            onPressOut={() => handleBtnPress(1)}
                        >
                            <ArrowDown 
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
            </View>

            <View style={styles.itemContents}>
                <FlatList 
                    data={transactionItem}
                    contentContainerStyle={styles.itemContainer}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <>
                            <MonthSeperator index={item.id} dateTime={item.date}/>
                            <TransactionCard 
                                icon={item.icon}
                                title={item.title}
                                date={item.date}
                                expenseTitle={item.expenseTitle}
                                amount={item.amount}
                            />
                        </>
                    }  
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
