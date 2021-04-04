import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Carousel, TextArea, Image } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import MenuIcon from '../components/MenuIcon'
import { Colors } from 'react-native-ui-lib'
import UserTracking from './UserTracking'
import db from '../db';
import { LineChart } from 'react-native-chart-kit';
import UserPicker from '../screens/pickers/UserPicker';


export default function DashboardScreen() {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    // const [users, setUsers] = useState([])
    // useEffect(() => db.Users.listenByRole('Customer', setUsers), [])

    const [user, setUser] = useState(null)



    return (
        <ScrollView style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <UserPicker set={setUser} />
                {
                    user &&
                    <UserTracking user={user} />
                }
            </View>
        </ScrollView>
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
