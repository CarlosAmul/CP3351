import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, Text, View, Platform, Image } from 'react-native';
import { Colors, TextField, TextArea, Button, TouchableOpacity } from 'react-native-ui-lib'
import db from '../../db'
import fb from '../../fb'

import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import SafetyInstruction from './SafetyInstruction'

export default function SafetyInstructionsScreen({ route }) {

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

    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    console.log(image)

    const uploadImage = async () => {

        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })

        if (!image.cancelled) {
            setImage(Image.resolveAssetSource(image).uri)
            // const when = new Date()
            // const imageName = when.toISOString()

            // const imageRef = fb.storage().ref(`categories/${categoryid.id}/images/${imageName}.jpg`)

            // const response = await fetch(image.uri)
            // const blob = await response.blob()
            // await imageRef.put(blob)
            // const url = await imageRef.getDownloadURL()
            // console.log('url', url)
            // blob.close()
        }
    }   

    const edit = (instruction) => {
        setId(instruction.id)
        setTitle(instruction.title)
        setDescription(instruction.description)
        setImage(instruction.image)
    }

    const remove = async (id) => {
        await db.Categories.SafetInstructions.removeInstruction(categoryid, id)
    }

    const create = async () => {
        if(id === "" && title !== "" && description !== "" && image !== "") {
            const instruction = await db.Categories.SafetInstructions.createSafetyInstruction(categoryid, {title, description})

            const imageRef = fb.storage().ref(`categories/${categoryid.id}/images/safetyinstructions/${instruction.id}.jpg`)

            const response = await fetch(image)
            const blob = await response.blob()
            await imageRef.put(blob)
            const url = await imageRef.getDownloadURL()
            blob.close()
            await db.Categories.SafetInstructions.updateSafetyInstruction(categoryid, instruction.id, {title, description, image})
            setTitle("")
            setDescription("")
            setImage("")
            setId("")
        }
    }

    const save = async () => {
        if(title !== "" && description !== "" && image !== "") {
            const imageRef = fb.storage().ref(`categories/${categoryid.id}/images/safetyinstructions/${id}.jpg`)
            const response = await fetch(image)
            const blob = await response.blob()
            await imageRef.put(blob)
            const url = await imageRef.getDownloadURL()
            blob.close()
    
            await db.Categories.SafetInstructions.updateSafetyInstruction(categoryid, id, {title, description, image: url})
            setTitle("")
            setDescription("")
            setImage("")
            setId("")
        }
    }

    return (
        <ScrollView style={styles.scrollcontainer}>
            <Text style={[styles.title, styles.mainHeader]}>Safety Instructions for {category.name}</Text>
            <Text style={{color: Colors.red50}}>{title === "" && image === "" && description === "" ? "All fields must be specified" : ""}</Text>
            <View style={styles.fieldsContainer}>
                <TextField
                    onChangeText={text => setTitle(text)}
                    hideUnderline
                    placeholder="Title..."
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={title}
                />
                <View
                    style={{
                        height: 150,
                        marginBottom: 30,
                        padding: 10,
                        backgroundColor: Colors.mainbg,
                        borderRadius: 20
                    }}
                >
                    <TextArea placeholder="Write Instruction description..." value={description} onChangeText={text => setDescription(text)} />
                </View>
                <TouchableOpacity onPress={uploadImage}>
                    <>
                        <Image
                            source={{ uri: image === "" ? "https://cdn.pixabay.com/photo/2016/06/15/14/54/download-1459071_960_720.png" : image }}
                            style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 10 }}
                        />
                        <Text style={{textAlign: 'center', marginBottom: 30}}>Upload an Image</Text>
                    </>
                </TouchableOpacity>
                <View style={styles.buttonGroup}>
                    <Button
                        label="Create"
                        style={[styles.transparentButton]}
                        labelStyle={{ color: Colors.darkprimary }}
                        onPress={() => create()}
                    />
                    <Button
                        label="Save"
                        style={[styles.transparentButton, {backgroundColor: '#f9ce7f49'}]}
                        labelStyle={{ color: Colors.secondary }}
                        onPress={() => save()}
                    />
                </View>
                {
                    instructions.map(instruction => 
                        <SafetyInstruction 
                            key={instruction.id} 
                            instruction={instruction}
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
});