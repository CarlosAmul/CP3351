import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import db from '../../db';
import Application from './Application'

export default function ApplicationsScreen() {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

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

    const [allApplications, setAllApplications] = useState([])
    useEffect(() => db.Users.Applications.listenToUsersSubmittedApplication(setAllApplications), [])

    return (
        <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ alignItems: 'center' }}>
            <Text style={[styles.title, styles.mainHeader]}>
                As an admin, you approve/decline the applications received from the customers.
            </Text>
            {
                allApplications.map(application =>
                    <Application key={application.id} application={application} />
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    card: {
        padding: 20,
        margin: 20,
        width: 380,
        textAlign: "center",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    mainHeader: {
        color: "#6874e2",
        margin: 40,
        textAlign: 'center'
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a",
        margin: 10
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    radioGroup: {
        borderRadius: 20,
        padding: 10,
        width: 350,
    },
    fieldsContainer: {
        marginLeft: 30,
        marginRight: 30
    },
});
