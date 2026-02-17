import { 
    KeyboardAvoidingView, 
    Pressable, 
    StyleSheet, 
    Text, 
    View,
    AppState,
    Keyboard
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import { Link } from 'expo-router';
import React, { useEffect, useRef } from 'react';

export default function SignUp() {

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const sub = AppState.addEventListener("change", nextState => {
            if (appState.current.match(/inactive|background/) && nextState === "active") {
                Keyboard.dismiss();
            }
            appState.current = nextState;
        });

        return () => sub.remove();
    }, []);

    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.textH1}>Create an Account</Text>

            <KeyboardAvoidingView 
                style={styles.formContainer} 
                behavior="height"
                enabled={true}
                keyboardVerticalOffset="240"
            >
                <View style={styles.inputContainer}>
                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <CustomTextInput placeholder="John Reyes Doe" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <CustomTextInput placeholder="example@example.com" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <CustomTextInput secureTextEntry placeholder="••••••••••" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <CustomTextInput secureTextEntry placeholder="••••••••••" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.btnContainer}>
                        <Pressable style={styles.mainBtn}>
                            <Text style={styles.btnTxt}>Sign Up</Text>
                        </Pressable>

                        <Text>Already have an account? 
                            <Link href='../' asChild><Text>Log In</Text></Link> 
                        </Text>
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
        marginTop: '8%',
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

})