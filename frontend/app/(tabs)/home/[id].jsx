import { StyleSheet, Text, View, Pressable, ScrollView, Modal, ActivityIndicator, ToastAndroid} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomTextInput from "../../../components/CustomTextInput";
import * as Icons from '@/assets/icons/SvgIcons';
import { templatesAPI } from '../../../services/api';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const [isFocus, setFocus] = useState(false);
    const inputref = useRef(null)
    
    const handleSelectOptions = (value) => {
        setTemplates(prev => ({...prev, period: value}))
        inputref.current.blur(false);
        setFocus(false)
    }

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
    }

    const [loadingState, setLoadingState] = useState(false);
    const handleSaveBtn = async () => {
        const templateBody = {
            id,
            name: templates.name,
            period: templates.period,
            categories: templates.categories
        }
        try {
            setLoadingState(true)
            setShowModalConfirm(true);
            if(!templates.userId || templates.userId === null){
                const {data} = await templatesAPI.createTemplate(templateBody);
                router.back();
                router.navigate(`/home/${data.id}`);
                ToastAndroid.show(data.message, ToastAndroid.LONG);
                setShowModalConfirm(false);
            }else{ 
                const {data} = await templatesAPI.updateTemplate(templateBody);
                setResponseMessage(data.message);
            }
        } catch(error){
            console.log(error)
        } finally {
            setLoadingState(false)
        }
    }

    const handleSetActiveTemplate = async () => {
        try {
            setLoadingState(true)
            setShowModalConfirm(true);
            const {data} = await templatesAPI.setAsActiveTemplate(id);
            
            if(data.message === "User already has an active template. Please deactivate the current template before setting a new one.") {
                setResponseMessage(data.message);
                setLoadingState(false)
            }else{
                ToastAndroid.show(data.message, ToastAndroid.LONG);
                router.replace('/home');
                setLoadingState(false)
                setShowModalConfirm(false);
            }
        } catch(error) {
            console.log("set active template error", error)
        }
    }

    const handleDeactivateTemplate = async () => {
        try {
            setLoadingState(true)
            setShowModalConfirm(true);
            const {data} = await templatesAPI.setDeactivateTemplate(id);
            if(data.message === "Deactivated successfully"){
                router.back();
                ToastAndroid.show(data.message, ToastAndroid.LONG);
            }else{
            }
        } catch(error) {
            console.log("set active template error", error)
        }
    }

    const [templates, setTemplates] = useState({
        userId: '',
        name: '',
        period: '',
        isActive: false,
        categories: []
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const {data} = await templatesAPI.getCategoriesByTemplateId(id);
                if(id !== '-1'){
                    setTemplates(data);
                }
            } catch(error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);

    return (
        <SafeAreaProvider style={styles.body}>
            <Header 
                title="Customize Template" 
                backButton={true}
            />
            <View style={styles.dashboard}></View>
        
            <ScrollView contentContainerStyle={{ alignItems: "center", gap: 32, paddingBottom: 28,}} style={styles.itemContents}>
                
                <View style={styles.inputContainer}> 
                    {responseMessage &&
                        <View style={styles.txtResponseContainer}>
                            <Text style={styles.txtResponse}>{responseMessage}</Text>
                        </View>
                    }
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
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)} 
                            ref={inputref}
                            placeholder="Weekly" 
                            TextInputStyle={styles.textInput}
                            showSoftInputOnFocus={false}
                            value={templates.period}
                        />
                        {isFocus && <View style={styles.selectOptions}>
                            {["Daily", "Weekly", "Monthly"].map(value => {
                                return(
                                    <Pressable 
                                        key={value}
                                        style={[styles.options, {backgroundColor: templates.period === value ? '#FFF': ''}]} 
                                        onPress={() => handleSelectOptions(value)}>
                                        <Text style={{fontSize: 14, color: '#000000bd', fontWeight: 500}}>
                                            {value}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                            <View style={{marginBottom: 18}}/>
                        </View>}
                    </View>
                </View>

                <View style={{width: '90%', alignItems: "center", gap: 16}}>

                    <View style={styles.catetgoryAction}>
                        <Text style={{fontSize: 16, fontWeight: "500"}}>Categories:</Text>
                        <Pressable onPressOut={() => setShowModal(true)} style={styles.addBtn}>
                            <FontAwesome6 name="add" size={18} color="#000"/>
                        </Pressable>
                    </View>
                    
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
                <View style={{width:'95%'}}>
                    <Pressable onPress={() => handleSetActiveTemplate()} style={styles.mainBtn}>
                        <Text style={styles.btnTxt}>Apply Template</Text>
                    </Pressable>
                    <Pressable onPress={() => handleSaveBtn()} style={styles.secondaryBtn}>
                        <Text style={styles.btnTxt}>Save Changes</Text>
                    </Pressable>
                    {(templates.isActive ? true : false) && 
                    <Pressable onPress={() => handleDeactivateTemplate()} style={styles.deactBtn}>
                        <Text style={styles.btnTxt}>Deactivate</Text>
                    </Pressable>
                    }
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
            <Modal
                animationType='fade'
                visible={showModalConfirm}
                backdropColor='#ffffff00'
            >
                <View style={styles.centeredView}>
                    {loadingState ?
                        (<ActivityIndicator size='large'/>) :
                        (<View style={styles.modalView}>
                            {responseMessage === "Success updated template" ?
                                <Feather name="check-circle" size={44} color="#00de9487" />
                                :
                                <MaterialIcons name="error-outline" size={44} color="#EF9a9a" />
                            }
                            <Text style={{fontSize: 18, fontWeight: 500}}>
                                {responseMessage === "Success updated template" ? 
                                    "Success"
                                    :
                                    "Error"
                                }
                            </Text>
                            
                            <Text style={{textAlign: 'center',}}>{responseMessage}</Text>
                            <Pressable onPress={() => setShowModalConfirm(false)} style={styles.btnModalDone}> 
                                <Text>Close</Text>
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
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8,
    },

    secondaryBtn:{
        backgroundColor: '#00d0a025',
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8,
    },

    deactBtn: {
        backgroundColor: '#EF9A9A',
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 8,
    },

    btnTxt: {
        fontWeight: 500,
        fontSize: 14,
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