
import { StyleSheet, Text, View } from 'react-native'

export default function IconContainer({ icon }){

    return (
        <View style={styles.iconContainer}>
            { icon }
        </View>
    )
}



const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 18,
        padding: 12, 
        backgroundColor: "#0068FF"
    }
})