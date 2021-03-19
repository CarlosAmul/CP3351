import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, Text, View, Platform, Image } from 'react-native';
import { Colors, TextField } from 'react-native-ui-lib'
import db from '../../db'

import SafetyInstruction from './SafetyInstruction'

export default function CustomerSafetyInstructionsScreen({ route }) {

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

    const { categoryid } = route.params
    const [category, setCategory] = useState([])
    useEffect(() => db.Categories.listenOne(setCategory, categoryid), [categoryid])

    const [instructions, setInstructions] = useState([])
    useEffect(() => db.Categories.SafetInstructions.listenToCategoryInstructions(setInstructions, categoryid), [categoryid])

    const [search, setSearch] = useState("")

    return (
        <ScrollView style={styles.scrollcontainer} contentContainerStyle={{justifyContent: 'center'}}>   
            <Text style={[styles.title, styles.mainHeader]}>Safety Instructions for {category.name}</Text>
            <View style={styles.searchField}>
                <TextField
                    onChangeText={text => setSearch(text)}
                    hideUnderline
                    placeholder="Search Instructions ..."
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                />
            </View>
            {
                instructions.map(instruction => 
                    search !== "" ? 
                        instruction.title.toLowerCase().includes(search.toLowerCase()) || instruction.description.toLowerCase().includes(search.toLowerCase()) ? 
                            <SafetyInstruction
                                key={instruction.id}
                                instruction={instruction}
                            />
                        :
                            null
                    :
                        <SafetyInstruction
                            key={instruction.id}
                            instruction={instruction}
                        />
                )
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
        margin: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
    },
    subcontainer: {
        display: 'flex',
        width: "100%"
    },
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#ffffff'
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
        color: "#ff466a"
    },
    buttonGroup: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    searchField: {
        marginLeft: 20,
        marginRight: 20
    },
});