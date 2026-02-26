import { 
    KeyboardAvoidingView, 
    Pressable, 
    StyleSheet, 
    Text, 
    View,
} from 'react-native'
import CustomTextInput from '../components/CustomTextInput';
import { Link, router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { authAPI } from '../services/api.js';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function Login() {
    
    const [loginData, setLoginData] = useState({ email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const {data} = await authAPI.login(loginData);
            setErrorMessage(data.response)
            console.log(data);
            if(data.status){
                //navigate to home page
                router.replace('/home');
                setErrorMessage('');
                await SecureStore.setItemAsync('token', data.response);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('An error occurred during login.');
        }
    }

    useEffect(() => {
        console.log(loginData);
    }, [loginData]);

    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.textH1}>Welcome</Text>

            <KeyboardAvoidingView style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Username or Email</Text>
                        <CustomTextInput 
                            onChangeText={(text) => setLoginData({...loginData, email: text})} 
                            placeholder="example@gmail.com" 
                            TextInputStyle={styles.textInput}
                        />
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <CustomTextInput 
                            secureTextEntry 
                            onChangeText={(text) => setLoginData({...loginData, password: text})} 
                            placeholder="••••••••••" TextInputStyle={styles.textInput}/>
                        <Text style={styles.txtForgotPass}>Forgot password?</Text>
                        {errorMessage && <Text style={styles.txtError}>{errorMessage}</Text>}
                    </View>
                    <View style={styles.btnContainer}>
                        <Pressable onPress={handleSubmit} style={styles.mainBtn}>
                            <Text style={styles.btnTxt}>Log In</Text>
                        </Pressable>

                        <Text style={styles.label}>or</Text>
                        
                        <Link href="/signup" asChild>
                            <Pressable style={styles.secondaryBtn}>
                                <Text style={styles.btnTxt}>Sign Up</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        gap: '8%'
    },

    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#00d09e'
    },

    formContainer: {
        backgroundColor: '#ffffff',
        height: '80%',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
    },

    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: '18%',
        width: '80%',
        gap: 20
    },

    labeltxtInputContainer: {
        gap: 8
    },

    btnContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 8
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
    },

    secondaryBtn:{
        backgroundColor: '#00d0a025',
        padding: 16,
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