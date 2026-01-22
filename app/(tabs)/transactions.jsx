import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';

const transactions = () => {

    const btnRef = useRef([]);
    
    const [isBtnActive, setBtnActive] = useState([true, false]);
    const handleBtnPress = (btnIndex) => {
        setBtnActive((prev) => prev.map((_, index) => btnIndex == index ? true : false))
    }

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.headerDashboard}>
                <View style={styles.dashboardContent}>
                    <View style={styles.totalBalance}>
                        <Text style={{fontWeight: "500"}}>Total Balance</Text>
                        <Text style={{fontWeight: "500", fontSize: 18}}>$7,890.00</Text>
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
                            <Ionicons 
                                name="arrow-up-right-box-outline" 
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
                                $00.00
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
                            <Ionicons 
                                name="arrow-down-right-box-outline" 
                                size={20} 
                                color={isBtnActive[1] ? "#FFF":"#0068ff"} 
                            />
                            <Text style={{
                                    fontSize: 12,  
                                    fontWeight: "500",
                                    color: isBtnActive[1] ? "#FFF" : "#000"
                                }}
                            >
                                Income
                            </Text>
                            <Text style={{
                                    fontSize: 18, 
                                    fontWeight: "500",
                                    color: isBtnActive[1] ? "#FFF" : "#000"
                                }}
                            >
                                $00.00
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.itemContents}>

            </View>
        </SafeAreaView>
    )
}

export default transactions

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        height: "100%",
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
    },

    dashboardContent : {
        width: "85%",
        flexDirection: "column",
        gap: 12,
    },

    totalBalance: {
        width: "100%",
        paddingVertical: 10,
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
    }
});
