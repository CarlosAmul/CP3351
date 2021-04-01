import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { Button, Colors, Image, Text } from 'react-native-ui-lib'
import db from '../db';

export default function Ad({ ad, styling, onPress }) { 

    return (
        <View style={[{ borderWidth: 1, borderColor: 'black', flexDirection: 'row', borderRadius: 10 }, styling]} >
            <View style={{ width: '40%', height: '90%', alignSelf: 'center', borderRadius: 20  }}>
                <Image
                    source={{ uri: ad.image }}
                    style={styles.cardimg}
                    resizeMode="contain"
                />
            </View>
            <View style={{ width: '50%', margin: 5, padding: 5, textAlign: 'center'}}>
                <Text text60 style={{ color: Colors.primary }}>{ad.title}</Text>
                <Text text80 style={{ color: Colors.grey20 }}>{ad.description}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        borderRadius: 5,
        width: '47%'
    },
    card: {
        padding: 20,
        margin: 5,
        width: '90%',
        borderWidth: 2,
        borderColor: 'lightgray',
        justifyContent: 'center'
    },
    cardimg: {
        flex: 1,
        width: null,
        height: null
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
