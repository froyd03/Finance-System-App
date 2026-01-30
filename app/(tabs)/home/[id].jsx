import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function TemplateForm() {

    const { id } = useLocalSearchParams();

    const templateData = [
        {
            id: 1,
            
            title: "Student Budget",
            budgetDuration: "Weekly"
        },
        {
            id: 2,
            title: "Family Essentials",
            budgetDuration: "Monthly"
        },
        {
            id: 3,
            title: "Everyday Spending",
            budgetDuration: "Daily"
        },
            
    ];
    
    const [template, setTemplate] = useState({});
    useEffect(() => {

        templateData.forEach((templateItem) => {
            if(templateItem.id === parseInt(id)){
                setTemplate(templateItem)
            }
        })
    }, [])

    return (
        <View>
            <Text>hello {template.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})