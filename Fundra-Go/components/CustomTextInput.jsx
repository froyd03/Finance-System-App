import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'


export default function CustomTextInput( props ) {

    const [isFocused, setFocused] = useState(false)

    return (
        <TextInput 
            style={[isFocused ? styles.onFocused : styles.offFocused, props.TextInputStyle]} 
            onFocus={() => setFocused(true)} 
            onBlur={() => setFocused(false)}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    onFocused: {
        outlineWidth: 2,
        outlineColor: '#043b369d',
    },

    offFocused: {
        outlineWidth: 0,
    }
})