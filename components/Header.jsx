import { View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = ({ navigation, route}) => {
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

export default Header;


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#00d09e"
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