import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from '../../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Image, TextArea } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import MenuIcon from '../../../components/MenuIcon'
import DashboardCategory from './DashboardCategory'
import DashboardAd from './DashboardAd'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib'
import * as ImagePicker from 'expo-image-picker';
import fb from '../../../fb'
import db from '../../../db';


export default function AdForm({ navigation: { goBack }, route }) {

    // console.log('ad', route.params.ad)
    const [url, setUrl] = useState(route.params.ad ? route.params.ad.image : '')
    const [title, setTitle] = useState(route.params.ad ? route.params.ad.title : '')
    const [description, setDescription] = useState(route.params.ad ? route.params.ad.description : '')

    const uploadImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })

        if (!image.cancelled) {

            // image's name = date & time
            const when = new Date()
            const imageName = when.toISOString()
            const imageRef = fb.storage().ref(`ads/${imageName}.jpg`)

            const response = await fetch(image.uri)
            const blob = await response.blob()
            await imageRef.put(blob)
            const url = await imageRef.getDownloadURL()
            blob.close()
            setUrl(url)
        }
    }

    const createAd = async () => {
        if(!route.params.ad){
            await db.Ads.create({ title, description, image: url })
        }
        else {
            await db.Ads.update({ id: route.params.ad.id, title, description, image: url })
        }
        goBack()
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text text70 style={{ color: Colors.primary, marginBottom: 10 }}>Image</Text>
                    <Image
                        source={url == '' ? require('../../../assets/images/placeholderImage.jpg') : { uri: url }}
                        style={styles.cardimg}
                        resizeMode="contain"
                    />

                    {/* <TextInput style={styles.input} onChange={value => setEnterURL(value)} value={enterURL} placeholder='Paste URL here...' /> */}
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', marginTop: 20 }}>
                        <Button
                            backgroundColor={Colors.primary}
                            label="Change Image"
                            labelStyle={{ fontWeight: '100' }}
                            style={[styles.button]}
                            enableShadow
                            onPress={() => uploadImage()}
                        />
                        <Button
                            backgroundColor={Colors.primary}
                            label="Remove"
                            labelStyle={{ fontWeight: '100' }}
                            style={styles.button}
                            enableShadow
                            onPress={() => setUrl('')}
                        />
                    </View>
                    <Text text70 style={{ color: Colors.primary, marginBottom: 10 }}>Title</Text>
                    <TextInput value={title} onChangeText={value => setTitle(value)} style={styles.input} placeholder='Enter title here...' />
                    <Text text70 style={{ color: Colors.primary, marginTop: 20 }}>Description</Text>
                    <View style={[styles.textAreaContainer, { margin: 10, height: 150 }]}>
                        <TextArea
                            style={{ marginBottom: 20 }}
                            placeholder="Enter description here.."
                            value={description} onChangeText={value => setDescription(value)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
                        <Button
                            backgroundColor={Colors.primary}
                            label="Submit"
                            labelStyle={{ fontWeight: '100' }}
                            style={[styles.button]}
                            enableShadow
                            onPress={() => createAd()}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>


    )
}
const styles = StyleSheet.create({
    cardimg: {
        flex: 1,
        width: null,
        height: null
    },
    button: {
        marginBottom: 10,
        borderRadius: 5
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
        justifyContent: 'center'
    },
    cardimg: {
        width: 400,
        height: 120
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20
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
