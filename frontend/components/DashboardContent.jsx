import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, View } from "react-native";
import { ArrowDown, ArrowUp } from "../assets/icons/SvgIcons"
import { usersAPI } from '../services/api';
import { useEffect, useState } from 'react';

export default function DashboardContent(){

    const pesoFormat = (number, minDigit) => {
        return number.toLocaleString(
            'en-PH',
            {
                style: 'currency', 
                currency: 'PHP',
                minimumFractionDigits: minDigit, 
            }
        )
    }

    const budgetPercentStatus = (spent, maximum) => {
        const result = Math.ceil((parseFloat(spent) / parseFloat(maximum)) * 100) || 0

        return Number.isFinite(result) ? result : 0;
    } 
    const remaningPercentage = (spent, maximum) => {
        const result = Math.ceil(100 - ((parseFloat(spent) / parseFloat(maximum)) * 100))

        return Number.isFinite(result) ? result : 0;
    }

    const [userBalance, setUserBalance] = useState(0);
    useEffect(() => {
        const fetchUserBalance = async () => {
            try{
                const {data} = await usersAPI.getBalance(7);
                setUserBalance(data);
            } catch(error) {
                console.log("Error from components > DashbaordContainer", error)
            }
        }
        fetchUserBalance();
    }, [])

    return(
        <View style={styles.dashboardContent}>
            <View style={styles.moneyBalance}>{/* 1st row  (row)*/}
                <View>
                    <Text style={{fontSize: 12, color: "#000000bf"}}>
                        <ArrowUp size={12} color="black" /> Total Balance
                    </Text>
                    <Text style={{fontWeight: "bold", color: "#FFFFFF", fontSize: 20}}>
                        {pesoFormat(parseFloat(userBalance.balance) || 0, 2)}
                    </Text>
                </View>
                <View style={styles.seperator}></View> 
                <View>
                    <Text style={{fontSize: 12, color: "#000000bf"}}>
                        <ArrowDown size={12} color="black" /> Total Expense
                    </Text>
                    <Text style={{fontWeight: "bold", color: "#0068ff", fontSize: 20}}>
                        {pesoFormat(parseFloat(userBalance.expenses) || 0, 2)}
                    </Text>
                </View> 
            </View> 
            <View style={styles.balanceProgress}>{/* 2nd row*/}
                <View style={styles.row1}>
                    <Text style={{color: "#FFFFFF", fontSize:11}}>
                        {budgetPercentStatus(userBalance.expenses, userBalance.balance) || 0}%
                    </Text>
                </View>
                <View style={[styles.row2, {width: `${remaningPercentage(userBalance.expenses, userBalance.balance)}%`}]}>
                    <Text style={{fontSize:11, color: "#000000b9", fontWeight: "bold"}}>
                        {pesoFormat(parseFloat(userBalance.balance || 0))}
                    </Text>
                </View>
            </View> 
            <View>{/* 3rd row*/}
                <Text><Feather name="check-square" size={14} color="black" /> 
                    {budgetPercentStatus(userBalance.expenses, userBalance.balance)}% Of your Expenses, Looks Good.
                </Text>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({

    dashboardContent: {
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: 14,
  
    },

    moneyBalance: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "75%",
    },

    seperator: {
        width: 1,
        height: "100%",
        backgroundColor: "#ffffffd3",
    },

    balanceProgress: {
        width: "75%",
        height: 22,
        borderRadius: 12,
        backgroundColor: "#122420",
        flexDirection: "row",
    },

    row1: {
        position: 'absolute',
        height: "100%",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 12,
    },

    row2: {
        position: 'absolute',
        right: 0,
        height: "100%",
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 12,
    },
})