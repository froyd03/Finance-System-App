import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomTextInput from "../../../components/CustomTextInput";
import * as Icons from '@/assets/icons/SvgIcons';

export default function TemplateForm() {

    const { id } = useLocalSearchParams();

    const templateData = [
        {
            id: 1,
            title: "Student Budget",
            budgetDuration: "Weekly",
            categories: [
                {name: "Food", budget: 3000},
                {name: "Groceries", budget: 1500},
                {name: "Savings", budget: 1500},
            ],
        },
        {
            id: 2,
            title: "Family Essentials",
            budgetDuration: "Monthly",
            categories: [
                {name: "Food", budget: 5000},
                {name: "Rent", budget: 10000},
                {name: "Entertainment", budget: 3000},
                {name: "Medicine", budget: 200},
            ],
        },
        {
            id: 3,
            title: "Everyday Spending",
            budgetDuration: "Daily",
            categories: [
                {name: "Food", budget: 1200},
                {name: "Transport", budget: 800},
            ],
        },
            
    ];
    
    const [template, setTemplate] = useState({});
    useEffect(() => {

        templateData.forEach((templateItem) => {
            if(templateItem.id === parseInt(id)){
                setTemplate(templateItem)
            }
        })
    }, []);

    return (
        <SafeAreaProvider style={styles.body}>
            <Header 
                title="Customize Template" 
                backButton={true}
            />
            <View style={styles.dashboard}></View>
        
            <ScrollView contentContainerStyle={{alignItems: "center", gap: 32, paddingBottom: 28,}} style={styles.itemContents}>
                <View style={styles.inputContainer}>
                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Template Name</Text>
                        <CustomTextInput value={template.title} placeholder="Personal Template" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Budget Period</Text>
                        <CustomTextInput value={template.budgetDuration} placeholder="Weekly" TextInputStyle={styles.textInput}/>
                    </View>
                </View>
                <View style={{alignItems: "center", gap: 16}}>

                    <View style={styles.catetgoryAction}>
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Categories:</Text>
                        <Pressable style={styles.addBtn}>
                            <FontAwesome6 name="add" size={18} color="#000"/>
                        </Pressable>
                    </View>
                    
                    {template.categories?.map((item, index) => {
                        const IconComponent = Icons[item.name];

                        return(
                            <View key={index} style={styles.categoriesContainer}>
                                <View style={styles.iconContainer}>
                                    <IconComponent size={24} color="#FFF"/>
                                </View>
                                <View style={styles.categoryTxtInputContainer}>
                                    <Text style={{fontSize: 14, color: "#000000b7", fontWeight: "bold"}}>{item.name}</Text>
                                    <CustomTextInput 
                                        placeholder="₱0.00" 
                                        value={String(item.budget)} 
                                        keyboardType="numeric"
                                        TextInputStyle={[styles.textInput, {height: 38}]}
                                    />
                                </View>
                            </View>
                        )
                    })}
                    
                </View>
                <View style={styles.actionBtn}>
                    <Pressable style={styles.mainBtn}>
                        <Text style={styles.btnTxt}>Apply Template</Text>
                    </Pressable>
                    <Pressable style={styles.secondaryBtn}>
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

      dashboard: {
        height: "15%",
        flexDirection: "column",
        gap: 22,    
    },

    itemContents: {
        height: "85%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        paddingHorizontal: 20,
    },

    labeltxtInputContainer: {
        gap: 4
    },

    label: {
        fontWeight: 500,
        color: '#000000d0',
    },

    textInput: {
        height: 48,
        width: '100%',
        borderRadius: 16,
        paddingHorizontal: 18,
        backgroundColor: '#0000001a'
    },

    inputContainer: {
        marginTop: 26,
        flexDirection: 'column',
        width: '85%',
        gap: 25
    },

    addBtn: {
        backgroundColor: "#00D09E",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 12
    },

    catetgoryAction: {
        width: "95%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    iconContainer: {
        padding: 12,
        borderRadius: 18,
        backgroundColor: "#0068ff",
        alignSelf: "flex-end"
    },

    categoryTxtInputContainer: {
        width: "80%",
        gap: 2,
    },

    categoriesContainer: {
        gap: 12,
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
       
    },

    mainBtn:{
        backgroundColor: '#00d09e',
        paddingVertical: 8,
        paddingHorizontal: 38,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8
    },

    secondaryBtn:{
        backgroundColor: '#00d0a025',
        paddingVertical: 8,
        paddingHorizontal: 38,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8,
    },

    btnTxt: {
        fontWeight: 500,
        fontSize: 16
    },
})