import { StyleSheet, Pressable, Text, View } from 'react-native'
import React, { } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DashboardContent from "../../components/DashboardContent";
import Salary from "../../assets/icons/Salary";
import Groceries from "../../assets/icons/Groceries";
import Rent from "../../assets/icons/Rent";
import Car from "../../assets/icons/Car";
import Foods from "../../assets/icons/Foods";
import Transport from "../../assets/icons/Transport"
import Gifts from "../../assets/icons/Gifts"
import Medicine from "../../assets/icons/Medicine"
import Savings from "../../assets/icons/Savings"
import Entertainment from "../../assets/icons/Entertainment"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const categories = () => {

   return (
        <SafeAreaView style={styles.body}>
            <View style={styles.headerDashboard}>
                    <DashboardContent />
            </View>
            <View style={styles.itemContents}>
                <View style={styles.btnCategoryContainer}>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <Foods size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>Foods</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <Transport size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>Transport</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <Medicine size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>Medicine</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <Groceries size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>Groceries</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <Rent size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>Rent</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <Gifts size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>Gifts</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <Savings size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>Savings</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <Entertainment size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>Entertainment</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <FontAwesome6 name="add" size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>More</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default categories

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#00d09e",
    },

    headerDashboard: {
        height: "32%",
    },
    
    itemContents: {
        height: "68%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: 24,
    },

    btnCategoryContainer: {
        width: "85%",
        flexDirection: "row",
        columnGap: 20,
        rowGap: 44,
        flexWrap: "wrap",
    },

    btnContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 6
    },

    btnCategory: {
        backgroundColor: "#0068FF",
        paddingHorizontal: 22,
        paddingVertical: 18,
        borderRadius: 20
    },

    btnTextLabel: {
        fontWeight: "500",
        color: "#000000b7"
    }

});
