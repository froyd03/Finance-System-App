
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Edit } from "@/assets/icons/SvgIcons";

export default function TemplateCard(props) {

    return(
        <View style={styles.cardContainer}>

            <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                    {props.icon}
                </View>
                <View style={{justifyContent: "center", gap: 4}}>
                    <Text style={{fontSize: 15, color: "#093030", fontWeight: "bold"}}>{props.title}</Text>
                    <Text style={{fontSize: 12, color: "#3299FF", fontWeight: "bold"}}>{props.budgetDuration} Budget</Text>
                </View>
            </View>

            <View >
                <Edit size={22} color="#3299FF"/>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "92%",
        // backgroundColor: "#DFF7E2",
        // pading: 110
    },

    titleContainer: {
        flexDirection: "row",
        gap: 12,
    }, 

    iconContainer: {
        padding: 12,
        borderRadius: 18,
        backgroundColor: "#0068ff",
    },
})