import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native'
import { Colors, Text, Card, TextField, TextArea, Button, TouchableOpacity, RadioGroup, RadioButton } from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native'
import MenuIcon from '../../components/MenuIcon'

import Tech from './Tech'
import UserContext from '../../UserContext'
import db from '../../db'
import fb from '../../fb'


export default function TechTab() {

    const navigation = useNavigation();

    const { user } = useContext(UserContext)

    const [centers, setCenters] = useState([])
    const [newTechs, setNewTechs] = useState([])
    const [center, setCenter] = useState(null)
    useEffect(() => db.Users.listenByServiceNoCenter(setNewTechs), [])
    useEffect(() => db.SupportCenters.listenAll(setCenters), [])

    console.log("techs", newTechs)

    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const handleAssign = (tech, center) => {
        (async () => {
            // Center is the center id because picker value is center.id
            let old = await db.SupportCenters.findOne(center)
            db.SupportCenters.update({ ...old, techs: old.techs + 1 })
            db.Users.update({ ...tech, centerid: center })
        })()
    }

    const AssignAll = () => {
        (async () => {
            //Center is the center id because picker value is center.id
            await Promise.all(newTechs.map(t => {
                handleAutoAssign(t)
            }))
        })()
    }

    const handleAutoAssign = tech => {
        (async () => {
            let smallest = Math.min(...centers.map(c => c.techs))
            smallest = centers.filter(c => c.techs === smallest)
            // console.log("SMALLEST", smallest)
            if (smallest.length > 1) {
                let randomIndex = Math.floor(Math.random() * smallest.length)
                smallest = smallest[randomIndex]
            } else {
                smallest = smallest[0]
            }
            await db.SupportCenters.update({ ...smallest, techs: smallest.techs + 1 })
            await db.Users.update({ ...tech, centerid: smallest.id })
        })()
    }

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
        <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[styles.container, { padding: 30, marginVertical: 10 }]}>
                <Text text60M>Centers:</Text>
                {
                    centers.map(c =>
                        <Text key={c.id} text80M>{c.name}: {c.techs} techs available</Text>
                    )
                }
            </View>
            {
                newTechs.length > 0 &&
                <Button label="Auto Assign all"
                    style={styles.smallButton}
                    backgroundColor={Colors.primary}
                    onPress={AssignAll}
                    marginT-15
                />
            }
            {
                newTechs.map(tech =>
                    <Tech key={tech.id} tech={tech} centers={centers} assign={handleAssign} auto={handleAutoAssign} />
                )
            }

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 25,
        borderColor: Colors.primary,
        justifyContent: 'center',
        padding: 10
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
    smallButton: {
        width: Dimensions.get("window").width / 2.5,
        margin: 5,
        alignSelf: "center"
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
    horizontalView: {
        flex: 1,
        flexDirection: 'row'
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
