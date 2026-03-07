import { StyleSheet, Text, View, Pressable, ScrollView, Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomTextInput from "../../../components/CustomTextInput";
import * as Icons from '@/assets/icons/SvgIcons';
import { templatesAPI } from '../../../services/api';

const CATEGORY_ICONS = [
    "Food", 
    "Transport", 
    "Medicine", 
    "Groceries", 
    "Rent", 
    "Gifts", 
    "Savings", 
    "Entertainment", 
];

export default function TemplateForm() {

    const { id } = useLocalSearchParams();

    const [showModal, setShowModal] = useState(false);

    const [responseMessage, setResponseMessage] = useState('');
    const handleAddCategory = (category) => {
        const found = templates.categories?.find(value => value.name === category);

        if(found){
            setResponseMessage(`${found.name} is already in the list!`);
        }else{
            setTemplates(prev => ({
                ...prev,
                categories: [...prev.categories, { name: category, maximum: '' }]
            }));
            setResponseMessage('');
        }
        
        setShowModal(false);
    }

    const handleRemoveCategory = (index) => {
        setTemplates(prev => ({
            ...prev,
            categories: prev.categories.filter((_, itemIndex) => index !== itemIndex)
        }))
        setResponseMessage('');
    }

    const handleInputTemplateForm = (value) => {
        setTemplates(prev => ({...prev, ...value}))
    }

    const handleInputCategory = (targetIndex, newValue) => {
        setTemplates(prev =>({
            ...prev, 
            categories: prev.categories.map((value, index) => 
                index === targetIndex ? {...value, maximum: newValue} : value
            )
        }))
        console.log(templates);
    }

    const handleSaveBtn = async () => {
        try {
            const templateBody = {
                id,
                name: templates.name,
                period: templates.period,
                categories: templates.categories
            }

            const {data} = await templatesAPI.updateTemplate(templateBody);
            console.log(data)
        } catch(error){
            console.log(error)
        }
    }

    const [templates, setTemplates] = useState({});
    useEffect(() => {
        const fetchCategories = async () => {
            
            try{
                const {data} = await templatesAPI.getCategoriesByTemplateId(id);
                setTemplates(data);
                console.log(data)
            } catch(error) {
                console.log(error);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
    
    }, [templates]);

    return (
        <SafeAreaProvider style={styles.body}>
            <Header 
                title="Customize Template" 
                backButton={true}
            />
            <View style={styles.dashboard}></View>
        
            <ScrollView contentContainerStyle={{ alignItems: "center", gap: 32, paddingBottom: 28,}} style={styles.itemContents}>
                <View style={styles.inputContainer}>
                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Template Name</Text>
                        <CustomTextInput 
                            placeholder="Personal Template" 
                            TextInputStyle={styles.textInput}
                            value={templates.name}
                            onChangeText={value => handleInputTemplateForm({name: value})}
                        />
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Budget Period</Text>
                        <CustomTextInput 
                            placeholder="Weekly" 
                            TextInputStyle={styles.textInput}
                            value={templates.period}
                            onChangeText={value => handleInputTemplateForm({period: value})}
                        />
                    </View>
                </View>

                <View style={{width: '90%', alignItems: "center", gap: 16}}>

                    <View style={styles.catetgoryAction}>
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Categories:</Text>
                        <Pressable onPressOut={() => setShowModal(true)} style={styles.addBtn}>
                            <FontAwesome6 name="add" size={18} color="#000"/>
                        </Pressable>
                    </View>

                    {responseMessage &&
                        <View style={styles.txtResponseContainer}>
                            <Text style={styles.txtResponse}>{responseMessage}</Text>
                        </View>
                    } 
                    
                    {templates.categories?.map((item, index) => {
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
                                        keyboardType="numeric"
                                        TextInputStyle={[styles.textInput, {height: 38}]}
                                        value={item.maximum}
                                        onChangeText={value => handleInputCategory(index, value)}
                                    />
                                </View>
                                <Pressable onPressOut={() => handleRemoveCategory(index)}  style={styles.addBtn}>
                                    <FontAwesome6 name="minus" size={18} color="#000000a5"/>
                                </Pressable>
                            </View>
                        )
                    })}
                </View>
                <View>
                    <Pressable style={styles.mainBtn}>
                        <Text style={styles.btnTxt}>Apply Template</Text>
                    </Pressable>
                    <Pressable onPress={() => handleSaveBtn()} style={styles.secondaryBtn}>
                        <Text style={styles.btnTxt}>Save Changes</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                visible={showModal}
                backdropColor="#00000015"
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                            <Text style={styles.modalTitle}>
                                Select a Category
                            </Text>
                            <View style={{width: '100%', height: 1, backgroundColor: '#00000054'}}/>
                        </View>
                        <ScrollView contentContainerStyle={{
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            flexDirection: 'row', 
                            gap: 20, 
                            flexWrap: 'wrap'
                        }}>
                            {CATEGORY_ICONS.map(item => {
                                const Icon = Icons[item];
                                return(
                                    <Pressable onPressOut={() => handleAddCategory(item)} key={item} style={styles.iconContainer}>
                                        <Icon size={32} color="#FFF"/>
                                    </Pressable>
                                )
                            })}
                        </ScrollView>
                        <Pressable
                            style={styles.hideModalBtn}
                            onPress={() => setShowModal(false)}>
                            <Text style={styles.btnTxt}>Cancel</Text>
                        </Pressable>
                    </View>
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
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    iconContainer: {
        padding: 12,
        borderRadius: 18,
        backgroundColor: "#0068ff",
    },

    categoryTxtInputContainer: {
        width: "65%",
        gap: 2,
    },

    categoriesContainer: {
        gap: 12,
        width: "100%",
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

    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalView: {
        backgroundColor: '#FFF',
        borderRadius: 18,
        width: '75%',
        flexDirection: 'column',
        gap: 22,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 600,
        padding: 16,
        alignSelf: 'center',
        color: '#093030'
    },

    btnContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 4
    },

    btnTextLabel: {
        fontWeight: "500",
        color: "#000000b7"
    },

    hideModalBtn: {
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 28,
        backgroundColor: '#00d09e',
        marginBottom: 16,
        borderRadius: 12,
    },

    txtResponseContainer: {
        alignItems: 'center',
        backgroundColor: '#4091fbba',
        width: '100%',
        borderRadius: 8,
        paddingVertical: 4
    },

    txtResponse: {
        color: '#FFF',
        fontWeight: '500'
    }
})