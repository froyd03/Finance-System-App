import { 
    KeyboardAvoidingView, 
    Pressable, 
    StyleSheet, 
    Text, 
    View,
} from 'react-native'
import CustomTextInput from '../components/CustomTextInput';
import { Link } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {

    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.textH1}>Welcome</Text>

            <KeyboardAvoidingView style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Username or Email</Text>
                        <CustomTextInput placeholder="example@gmail.com" TextInputStyle={styles.textInput}/>
                    </View>

                    <View style={styles.labeltxtInputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <CustomTextInput secureTextEntry placeholder="••••••••••" TextInputStyle={styles.textInput}/>
                        <Text>Forgot password?</Text>
                    </View>

                    <View style={styles.btnContainer}>
                        <Link href="home" asChild>
                            <Pressable style={styles.mainBtn}>
                                <Text style={styles.btnTxt}>Log In</Text>
                            </Pressable>
                        </Link>

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
        gap: 25
    },

    labeltxtInputContainer: {
        gap: 10
    },

    btnContainer: {
        width: '100%',
        marginTop: '8%',
        alignItems: 'center',
        gap: 10
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

})