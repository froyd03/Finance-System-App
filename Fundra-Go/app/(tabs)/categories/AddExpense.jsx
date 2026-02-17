import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import DashboardContent from "../../../components/DashboardContent";
import CustomTextInput from "../../../components/CustomTextInput";

export default function addExpense() {

    const { category } = useLocalSearchParams();
    
    return (
        <SafeAreaProvider style={styles.body}>
            <Header backButton={true} title="Add Expenses"/>
            <View style={styles.headerDashboard}>

            </View>
            <ScrollView contentContainerStyle={{alignItems: "center", gap: 32, paddingBottom: 28,}} style={styles.itemContents}>
                <View style={styles.inputContainer}>
                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Date</Text>
                        <CustomTextInput placeholder="April 30, 2026" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Category</Text>
                        <CustomTextInput placeholder="Food" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Amount</Text>
                        <CustomTextInput placeholder="₱0.00" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Expense Title</Text>
                        <CustomTextInput placeholder="Dinner" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Message (optional):</Text>
                        <CustomTextInput 
                            multiline={true} 
                            placeholder="Enter message"
                            TextInputStyle={[styles.textInput, {height: 120}]}
                        />
                    </View>
                </View>
                
                <View style={styles.actionBtn}>
                    <Pressable style={styles.mainBtn}>
                        <Text style={styles.btnTxt}>Save Changes</Text>
                    </Pressable>
                </View>
            </ScrollView>
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
        height: "15%",
        alignItems: "center",
        justifyContent: "center"
    },
    
    itemContents: {
        height: "85%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        padding: 12
    },

    inputContainer: {
        marginTop: 26,
        flexDirection: 'column',
        width: '85%',
        gap: 18
    },

    labeltxtInputContainer: {
        gap: 4
    },

    label: {
        fontWeight: 500,
        color: '#000000d0',
    },

    textInput: {
        height: 42,
        width: '100%',
        borderRadius: 16,
        paddingHorizontal: 18,
        backgroundColor: '#0000001a'
    },

    mainBtn:{
        backgroundColor: '#00d09e',
        paddingVertical: 8,
        paddingHorizontal: 38,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8
    },


    btnTxt: {
        fontWeight: 500,
        fontSize: 16
    },

})