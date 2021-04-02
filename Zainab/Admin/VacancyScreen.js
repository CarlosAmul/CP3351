import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Colors, Button, Card, Stepper, TextField } from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import Vacancy from './Vacancy'
import { Picker } from '@react-native-picker/picker';

export default function VacancyScreen() {

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

    const [vacancies, setVacancies] = useState([])
    useEffect(() => db.Vacancies.listenAll(setVacancies), [])

    const [id, setId] = useState("")
    const [role, setRole] = useState("")
    const [description, setDescription] = useState("")
    const [spaces, setSpaces] = useState(0)

    const validate = () => 
        role !== "" && description !== ""

    const create = async () => {
        if(validate()) {
            if(vacancies.filter(v => v.role === role).length === 0) {
                await db.Vacancies.create({role, description, spaces})
                setId("")
                setRole("")
                setDescription("")
                setSpaces(0)
            }
        }
    }

    const save = async () => {
        if(validate()) {
            if(vacancies.filter(v => v.role === role).length === 1) {
                await db.Vacancies.update({id, role, description, spaces})
                setId("")
                setDescription("")
                setRole("")
                setSpaces(0)
            }
        }
    }

    const remove = async(id) => {
        await db.Vacancies.remove(id)
        setId("")
        setDescription("")
        setRole("")
        setSpaces(0)
    }

    const edit = (vacancy) => {
        setId(vacancy.id)
        setDescription(vacancy.description)
        setRole(vacancy.role)
        setSpaces(vacancy.spaces * 1)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topContainer}>
                <Text style={[styles.title, styles.mainHeader]}>Manage Vacancies</Text>
                <Image
                    source={require("../../assets/images/hiring.png")}
                    style={{ width: 250, height: 250, margin: 10 }}
                />
            </View>
            <View style={styles.fieldsContainer}>
                <Picker
                    style={[styles.inputText, { height: 50, width: 290, backgroundColor: Colors.mainbg}]}
                    selectedValue={role}
                    onValueChange={setRole}
                >
                    <Picker.Item label='Select Role' value="" />
                    <Picker.Item label='Support' value="Support" />
                    <Picker.Item label='Marketing' value="Marketing" />
                    <Picker.Item label='Service' value="Service" />
                </Picker>
                <Stepper
                    initialValue={spaces}
                    min={0}
                    label="Spaces"
                    onValueChange={value => setSpaces(value)}
                    containerStyle={styles.inputText}
                    style={{backgroundColor: Colors.mainbg}}
                />
                <TextField
                    onChangeText={text => setDescription(text)}
                    hideUnderline
                    placeholder="Description"
                    style={[styles.inputText, {backgroundColor: Colors.mainbg}]}
                    value={description}
                />
                <View style={styles.buttonGroup}>
                <Button
                    label="Create"
                    style={[styles.transparentButton]}
                    labelStyle={{ color: Colors.darkprimary }}
                    onPress={() => create()}
                />
                <Button
                    label="Save"
                    style={[styles.transparentButton, { backgroundColor: '#f9ce7f49' }]}
                    labelStyle={{ color: Colors.secondary }}
                    onPress={() => save()}
                />
            </View>
            </View>
            <View style={{width: "80%", justifyContent: 'center', alignItems: 'center'}}>
                {
                    vacancies.map(vacancy =>
                        <Vacancy
                            key={vacancy.id}
                            vacancy={vacancy}
                            edit={edit}
                            remove={remove}
                        />
                    )
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    fieldsContainer: {
        margin: 20
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
        margin: 10
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%',
        marginTop: 20
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a"
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    topContainer: {

        alignItems: 'center',

        margin: 10
    }
});