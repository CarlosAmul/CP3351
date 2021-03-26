import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import { Colors, Text, Card, Button } from 'react-native-ui-lib'
import UserContext from '../../UserContext'
import db from '../../db'
import fb from '../../fb'

import DetailsMapComponent from './DetailsMapComponent'

export default function DetailsScreen({ route }) {

    const { user } = useContext(UserContext)

    const navigation = useNavigation()

    const { request } = route.params

    const [sensor, setSensor] = useState(null)
    const [service, setService] = useState(null)
    const [customer, setCustomer] = useState(null)

    useEffect(() => {
        (async () => {
            let sensor = await db.Sensors.findOne(request.parent)
            return setSensor(sensor)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            let user, userAuth
            if (sensor) {
                user = { ...await db.Users.findOne(sensor?.userid) }
                userAuth = fb.functions().httpsCallable('findAuthUser')
                const { email } = (await userAuth(sensor.userid)).data
                user.authUser = email
                setCustomer(user)
            }
        })()
    }, [sensor])

    useEffect(() => {
        (async () => {
            if(request.userid !== null) {
                let service = await db.Users.findOne(request.userid)
                setService(service)
            }
        })()
    }, [])

    // console.log("the parent", request.parent)
    // console.log("the sensor user", sensor)
    // console.log("the customer", customer)
    console.log("the service", service)

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


    return (
        <>
            {
                customer && sensor &&
                <>
                    <View style={styles.container}>
                        <Text text60M>{request.type === "install" ? "Installation" : "Removal"} Request</Text>
                        <Text text70M>Due: {request.when.toDate().toLocaleDateString()}</Text>
                        <Text text70M>For: {customer.name} - {customer.authUser}</Text>
                        <Text text70M>Sensor: {sensor.location}</Text>
                        {
                            request.note &&
                            <Text text70M>Note: {request.note}</Text>
                        }
                        {
                            request.status !== "Assigned" &&
                            <Text text70M>{request.status}</Text>
                        }
                        {
                            service &&
                                <Text text70M>Assigned to: {service.name}</Text>
                        }
                        <Text green10>Fee: {request.fee} QAR</Text>
                        <View style={styles.horizontalView}>
                            <Button label="Done"
                                style={styles.smallButton}
                                backgroundColor={Colors.primary}
                                onPress={() => { navigation.goBack() }}
                                marginT-15
                            />
                        </View>
                    </View>
                    <DetailsMapComponent oldCenter={request.from} oldCenterName={request.centername} userAddress={request.to} />
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 25,
        height: 250,
        margin: 15,
        padding: 15,
        justifyContent: 'center',
        backgroundColor: Colors.mainbg
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10
    },
    mainHeader: {
        margin: 10,
        textAlign: 'center'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    horizontalView: {
        flex: 1,
        flexDirection: 'row'
    },
    smallButton: {
        flex: 1,
        margin: 10,
        alignSelf: "center"
    },
    card: {
        padding: 10,
        paddingTop: 15,
        paddingLeft: 20,
        backgroundColor: "#ffffff",
        margin: 20,
        width: 400,
        textAlign: "center",
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
