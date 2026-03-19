import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import CustomTextInput from "../../../components/CustomTextInput";
import { transactionsAPI } from '../../../services/api';
import * as Icons from '@/assets/icons/SvgIcons.jsx';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CATEGORIES_OPTIONS = ["Income", "Food", "Transport", "Medicine", "Groceries", "Rent", "Gifts", "Savings", "Entertainment", "More"];

export default function addExpense() {

    const [isFocus, setFocus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [expenseForm, setExpenseForm] = useState({
        category: '',
        amount: '',
        expenseTitle: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState("");
    const [loadingState, setLoadingState] = useState(false);
    const handleSubmitForm = async () => {

        try{ 
            setLoadingState(true);
            setModalVisible(true);
            const {data} = await transactionsAPI.createTransaction(expenseForm)
            if(data.message === "Transaction created successfully"){
                
                setExpenseForm({
                    category: '',
                    amount: '',
                    expenseTitle: '',
                    message: ''
                });
            }
            setResponseMessage(data.message);
        } catch(error) {
            setResponseMessage(error);
            console.log(error)
        } finally {
            setLoadingState(false)
        }
    }

    const inputref = useRef(null)
    const handleSelectOptions = (value) => {
        setExpenseForm(prev => ({...prev, category: value}))
        inputref.current.blur(false);
        setFocus(false)
    }

    const handleBtnModal = () => {
        setModalVisible(false);
    }
    
    return (
        <SafeAreaProvider style={styles.body}>
            <Header backButton={true} title="Add Income/Expenses"/>
            <View style={styles.headerDashboard}>

            </View>
            <ScrollView contentContainerStyle={{alignItems: "center", gap: 32, paddingBottom: 28,}} style={styles.itemContents}>
                
                <View style={styles.inputContainer}>
                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Category</Text>
                        <CustomTextInput 
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)} 
                            ref={inputref}
                            placeholder="Food" 
                            TextInputStyle={styles.textInput}
                            onChangeText={(value) => setExpenseForm({ ...expenseForm, category: value})}
                            showSoftInputOnFocus={false}
                            value={expenseForm.category}
                        />
                        {isFocus && <ScrollView style={styles.selectOptions}>
                            {CATEGORIES_OPTIONS.map(value => {
                                const Icon = Icons[value];
                                return(
                                    <Pressable 
                                        key={value}
                                        style={[styles.options, {backgroundColor: expenseForm.category === value ? '#FFF': ''}]} 
                                        onPress={() => handleSelectOptions(value)}>
                                        <Icon color="#00000089" size={24}/>
                                        <Text style={{fontSize: 14, color: '#000000bd', fontWeight: 500}}>
                                            {value}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                            <View style={{marginBottom: 18}}/>
                        </ScrollView>}
                    </View>
                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Amount</Text>
                        <CustomTextInput 
                            placeholder="₱0.00" 
                            TextInputStyle={styles.textInput}
                            onChangeText={(value) => setExpenseForm({ ...expenseForm, amount: value})}
                            value={expenseForm.amount}
                        />
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Expense Title</Text>
                        <CustomTextInput 
                            placeholder="Dinner" 
                            TextInputStyle={styles.textInput}
                            onChangeText={(value) => setExpenseForm({ ...expenseForm, expenseTitle: value})}
                            value={expenseForm.expenseTitle}
                        />
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Message (optional):</Text>
                        <CustomTextInput 
                            multiline={true} 
                            placeholder="Enter message"
                            TextInputStyle={[styles.textInput, {height: 120}]}
                            onChangeText={(value) => setExpenseForm({...expenseForm, message: value})}
                            value={expenseForm.message}
                        />
                    </View>
                </View>
                
                <View style={styles.actionBtn}>
                    <Pressable onPress={handleSubmitForm} style={styles.mainBtn}>
                        {loadingState ? <ActivityIndicator/> :<Text style={styles.btnTxt}>Save</Text>}
                    </Pressable>
                </View>
            </ScrollView>
            <Modal
                animationType='fade'
                visible={modalVisible}
                backdropColor='#ffffff00'
            >
                <View style={styles.centeredView}>
                    {loadingState ?
                        (<ActivityIndicator size='large'/>) :
                        (<View style={styles.modalView}>
                            {responseMessage === "Transaction created successfully" ?
                                <Feather name="check-circle" size={44} color="#00de9487" />
                                :
                                <MaterialIcons name="error-outline" size={44} color="#EF9a9a" />
                            }
                            <Text style={{fontSize: 18, fontWeight: 500}}>
                                {responseMessage === "Transaction created successfully" ? 
                                    "Success"
                                    :
                                    "Error"
                                }
                            </Text>
                            
                            <Text style={{textAlign: 'center',}}>{responseMessage}</Text>
                            <Pressable onPress={() => handleBtnModal(false)} style={styles.btnModalDone}> 
                                <Text>Done</Text>
                            </Pressable>
                        </View>)
                    }
                </View>
            </Modal>
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
        paddingHorizontal: 68,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8
    },

    btnTxt: {
        fontWeight: 500,
        fontSize: 16
    },

    selectOptions: {
        backgroundColor: "#dff7e2",
        padding: 12,
        borderRadius: 18,
        position: 'absolute',
        bottom: -130,
        zIndex: 1,
        width: "100%",
        height: 130,
    },

    options: {
        padding: 8,
        flexDirection: "row",
        gap: 24,
        borderRadius: 12,
    },

    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalView: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        padding: 18,
        gap: 6,
        borderRadius: 16,
        maxWidth: '70%',
        width: '100%'
    },

    btnModalDone: {
        width: "100%",
        alignItems: 'center',
        backgroundColor: '#00d09e',
        marginTop: 8,
        padding: 6,
        borderRadius: 8
    }
})