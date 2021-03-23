import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors, Button, Card, TextArea } from 'react-native-ui-lib'
import db from '../db'
import fb from '../fb'
import UserContext from '../UserContext'
import { AntDesign } from '@expo/vector-icons';

export default function ApplicationScreen({ route }) {

    const { vacancy } = route.params

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

    const [userCreatedApplications, setUserCreatedApplications] = useState([])
    useEffect(() => db.Users.Applications.listenToUsersCreatedApplication(setUserCreatedApplications, user.id, vacancy.id), [user, vacancy])

    const [userSubmittedApplications, setUserSubmittedApplications] = useState([])
    useEffect(() => db.Users.Applications.listenToUserSubmittedApplication(setUserSubmittedApplications, user.id, vacancy.id), [user, vacancy])

    const [application, setApplication] = useState("")
    useEffect(() => userCreatedApplications.length > 0 ? db.Users.Applications.listenToUserApplication(setApplication, user.id, userCreatedApplications[0].id) : undefined, [userCreatedApplications, user])

    const [education, setEducation] = useState("")
    const [experience, setExperience] = useState("")
    const [skills, setSkills] = useState("")
    const [saved, setSaved] = useState("")

    useEffect(() => {
        setEducation(application.education)
        setExperience(application.experience)
        setSkills(application.skills)
        application ? 
            setSaved("The application is saved")
        :
            setSaved("")

    }, [application])

    const validate = () =>
        education !== "" && experience !== "" && skills !== ""

    const save = async () => {
        if (validate()) {
            if(userCreatedApplications.length === 0) {
                await db.Users.Applications.createApplication(user.id, { education, experience, skills, vacancyid: vacancy.id, approved: "created" })
            }
            else {
                await db.Users.Applications.updateUserApplication(user.id, userCreatedApplications[0].id, { education, experience, skills, vacancyid: vacancy.id, approved: "created" })
            }
            setSaved("The application is saved")
        }
    }

    const submit = async() => {
        if (validate()) {
            if(userCreatedApplications.length > 0) {
                await db.Users.Applications.updateUserApplication(user.id, userCreatedApplications[0].id, { education, experience, skills, vacancyid: vacancy.id, approved: "submitted" })
            }
            else {
                await db.Users.Applications.createApplication(user.id, { education, experience, skills, vacancyid: vacancy.id, approved: "submitted" })
            }
            const notifyAdminForApplication = fb.functions().httpsCallable('notifyAdminForApplication')
            await notifyAdminForApplication({username: user.name})
        }
    }

    return (
        <ScrollView style={{ backgroundColor: Colors.sidebg }} contentContainerStyle={styles.container}>
            {
                userSubmittedApplications.length > 0 ?
                    <View style={styles.bigCenterContainer}>
                        <Text style={[styles.bigCenterText, {color: Colors.primary}]}>Thank you! We have received your application for {vacancy.role} Role! We will notify you soon!</Text>
                        <AntDesign name="checkcircle" size={40} color={Colors.green10} />
                    </View>
                    :
                    <>
                        <Text style={[styles.title, styles.mainHeader]}>Application for {vacancy.role} Role </Text>
                        <Text style={{ textAlign: 'center' }}>Fill in the form below and submit.</Text>
                        <View style={styles.fieldsContainer}>
                            <View
                                style={{
                                    height: 150,
                                    marginBottom: 30,
                                    padding: 10,
                                    backgroundColor: Colors.mainbg,
                                    borderRadius: 20
                                }}
                            >
                                <TextArea
                                    placeholder="Education..."
                                    value={education}
                                    defaultValue={education}
                                    onChangeText={text => setEducation(text)}
                                />
                            </View>
                            <View
                                style={{
                                    height: 150,
                                    marginBottom: 30,
                                    padding: 10,
                                    backgroundColor: Colors.mainbg,
                                    borderRadius: 20
                                }}
                            >
                                <TextArea
                                    placeholder="Experience..."
                                    value={experience}
                                    defaultValue={experience}
                                    onChangeText={text => setExperience(text)}
                                />
                            </View>
                            <View
                                style={{
                                    height: 150,
                                    marginBottom: 30,
                                    padding: 10,
                                    backgroundColor: Colors.mainbg,
                                    borderRadius: 20
                                }}
                            >
                                <TextArea
                                    placeholder="Skills & abilities..."
                                    value={skills}
                                    defaultValue={skills}
                                    onChangeText={text => setSkills(text)}
                                />
                            </View>
                            <Text style={{textAlign: 'center', color: Colors.grey30}}>{saved}</Text>
                            <View style={styles.buttonGroup}>
                                <Button
                                    label="Save"
                                    style={[styles.transparentButton]}
                                    labelStyle={{ color: Colors.darkprimary }}
                                    onPress={() => save()}
                                />
                                <Button
                                    label="Submit"
                                    style={[styles.transparentButton, {backgroundColor: Colors.green80}]}
                                    labelStyle={{ color: Colors.green10 }}
                                    onPress={() => submit()}
                                />
                            </View>
                        </View>

                    </>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    fieldsContainer: {
        margin: 20,
        width: "80%"
    },
    container: {
        backgroundColor: '#ffffff',
        alignItems: "center",
    },
    subcontainer: {
        display: 'flex',
        width: "100%"
    },
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#ffffff',
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
    subcontainer: {

    },
    mainHeader: {
        color: "#6874e2",
        margin: 20,
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
        padding: 10
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a",
        margin: 10
    },
    bigCenterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        
    },
    bigCenterText: {
        textAlign: 'center',
        margin: 20,
        fontWeight: 'bold',
        fontSize: 20,
    }
});