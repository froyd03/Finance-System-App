import { StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header(){
    return (
        <View style={styles.headerContainer}>
            <View>
                <Text style={styles.titleText}>Name</Text>
            </View>
            <View style={styles.notificationContainer}>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "red",
        position: "absolute",
        top: 0,
        zIndex: 3
    },
  
    titleContainer: {
        flex: 1,
    },

    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    notificationContainer: {
        marginRight: 10,
    },
})