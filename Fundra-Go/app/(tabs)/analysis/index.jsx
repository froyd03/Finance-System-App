import { View, ScrollView, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DashboardContent from "../../../components/DashboardContent";
import { BarChart } from "react-native-gifted-charts";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArrowDown, ArrowUp } from "@/assets/icons/SvgIcons";
import Header from "../../../components/Header"
import { transactionsAPI, templatesAPI } from '../../../services/api';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function analysis() {

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


    const barData = [
        {
          value: 40,
          label: 'Jan',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 20, frontColor: '#ED6665'},
        {
          value: 50,
          label: 'Feb',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 40, frontColor: '#ED6665'},
        {
          value: 75,
          label: 'Mar',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 25, frontColor: '#ED6665'},
        {
          value: 30,
          label: 'Apr',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 20, frontColor: '#ED6665'},
        {
          value: 60,
          label: 'May',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 40, frontColor: '#ED6665'},
        {
          value: 65,
          label: 'Jun',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 30, frontColor: '#ED6665'},
    ];
    

    return (
    <>
      <SafeAreaView style={styles.body}>
        <Header backButton={true} title="Analysis"/>

        <View style={styles.headerDashboard}>
            <View style={{marginTop: 41}}>
                <DashboardContent />
            </View>
        </View>
        
        <View style={styles.itemContents}>
            <ScrollView contentContainerStyle={{ alignItems: "center", gap: 28 }}>
            
                <View style={styles.tabBtnContainer}>
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
                    <Pressable 
                        onPressOut={() => activeBtn(3)} 
                        style={styles.itemBtn}
                        ref={(element) => btnRef.current[3] = element}
                    >
                        <Text>Year</Text>
                    </Pressable>
                </View>
                <View style={styles.barChartContainer}>
                    <View style={styles.headerChartContainer}>
                        <Text style={{fontWeight: "500"}}>Income & Expenses</Text>
                        <View style={styles.iconBtn}>
                            <Pressable onPress={handleSearchBtn} style={styles.iconBtnContainer}>
                                <Feather name="search" size={18} color="black" />
                            </Pressable>
                            <Pressable style={styles.iconBtnContainer}>
                                <Feather name="calendar" size={18} color="black" />
                            </Pressable>
                        </View>
                    </View>
                    <BarChart
                        data={barData}
                        height={120}
                        width={Dimensions.get("window").width - 180}
                        dashGap={4}
                        barWidth={8}
                        spacing={28}
                        yAxisThickness={0}
                        yAxisLabelSuffix="k"
                        roundedTop={4}
                        noOfSections={3}
                        yAxisTextStyle={{color: '#0068FF', fontWeight: 500, fontSize: 12}}
                        isAnimated
                    />
                </View>
                <View style={styles.salaryStatus}>
                    <View style={styles.rowContainer}>
                        <ArrowUp size={28} color="black" />
                        <Text style={{fontWeight: "500"}}>Income</Text>
                        <Text style={{fontSize: 24, fontWeight: "500"}}>₱0.00</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <ArrowDown size={28} color="#0068ff" />
                        <Text style={{fontWeight: "500"}}>Expense</Text>
                        <Text style={{fontSize: 24, color: "#0068ff", fontWeight: "500"}}>₱00.00</Text>
                    </View>
                </View>
                
                
            </ScrollView>
        </View>
        
      </SafeAreaView>
      </>
    )
}
const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#00d09e",
    },

    headerDashboard: {
        height: "32%",
        justifyContent: "center",
    },
    
    itemContents: {
        height: "68%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        paddingTop: 40,
        gap: 20,
    },

    itemBtn: {
        alignItems: "center",
        width: 70,
        padding: 10,
        borderRadius: 12,
    },

    tabBtnContainer: {
        width: "85%",
        height: 50,
        borderRadius: 12,
        backgroundColor: "#dff7e2", 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    barChartContainer: { 
        alignItems: "center", 
        width: "85%", 
        padding: 18, 
        gap: 22,
        borderRadius: 50, 
        backgroundColor: "#dff7e2"
    },

    headerChartContainer: {
        width: '90%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    iconBtn: {
        flexDirection: "row",
        gap: 8
    },

    iconBtnContainer: {
        backgroundColor: "#00d09e",
        padding: 6,
        borderRadius: 12
    },

    salaryStatus: {
        width: "60%",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    rowContainer : {
        alignItems: "center"
    }

});

