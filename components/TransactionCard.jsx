import { StyleSheet, Text, View } from "react-native";
import Salary from "../assets/icons/Salary";

export default function TransactionCard(props) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
               {props.icon}
            </View>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 15, color: "#000000b7", fontWeight: "bold"}}>{props.title}</Text>
                <Text style={{fontSize: 12, color: "#0068FF", fontWeight: "bold"}}>{props.date}</Text>
            </View>
            <View style={styles.seperator}></View> 
            <View style={styles.expenseTitle}>
                <Text style={{fontSize: 14}}>{props.expenseTitle}</Text>
            </View>
            <View style={styles.seperator}></View> 
            <View style={styles.amount}>
                <Text style={{fontSize: 14, color: "#000000b7", fontWeight: "bold"}}>{props.amount}</Text>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({

    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },

    iconContainer: {
        padding: 12,
        borderRadius: 18,
        backgroundColor: "#0068ff",
    },

    titleContainer: {
        flexDirection: "column",
        gap: 4,
    }, 

    seperator: {
        width: 1,
        height: "100%",
        backgroundColor: "#00d09e",
    },

});