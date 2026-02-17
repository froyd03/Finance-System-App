import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Profile } from '@/assets/icons/SvgIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../../components/Header';

const profile = () => {

  return (
      <SafeAreaProvider style={styles.body}>
            <View style={styles.headerDashboard}>
                <Header backButton={true} title="Profile"/>
                <View style={styles.profileContainer}>
                    <View style={styles.pictureContainer}>
                        <Profile size={84} color="#FFF" />
                    </View>
                    <Text style={{fontSize: 22, color: "#093030", fontWeight: "500"}}>
                        Froyd Banatao
                    </Text>
                </View>
            </View>
            
            <View style={styles.itemContainer}>
                <View style={styles.itemContents}>
                    <View style={styles.rowContainer}>
                        <View style={styles.iconContainer}>
                            <Profile size={24} color="#FFF" />
                        </View>
                        <Text style={styles.btnTxt}>Edit Profile</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="settings-outline" size={24} color="#FFF" />
                        </View>
                        <Text style={styles.btnTxt}>Settings</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="logout" size={24} color="#FFF" />
                        </View>
                        <Text style={styles.btnTxt}>Logout</Text>
                    </View>
                </View>
            </View>
      </SafeAreaProvider>   
  )
}

export default profile

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#00d09e",
    },

    headerDashboard: {
        height: "20%",
        alignItems: "center"
    },
    
    itemContainer: {
        height: "80%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        alignItems: "center"
    },

    profileContainer: {
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: 74,
        zIndex: 1,
        gap: 14
    },

    pictureContainer: {
        width: 140,
        height: 140,
        backgroundColor: "#093030",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center"
    },

    itemContents: {
        marginTop: 164,
        flexDirection: "column",
        gap: 32,
        width: "85%"
    },

    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14
    },

    iconContainer: {
        borderRadius: 18,
        padding: 12, 
        backgroundColor: "#0068FF"
    },

    btnTxt: {
        fontWeight: "500",
        fontSize: 16,
        color: "#093030"
    }
});
