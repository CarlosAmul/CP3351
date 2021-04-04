import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, Image } from 'react-native';
import { View, Colors, Card, TextField, TextArea, Button, TouchableOpacity, RadioGroup, RadioButton } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import db from '../../db';
import * as ImagePicker from 'expo-image-picker';
import Reward from './Reward'
import fb from '../../fb'

export default function RewardsScreen() {

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

    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [points, setPoints] = useState("")
    const [image, setImage] = useState("")
    const [type, setType] = useState("")
    const [isDiscount, setIsDiscount] = useState(false)
    const [discount, setDiscount] = useState("")

    const [inputErrors, setInputErrors] = useState("All fields must be specified")

    const [rewards, setRewards] = useState([])
    useEffect(() => db.Rewards.listenAll(setRewards), [])

    const uploadImage = async () => {

        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })

        if (!image.cancelled) {
            setImage(Image.resolveAssetSource(image).uri)
        }
    }

    const edit = (reward) => {
        setId(reward.id)
        setTitle(reward.title)
        setDescription(reward.description)
        setPoints(reward.points + "")
        setImage(reward.image)
        if(reward.type === "Discount") {
            setIsDiscount(true)
            setDiscount(reward.discount + "")
        } else {
            setIsDiscount(false)
            setDiscount("")
        }
        setType(reward.type)
    }

    const remove = async (id) => {
        await db.Rewards.remove(id)
        setTitle("")
        setDescription("")
        setImage("")
        setPoints("")
        setId("")
        setType("")
        setDiscount("")
        setIsDiscount(false)
    }

    const create = async () => {
        if (title !== "" && description !== "" && image !== "" && points !== "" && type !== "") {
            let reward = null
            isDiscount ? 
                reward = await db.Rewards.create({ title, description, type, points: points * 1, discount: discount * 1})
            :
                reward = await db.Rewards.create({ title, description, type, points: points * 1})

            const imageRef = fb.storage().ref(`rewards/images/${reward.id}.jpg`)

            const response = await fetch(image)
            const blob = await response.blob()
            await imageRef.put(blob)
            const url = await imageRef.getDownloadURL()
            blob.close()
            isDiscount ? 
                await db.Rewards.update({ id: reward.id, title, description, type, image: url, points: points * 1, discount: discount * 1 })
            :
                await db.Rewards.update({ id: reward.id, title, description, type, image: url, points: points * 1 })

            setTitle("")
            setDescription("")
            setImage("")
            setPoints("")
            setId("")
            setIsDiscount(false)
            setDiscount("")
            setType("")
        }
    }

    const save = async () => {
        if (title !== "" && description !== "" && image !== "" && points !== "" && type !== "") {
            const imageRef = fb.storage().ref(`rewards/images/${id}.jpg`)
            const response = await fetch(image)
            const blob = await response.blob()
            await imageRef.put(blob)
            const url = await imageRef.getDownloadURL()
            blob.close()
            type === "Discount" ? 
                await db.Rewards.update({ id, title, description, image: url, type, points: points * 1, discount: discount * 1 })
            :
                await db.Rewards.update({ id, title, description, image: url, type, points: points * 1 })
            setTitle("")
            setDescription("")
            setImage("")
            setPoints("")
            setId("")
            setDiscount("")
            setIsDiscount(false)
            setType("")
        }
    }

    const showDiscountValue = (value) => {
        setType(value)
        if (value === "Discount") {
            setIsDiscount(true)
        }
        else {
            setIsDiscount(false)
        }
    }

    return (
        <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ alignItems: 'center' }}>
            <Card
                borderRadius={25}
                style={[styles.card, { backgroundColor: "#0df5e226", borderBottomRightRadius: 0 }]}
                enableShadow={false}
            >
                <View style={styles.leftCardVew}>
                    <Text style={[styles.title, { color: Colors.darkprimary }]}>FitIoT Rewards</Text>
                    <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Our customers enjoy rewards!</Text>
                </View>
                <View style={styles.rightCardView}>
                    <Image
                        source={require("../../assets/images/admin-reward.png")}
                        style={{ width: 100, height: 150 }}
                    />
                </View>
            </Card>
            <Text style={[styles.title, styles.mainHeader, { marginTop: -5, marginBottom: 15 }]}>As an admin, you manage the rewards for the customers</Text>
            <Text style={{color: Colors.red50}}>{title === "" && points === "" && description === "" && type === "" ? "All fields must be specified" : ""}</Text>
            <View style={styles.fieldsContainer}>
                <TextField
                    onChangeText={text => setTitle(text)}
                    hideUnderline
                    placeholder="Title..."
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={title}
                />
                <TextField
                    onChangeText={text => setPoints(text)}
                    hideUnderline
                    placeholder="Points..."
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={points}
                />
                <View
                    style={{
                        height: 150,
                        marginBottom: 30,
                        padding: 10,
                        backgroundColor: Colors.mainbg,
                        borderRadius: 20,
                        width: 350
                    }}
                >
                    <TextArea 
                        placeholder="Write description..." 
                        value={description} 
                        onChangeText={text => setDescription(text)} 
                        style={{marginTop: 10}}
                    />
                </View>
                <View style={[styles.radioGroup, { backgroundColor: Colors.mainbg }]}>
                    <Text style={{ marginTop: 15, fontSize: 18 }}>Reward Type</Text>
                    <RadioGroup
                        style={{ marginTop: 20 }}
                        onValueChange={value => showDiscountValue(value)}
                        initialValue={type}
                    >
                        <RadioButton
                            size={17}
                            label="Voucher"
                            value="Voucher"
                            style={{ margin: 5 }}
                        />
                        <RadioButton
                            size={17}
                            label="Discount"
                            value="Discount"
                            style={{ margin: 5 }}
                        />
                    </RadioGroup>
                    {
                        isDiscount ?
                            <TextField
                                onChangeText={text => setDiscount(text)}
                                hideUnderline
                                placeholder="Discount Value..."
                                style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                                value={discount}
                            />
                        :
                            null
                    }
                </View>
                <TouchableOpacity onPress={uploadImage}>
                    <>
                        <Image
                            source={{ uri: image === "" ? "https://cdn.pixabay.com/photo/2016/06/15/14/54/download-1459071_960_720.png" : image }}
                            style={{ width: 150, height: 150, alignSelf: 'center', marginBottom: 10, marginTop: 10 }}
                        />
                        <Text style={{ textAlign: 'center', marginBottom: 30 }}>Upload an Image</Text>
                    </>
                </TouchableOpacity>
            </View>
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
            {
                rewards.map(reward =>
                    <Reward
                        key={reward.id}
                        reward={reward}
                        edit={edit}
                        remove={remove}
                    />
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    card: {
        padding: 20,
        margin: 20,
        width: 380,
        textAlign: "center",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    scrollcontainer: {
        backgroundColor: '#ffffff',
        flex: 1,
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
