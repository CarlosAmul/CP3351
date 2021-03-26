import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, View, Colors, Text, DateTimePicker, TextField } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import UserContext from '../../../UserContext'
import fb from '../../../fb'
import db from '../../../db'


export default function ReportsFormScreen({ route }) {

    const { sensor } = route.params
    const navigation = useNavigation()
    const { user } = useContext(UserContext)


    Colors.loadColors({
        primary: '#6874e2',
        secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
        sidebg: '#ffffff',
        darkprimary: '#ff466a',
        darksecondary: '#0df5e3',
        darkmainbg: '#201a31',
        darksidebg: '#38304d'
    });


    const validateFinal = () => {}

    const sendRequest = () => {
        (async () => {

        })()
    }

    // console.log("req date", requestDate)
    // console.log("type", type)

    return (
        <>
            <View styles={styles.container}>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    muted: {
        fontSize: 13,
        padding: 5,
        alignContent: "center",
    },
    message: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        paddingHorizontal: 10,
        alignSelf: "center",
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
    cardContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: "row",
    },
    card: {
        padding: 20,
        margin: 5,
        borderWidth: 2,
        borderColor: 'lightgray',
        color: 'red'
    },
    cardRead: {
        backgroundColor: 'lightgray',
        color: 'black'
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    centerMargin: {
        marginHorizontal: 50,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
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
    smallSeparator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },
});