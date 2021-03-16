import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../../components/Themed';
import { Card, Colors, Image, Text } from 'react-native-ui-lib'
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'
import db from '../../../db';

export default function DashboardAd({ ad }) {

    return (
        <View>
            <View style={{ alignSelf: 'center', width: 300, height: 160 }}>
                <Image
                    source={{ uri: ad.image }}
                    style={styles.cardimg}
                    resizeMode="contain"
                />
            </View>
            <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text text70 style={{ color: Colors.primary }}>Title</Text>
                <Text text80>{ad.title}</Text>
                <Text text70 style={{ color: Colors.primary }}>Description</Text>
                <Text text80>{ad.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
