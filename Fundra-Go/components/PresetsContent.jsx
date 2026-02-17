import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react';
import { ArrowDown, ArrowUp } from "../assets/icons/SvgIcons"
import { Food, Groceries, Transport } from "../assets/icons/SvgIcons"

export default function PresetsContent() {

    const categoriesData = [
        {
            id: 0,
            name: "Food",
            remainingBudget: 2000,
            spent: 1000,
            limit: 3000,
            status: 30,
            icon: <Food size={26} color="#FFF"/>
        },
        {
            id: 1,
            name: "Groceries",
            remainingBudget: 500,
            spent: 1000,
            limit: 1500,
            status: 80,
            icon: <Groceries size={26} color="#FFF"/>
        },
        {
            id: 2,
            name: "Transport",
            remainingBudget: 300,
            spent: 1200,
            limit: 1500,
            status: 90,
            icon: <Transport size={26} color="#FFF"/>
        }
    ]

    const colorStatus = (status) => {
        if(status >= 90){
            return "#FF383C";
        }else if(status > 50){
            return "#FFCC00"
        }else{
            return "#34C759";
        }
    }

    return (
        <FlatList
            ListHeaderComponent={     
                <View style={{ gap: 28 }}>
                    <View style={styles.monthlyUpdates}>
                        <View style={{width:"35%", justifyContent: "center", alignItems: "center",}}>
                            <View style={styles.iconCircle}>
                                <Text>73%</Text>
                            </View>
                            <Text style={{textAlign: "center", fontSize: 12, width: "55%"}}>Weekly Budget</Text>
                        
                        </View>
                        <View style={{height: "100%", width: 2, marginRight: 10, backgroundColor: "#FFFF"}}/>

                        <View style={{width:"60%", gap: 8, justifyContent: "center", alignItems: "flex-start",}}>
                            <View style={styles.itemRow}>
                                <ArrowUp size={24} color="#000000b0" />
                                <View>
                                    <Text style={{fontSize: 12}}>Total Budget</Text>
                                    <Text style={{fontSize: 16, fontWeight: "bold"}}>₱0.00</Text>
                                </View>
                            </View>
                            <View style={{width: "100%", height: 2, backgroundColor: "#FFFF"}}/>
                            <View style={styles.itemRow}>
                                <ArrowDown size={24} color="#0068ff" />
                                <View>
                                    <Text style={{fontSize: 12}}>Remaining Budget</Text>
                                    <Text style={{fontSize: 16, color: "#0068ff", fontWeight: "bold"}}>₱0.00</Text>
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
            data={categoriesData}
            contentContainerStyle={styles.itemContainer}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => 
                <View style={styles.categoryItem}>
                    <View style={styles.iconContainer}>
                        {item.icon}
                    </View>
                    <View style={styles.categoryDetail}>
                        <View style={styles.row1}>
                            <Text style={{fontWeight: "500", fontSize: 14}}>{item.name}</Text>
                            <Text style={{color: "#0068FF", fontWeight: "500", fontSize: 12}}>
                                ₱{item.spent} / ₱{item.limit}
                            </Text>
                        </View>
                        <View style={styles.statusBar}>
                            <View style={[styles.inner, {width: `${item.status}%`}]}>
                            </View>
                        </View>
                        <Text style={{color: colorStatus(item.status), fontWeight: "500", fontSize: 12}}>₱{item.remainingBudget} Left</Text>
                    </View>
                </View>
            }
            showsVerticalScrollIndicator={false}

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