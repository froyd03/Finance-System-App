import { 
    KeyboardAvoidingView, 
    Pressable, 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    Platform,
    AppState  
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';

export default function SignUp() {

    useEffect(() => {
        const sub = AppState.addEventListener("change", (state) => {
            if (state === "active") {
                StatusBar.setBackgroundColor("#00d09e");
                StatusBar.setBarStyle("light-content");
            }
        });

        return () => sub.remove();
    }, []);

    return (
        <>
        <StatusBar style="light" backgroundColor="#00d09e" />

        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.textH1}>Create an Account</Text>

            <KeyboardAvoidingView 
                style={styles.formContainer} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled={true}
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
                            <Link href='../' asChild><Text> Log In</Text></Link> 
                        </Text>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
        </>
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
        backgroundColor: '#ffffffd6',
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
        borderRadius: 12,
        paddingHorizontal: 18,
        backgroundColor: '#0000001a'
    },

    mainBtn:{
        backgroundColor: '#00d09e',
        padding: 14,
        width: '60%',
        borderRadius: 12,
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