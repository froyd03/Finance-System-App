import { 
    KeyboardAvoidingView, 
    Pressable, 
    StyleSheet, 
    Text, 
    View,
    AppState,
    Keyboard,
    Platform,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import { Link, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { authAPI } from '../services/api.js';
import * as SecureStore from 'expo-secure-store';

export default function SignUp() {

    const [signUpForm, setSignUpForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (value) => {
        setSignUpForm(prevState => ({...prevState, ...value}));
        setErrorMessage('');
        console.log(signUpForm);
    };

    const [ errorMessage, setErrorMessage] = useState('');
    const [loadingState, setLoadingState] = useState(false)
    const handleSubmit = async () => {
        try {
            setLoadingState(true);
            const {data} = await authAPI.register(signUpForm);
            setErrorMessage(data.response)

            if(data.status){
                //navigate to home page
                router.replace('/home');
                setErrorMessage('');
                await SecureStore.setItemAsync('token', data.response);
            }
        } catch (error) {
            setErrorMessage('An error occurred during registration. error: ' + error.message);
        } finally {
            setLoadingState(false)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.mainContainer}>
                {/* Header stays fixed */}
                <Text style={styles.textH1}>Create an Account</Text>

                {/* Form area */}
                <View style={styles.formWrapper}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                            {/* Full Name */}
                            <View style={styles.labeltxtInputContainer}>
                                <Text style={styles.label}>Full Name</Text>
                                <CustomTextInput 
                                onChangeText={(value) => handleInputChange({fullName: value})}
                                placeholder="John Reyes Doe" 
                                TextInputStyle={styles.textInput}
                                />
                            </View>

                            {/* Email */}
                            <View style={styles.labeltxtInputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <CustomTextInput 
                                onChangeText={(value) => handleInputChange({email: value})}
                                placeholder="example@example.com" 
                                TextInputStyle={styles.textInput}
                                />
                            </View>

                            {/* Password */}
                            <View style={styles.labeltxtInputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <CustomTextInput 
                                secureTextEntry
                                onChangeText={(value) => handleInputChange({password: value})}
                                placeholder="••••••••••"
                                TextInputStyle={styles.textInput}
                                />
                            </View>

                            {/* Confirm Password */}
                            <View style={styles.labeltxtInputContainer}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <CustomTextInput 
                                secureTextEntry
                                onChangeText={(value) => handleInputChange({confirmPassword: value})}
                                placeholder="••••••••••"
                                TextInputStyle={styles.textInput}
                                />
                            </View>

                            <Text style={styles.txtError}>{errorMessage}</Text>

                            <View style={styles.btnContainer}>
                                <Pressable onPress={handleSubmit} style={styles.mainBtn}>
                                {loadingState ? <ActivityIndicator /> : <Text style={styles.btnTxt}>Sign Up</Text>}
                                </Pressable>
                                <Text>
                                Already have an account? 
                                <Link href='../' asChild><Text> Log In</Text></Link>
                                </Text>
                            </View>
                            </View>
                        </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        gap: '8%'
    },

    formWrapper: {
        flex: 1, // occupy the remaining space below header
        width: '100%',
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    formContainer: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingBottom: 120,
        alignItems: 'center',
    },

    mainContainer: {
        flex: 1,
        backgroundColor: '#00d09e',
        alignItems: 'center', // centers header horizontally
    },

    inputContainer: {
        flexDirection: 'column',
        marginTop: '14%',
        width: '80%',
        gap: 18
    },

    labeltxtInputContainer: {
        gap: 6
    },

    btnContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 20
    },

    label: {
        fontWeight: 500,
        color: '#000000d0',
    },

    textH1: {
        fontSize: 28,
        fontWeight: 600,
        alignSelf: 'center',
        marginTop: '12%'
    },

    textInput: {
        height: 48,
        width: '100%',
        borderRadius: 16,
        paddingHorizontal: 18,
        backgroundColor: '#0000001a'
    },

    mainBtn:{
        backgroundColor: '#00d09e',
        padding: 14,
        width: '60%',
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 8
    },

    secondaryBtn:{
        backgroundColor: '#00d0a025',
        padding: 14,
        width: '60%',
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8
    },

    btnTxt: {
        fontWeight: 500,
        fontSize: 16
    },

    txtForgotPass: {
        textAlign: 'right',
        width: '85%',
        alignSelf: 'center',
        color: '#0000009f',
    },

    txtError: {
        color: 'red',
        textAlign: 'center',
        width: '100%',
    }

})