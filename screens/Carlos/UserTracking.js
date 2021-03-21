import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Carousel, TextArea, Image } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import MenuIcon from '../../components/MenuIcon'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib'
import db from '../../db';


export default function UserTracking({ user }) {

    console.log(user)

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ width: '100%', marginBottom: 20 }}>
                <Text text60 style={{ textAlign: 'center', justifyContent: 'center', color: Colors.primary }}>{user.name}</Text>
                <Text text70 style={{ textAlign: 'center', justifyContent: 'center', color: Colors.primary }}>{user.id}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ padding: 15, alignSelf: 'center', alignItems: 'center', width: '44%', borderWidth: 1, borderRightWidth: 0, borderColor: Colors.primary, backgroundColor: Colors.purple80, borderRadius: 10 }}>
                    <Text text70 style={{ color: Colors.primary }}>Name</Text>
                    <Text text80 style={{color: Colors.black}}>{user.name}</Text>
                    <Text text70 style={{ color: Colors.primary }}>Registered</Text>
                    <Text text80 style={{color: Colors.black}}>12/2/2011</Text>
                    <Text text70 style={{ color: Colors.primary }}>Sensors</Text>
                    <Text text80 style={{color: Colors.black}}>5</Text>
                    <Text text70 style={{ color: Colors.primary }}>Likes</Text>
                    <Text text80 style={{color: Colors.black}}>0</Text>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, alignSelf: 'center', alignItems: 'center', width: '55%', borderWidth: 1, borderColor: Colors.primary, borderRadius: 10 }}>
                    <Text text70 style={{ color: Colors.primary }}>Logins This Week</Text>
                    <Text text80 style={{color: Colors.black}}>5</Text>
                    <Text text70 style={{ color: Colors.primary }}>Last Login</Text>
                    <Text text80 style={{color: Colors.black}}>05/12/2021</Text>
                    <Text text70 style={{ color: Colors.primary }}>Logouts This Week</Text>
                    <Text text80 style={{color: Colors.black}}>1</Text>
                    <Text text70 style={{ color: Colors.primary }}>Last Logout</Text>
                    <Text text80 style={{color: Colors.black}}>10/01/2020</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 20,
        borderRadius: 9,
        width: '90%'
    },
    textAreaContainer: {
        width: 250,
        padding: 20,
        backgroundColor: Colors.grey60,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.grey40
    },
    input: {
        width: 250,
        padding: 8,
        paddingLeft: 20,
        backgroundColor: Colors.grey60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey40
    },
    card: {
        padding: 20,
        margin: 5,
        width: '90%',
        borderWidth: 2,
        borderColor: 'lightgray',
        justifyContent: 'center',
        marginTop: 20
    },
    cardimg: {
        width: 400,
        height: 120
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
