import { StyleSheet, Pressable, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DashboardContent from "../../../components/DashboardContent";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Header from "../../../components/Header";
import { Link } from 'expo-router';
import * as Icons from "@/assets/icons/SvgIcons";

const categories = () => {

    const categoryItem = [
        "Food", 
        "Transport", 
        "Medicine", 
        "Groceries", 
        "Rent", 
        "Gifts", 
        "Savings", 
        "Entertainment"
    ];

   return (
        <SafeAreaProvider style={styles.body}>
            <Header backButton={true} title="Categories"/>
            <View style={styles.headerDashboard}>
                <View style={{marginTop: 41}}>
                    <DashboardContent />
                </View>
            </View>
            <View style={styles.itemContents}>
                <View style={styles.btnCategoryContainer}>
                    {categoryItem.map((item, index) => {
                        const IconComponent = Icons[item]

                        return(
                            <View key={index} style={styles.btnContainer}>
                                <Link href={`categories/${item}`} style={styles.btnCategory}>
                                    <IconComponent size={42} color="#FFF"/>
                                </Link>
                                <Text style={styles.btnTextLabel}>{item}</Text>
                            </View>
                        )
                    })}
                    <View style={styles.btnContainer}>
                        <Pressable style={styles.btnCategory}>
                            <FontAwesome6 name="add" size={42} color="#FFF"/>
                        </Pressable>
                        <Text style={styles.btnTextLabel}>More</Text>
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    )
}

export default categories

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#00d09e",
    },

    headerDashboard: {
        height: "32%",
        justifyContent: "center"
    },
    
    itemContents: {
        height: "68%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: 24,
    },

    btnCategoryContainer: {
        width: "85%",
        flexDirection: "row",
        columnGap: 20,
        rowGap: 44,
        flexWrap: "wrap",
        justifyContent: "center"
    },

    btnContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 6
    },

    btnCategory: {
        backgroundColor: "#0068FF",
        paddingHorizontal: 22,
        paddingVertical: 18,
        borderRadius: 20
    },

    btnTextLabel: {
        fontWeight: "500",
        color: "#000000b7"
    }

});
