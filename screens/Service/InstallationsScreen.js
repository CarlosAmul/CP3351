import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import { Colors, Text, Card, Button } from 'react-native-ui-lib'
import UserContext from '../../UserContext'
import db from '../../db'

import InstallationTabs from './InstallationTabs'
import InstallationEditPicker from '../pickers/InstallationEditPicker'

export default function InstallationsServiceScreen() {

    const { user } = useContext(UserContext)

    const [selectedTab, setSelectedTab] = useState(0)

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

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const [pending, setPending] = useState([])
    const [assigned, setAssigned] = useState([])
    const [finished, setFinished] = useState([])
    
    useEffect(() => db.Sensors.Installations.listenByPending(setPending, user.centerid), [])
    useEffect(() => db.Sensors.Installations.listenByAssigned(setAssigned, user.id), [])
    useEffect(() => db.Sensors.Installations.listenByFinished(setFinished, user.id), [])

    const handleAssign = (req) => {
        let request = { ...req, userid: user.id, status: "Assigned" }
        db.Sensors.Installations.updateSub(request, request.parent)
    }

    const handleDetails = (req) => {
        let options = { request: req }
        if (selectedTab === 0)
            options.fromPending = true
        else if (selectedTab === 1)
            options.fromAssigned = true

        navigation.navigate("DetailsScreen", options)
    }

    const [isOpen, open] = useState(false)
    const [edit, setEdit] = useState("")

    const handleEdit = () => { open(!isOpen) }

    const save = (req) => {
        (async () => {
            let item = {...req, status:edit}
            let sensor = {...await db.Sensors.findOne(req.parent)}
            if (edit === "Finished")  {
                sensor.install = "yes"
                sensor.request = "no"
            }
            await db.Sensors.Installations.updateSub(item, req.parent)
            db.Sensors.update(sensor)
        })()
    }

    validateSave = () =>
        edit === ""

    return (
        <>
            <InstallationTabs set={setSelectedTab} />
            {
                selectedTab === 0 &&
                <>
                    <ScrollView>
                        {
                            pending.map(request =>
                                <View key={request.id} style={styles.container}>
                                    <Text text60M>{request.type === "install" ? "Installation" : "Removal"} Request</Text>
                                    <Text>Made on: {request.on.toDate().toLocaleDateString()}</Text>
                                    <Text green10>Fee: {request.fee} QAR</Text>
                                    <View style={styles.horizontalView}>
                                        <Button label="Assign"
                                            style={styles.smallButton}
                                            backgroundColor={Colors.primary}
                                            onPress={() => { handleAssign(request) }}
                                            marginT-15
                                        />
                                        <Button label="Details"
                                            style={styles.smallButton}
                                            backgroundColor={Colors.primary}
                                            onPress={() => { handleDetails(request) }}
                                            marginT-15
                                        />
                                    </View>
                                </View>
                            )
                        }
                    </ScrollView>
                </>
            }
            {
                selectedTab === 1 &&
                <>
                    <ScrollView>
                        {
                            assigned.map(request =>
                                request.status !== "Finished" ?
                                <View key={request.id} style={styles.container}>
                                    <Text text60M>{request.type === "install" ? "Installation" : "Removal"} Request</Text>
                                    <Text>Made on: {request.on.toDate().toLocaleDateString()}</Text>
                                    <Text green10>Fee: {request.fee} QAR</Text>
                                    <View style={styles.horizontalView}>
                                        <Button label="Edit"
                                            style={styles.smallButton}
                                            backgroundColor={Colors.primary}
                                            onPress={handleEdit}
                                            marginT-15
                                        />
                                        <Button label="Details"
                                            style={styles.smallButton}
                                            backgroundColor={Colors.primary}
                                            onPress={() => { handleDetails(request) }}
                                            marginT-15
                                        />
                                    </View>
                                    {
                                        isOpen &&
                                        <>
                                            <InstallationEditPicker set={setEdit} request={request} />
                                            <Button label="Save"
                                                style={styles.flexButton}
                                                backgroundColor={Colors.primary}
                                                onPress={() => { save(request) }}
                                                disabled={validateSave()}
                                                marginT-15
                                            />
                                        </>
                                    }
                                </View>
                            :undefined)
                        }
                    </ScrollView>
                </>
            }
            {
                selectedTab === 2 &&
                <>
                    <ScrollView>
                        {
                            finished.map(request =>
                                request.status === "Finished" ?
                                <View key={request.id} style={styles.container}>
                                    <Text text60M>{request.type === "install" ? "Installation" : "Removal"} Request</Text>
                                    <Text>Made on: {request.on.toDate().toLocaleDateString()}</Text>
                                    <Text green10>Fee: {request.fee} QAR</Text>
                                    <View style={styles.horizontalView}>
                                        <Button label="Details"
                                            style={styles.flexButton}
                                            backgroundColor={Colors.primary}
                                            onPress={() => { handleDetails(request) }}
                                            marginT-15
                                        />
                                    </View>
                                </View>
                            :undefined)
                        }
                    </ScrollView>
                </>
            }

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 25,
        margin: 15,
        padding: 15,
        flex: 1,
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
        width: Dimensions.get("window").width / 2.5,
        margin: 5,
        alignSelf: "center"
    },
    flexButton: {
        width: Dimensions.get("window").width / 1.2,
        margin: 5,
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
