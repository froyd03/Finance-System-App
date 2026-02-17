import { StyleSheet, Text, View } from "react-native";

export default function TransactionCard(props) {

    const dateSeperator = (dateTime) => {
        const date = dateTime.split(" ");
        console.log(date[2])
    }

    return (
        <View style={styles.cardContainer}>

            <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                    {props.icon}
                </View>
                <View style={{justifyContent: "center", gap: 4}}>
                    <Text style={{fontSize: 15, color: "#000000b7", fontWeight: "bold"}}>{props.title}</Text>
                    <Text style={{fontSize: 12, color: "#0068FF", fontWeight: "bold"}}>{props.date}</Text>
                </View>
            </View>

            <View style={styles.expenseTitle}>
                <View style={styles.seperator}/>
                <Text style={{fontSize: 14}}>{props.expenseTitle}</Text>
                <View style={styles.seperator}/>
            </View>
            
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
        width: "95%",
    },

    iconContainer: {
        padding: 12,
        borderRadius: 18,
        backgroundColor: "#0068ff",
    },

    titleContainer: {
        flexDirection: "row",
        gap: 12,
    }, 

    expenseTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "30%",
    },

    amount: {
        width: "20%",
        alignItems: "flex-end",
    },

    seperator: {
        width: 1,
        height: "100%",
        backgroundColor: "#00d09e",
    },

});