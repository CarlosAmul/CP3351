import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ExpandableSection } from 'react-native-ui-lib'
import { Colors } from 'react-native-ui-lib'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import db from '../../db';
import { Button } from 'react-native-ui-lib';
import fb from '../../fb';

export default function Application({ application }) {

    Colors.loadColors({
        primary: '#6874e2',
        secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
        sidebg: '#ffffff',
    });

    const [vacancy, setVacancy] = useState("")
    useEffect(() => db.Vacancies.listenOne(setVacancy, application.vacancyid), [application])

    const [user, setUser] = useState("")
    useEffect(() => db.Users.listenOne(setUser, application.parentId), [application])

    const [expanded, setExpanded] = useState(false)

    const approve = async (status) => {
        await db.Users.Applications.updateUserApplication(user.id, application.id, {...application, approved: status})
        const notifyUserForApplication = fb.functions().httpsCallable('notifyUserForApplication')
        await notifyUserForApplication({userid: user.id, status, vacancy})
    }

    const drawHeader = () => {
        return (
            <View style={[styles.headerSection, styles.listItem]}>
                <Text style={{ fontSize: 20, color: Colors.green10 }}>By {user.name} for {vacancy.role} </Text>
                <View style={styles.icon}>
                    {
                        expanded ?
                            <FontAwesome5 name="eye-slash" size={24} color={Colors.green10} />
                            :
                            <FontAwesome5 name="eye" size={24} color={Colors.green10} />
                    }
                </View>
            </View>
        )
    }

    return (
        <ExpandableSection
            sectionHeader={drawHeader()}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
        >
            <View style={styles.section}>
                <View>
                    <Text style={[styles.appHeader, { backgroundColor: Colors.blue80, color: Colors.blue10 }]}>Education</Text>
                    <Text style={styles.appText}>{application.education}</Text>
                </View>
                <View>
                    <Text style={[styles.appHeader, styles.transparentButton]}>Experience</Text>
                    <Text style={styles.appText}>{application.experience}</Text>
                </View>
                <View>
                    <Text style={[styles.appHeader, { color: Colors.secondary, backgroundColor: '#f9ce7f49' }]}>Skills</Text>
                    <Text style={styles.appText}>{application.experience}</Text>
                </View>
                <View style={styles.buttonGroup}>
                    <Button
                        label="Approve"
                        labelStyle={{color: Colors.primary}}
                        style={{borderColor: Colors.primary, borderWidth: 1, backgroundColor: 'transparent', margin: 5}}
                        onPress={() => approve('approved')}
                    />
                    <Button
                        label="Reject"
                        labelStyle={{color: Colors.primary}}
                        style={{borderColor: Colors.primary, borderWidth: 1, backgroundColor: 'transparent', margin: 5}}
                        onPress={() => approve('rejected')}
                    />
                </View>
            </View>
        </ExpandableSection>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        backgroundColor: "#DCFDDE",
        borderRadius: 20,
        marginBottom: 20
    },
    section: {
        marginTop: -10,
        marginLeft: 20,
        marginBottom: 10,
        flexWrap: 'wrap',
        width: 200,
        justifyContent: 'center'
    },
    headerSection: {
        padding: 10,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "center"
    },
    appHeader: {
        width: 310,
        padding: 5,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    appText: {
        padding: 10
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a"
    },
})