import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from "../assets/icons/SvgIcons"
import * as Icons from "../assets/icons/SvgIcons"
import { templatesAPI } from '../services/api';

export default function Dashboard() {

    const colorStatus = (status) => {
        if(status >= 80){
            return "#FF383C";
        }else if(status >= 70){
            return "#FFCC00"
        }else{
            return "#34C759";
        }
    }

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

    const getTotalBudget = () => {
        const numOfArr = categoryData?.map(value => parseFloat(value.maximum));

        const sum = numOfArr.reduce((acc, currentValue) => acc + currentValue, 0)
        return sum;
    }

    const remainingBudget = () => {
        const numOfArr = categoryData?.map(value => parseFloat(value.spent));

        const sum = numOfArr.reduce((acc, currentValue) => acc + currentValue, 0)
        return getTotalBudget() - sum;
    }

    const budgetPercentStatus = (spent, maximum) => Math.ceil((parseFloat(spent) / parseFloat(maximum)) * 100)

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
            const fetchData = async () => {
                try{
                    const {data} = await templatesAPI.getUserTemplateCategory();
                    setCategoryData(data);
                } catch(error) {
                    console.log("error from components > home > index", error)
                }
            }
    
            fetchData();
    }, [])

    return (
        <FlatList
            ListHeaderComponent={     
                <View style={{ gap: 28 }}>
                    <View style={styles.monthlyUpdates}>
                        <View style={{width:"35%", justifyContent: "center", alignItems: "center",}}>
                            <View style={styles.iconCircle}>
                                <Text>{budgetPercentStatus(remainingBudget(), getTotalBudget()) || 0}%</Text>
                            </View>
                            <Text style={{textAlign: "center", fontSize: 12, width: "55%"}}>{categoryData[0]?.period} Budget</Text>
                        
                        </View>
                        <View style={{height: "100%", width: 2, marginRight: 10, backgroundColor: "#FFFF"}}/>

                        <View style={{width:"60%", gap: 8, justifyContent: "center", alignItems: "flex-start",}}>
                            <View style={styles.itemRow}>
                                <ArrowUp size={24} color="#000000b0" />
                                <View>
                                    <Text style={{fontSize: 12}}>Total Budget</Text>
                                    <Text style={{fontSize: 16, fontWeight: "bold"}}>{pesoFormat(getTotalBudget())|| '...'}</Text>
                                </View>
                            </View>
                            <View style={{width: "100%", height: 2, backgroundColor: "#FFFF"}}/>
                            <View style={styles.itemRow}>
                                <ArrowDown size={24} color="#0068ff" />
                                <View>
                                    <Text style={{fontSize: 12}}>Remaining Budget</Text>
                                    <Text style={{fontSize: 16, color: "#0068ff", fontWeight: "bold"}}>
                                        {pesoFormat(remainingBudget()) || '...'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.templateHeader}>
                        <Text style={{fontWeight: "500", color: "#093030", fontSize: 16}}>
                            Categories
                        </Text>
                        
                        <Text style={{fontWeight: "500", color: "#093030", fontSize: 14}}>
                            Resets in: 6d
                        </Text>
                    </View>
                </View>
            }
            data={categoryData}
            contentContainerStyle={styles.itemContainer}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                const Icon = Icons[item.name];

                return (
                    <View style={styles.categoryItem}>
                        <View style={styles.iconContainer}>
                            <Icon size={26} color="#FFF"/>
                        </View>
                        <View style={styles.categoryDetail}>
                            <View style={styles.row1}>
                                <Text style={{fontWeight: "500", fontSize: 14}}>{item.name}</Text>
                                <Text style={{color: "#0068FF", fontWeight: "500", fontSize: 12}}>
                                    {pesoFormat(+item.spent, 0)} / {pesoFormat(+item.maximum, 0)}
                                </Text>
                            </View>
                            <View style={styles.statusBar}>
                                <View style={[
                                    styles.inner, 
                                    {width:`${budgetPercentStatus(item.spent, item.maximum)}%`}
                                ]}></View>
                            </View>
                            <Text style={{
                                    color: colorStatus(budgetPercentStatus(item.spent, item.maximum)), 
                                    fontWeight: "500", 
                                    fontSize: 12}}
                                >
                                {pesoFormat((parseFloat(item.maximum) - parseFloat(item.spent)), 0)} Left
                            </Text>
                        </View>
                    </View>
                )
            }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{marginBottom: 30}}/>}
        />
    )
}


const styles = StyleSheet.create({
    itemContainer: {
        width: "100%",
        flexDirection: "column",
        gap: 22,
        alignItems: "center",
    },

    monthlyUpdates: {
        width: "100%",
        height: 145,
        borderRadius: 25,
        backgroundColor: "#00d09e",
        padding: 20,
        flexDirection: "row",
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

    templateHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    iconContainer: {
        paddingHorizontal: 12,
        borderRadius: 18,
        height: 48,
        backgroundColor: "#0068ff",
        justifyContent: "center"
    },

    categoryItem: {
        flexDirection: "row",
        width: "80%",
        gap: 14,
        alignItems: "center"
    },

    categoryDetail:{
        flexDirection: "column",
        width: "90%",
        gap: 4,
    },
    
    row1: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    statusBar: {
        width: "100%",
        backgroundColor: "#DFF7E2",
        height: 8,
        borderRadius: 12,
    },

    inner: {
        height: "100%",
        borderRadius: 12,
        backgroundColor: "#00D09E"
    }

})