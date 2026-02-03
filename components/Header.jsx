import { StyleSheet, Text, View, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

export default function Header(props){

    const handleBackBtn = () => {router.back()};

    return (
        <View style={styles.headerContainer}>
            {props.backButton && 
                <Feather name="arrow-left" onPress={handleBackBtn} size={28} color="#FFF"/>
            }

            <View>
                <Text style={styles.titleText}>{props.title}</Text>
                {props.subText && <Text style={{fontSize: 12}}>{props.subText}</Text>}
            </View>
            
            <Pressable style={styles.btnNotification}>
                <Ionicons name="notifications-outline" size={20} color="black" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 30,
        backgroundColor: "#00d09e",
        position: "absolute",
        top: 0,
        zIndex: 3
    },
  
    titleContainer: {
        flex: 1,
    },

    titleText: {
        fontSize: 20,
        fontWeight: '500',
        color: "#093030",
    },

    notificationContainer: {
        marginRight: 10,
    },

    btnNotification: {
        backgroundColor: "#FFFFFF",
        padding: 8,
        borderRadius: 50,
    },
})