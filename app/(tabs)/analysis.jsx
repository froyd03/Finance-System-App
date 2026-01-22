import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DashboardContent from "../../components/DashboardContent";

export default function analysis() {
    return (
      <SafeAreaView style={styles.body}>
          <View style={styles.headerDashboard}>
                <DashboardContent />
          </View>
          <View style={styles.itemContents}>

          </View>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#00d09e",
    },

    headerDashboard: {
        height: "32%",
    },
    
    itemContents: {
        height: "68%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#FFFFFF",
    }
});

