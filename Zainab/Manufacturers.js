import React, { useState, useEffect } from 'react';
import { Colors } from 'react-native-ui-lib'
import { ScrollView, View } from 'react-native'
import { TextField, Button, Text } from 'react-native-ui-lib'
import db from '../db'
import { StyleSheet } from 'react-native';
import Manufacturer from './Manufacturer'

export default function Manufacturers() {

    useEffect(() => {
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
    }, [Colors])

    const [manufacturers, setManufacturers] = useState([])
    useEffect(() => db.Manufacturers.listenAll(setManufacturers), [])

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [price, setPrice] = useState("")

    const edit = (manufacturer) => {
        setId(manufacturer.id)
        setName(manufacturer.name + "")
        setPrice(manufacturer.price + "")
        setUrl(manufacturer.url + "")
    }

    const save = async () => {
        if(id !== "" && name !== "" && price*1 !== 0 && url !== "") {
            await db.Manufacturers.update({id, name, price: price*1, url})
            setName("")
            setPrice("")
            setUrl("")
        }
    }

    const create = async () => {
        if(name !== "" && price*1 !== 0 && url !== "") {
            if(manufacturers.filter(c => c.name === name).length === 0) {
                await db.Manufacturers.create({name, price: price*1, url})
                setName("")
                setPrice("")
                setUrl("")
            }
        }
    }

    const remove = async (id) => {
        await db.Manufacturers.remove(id)
    }

    return (
        <ScrollView style={{ backgroundColor: Colors.sidebg }}>
            <View style={styles.fieldsContainer}>
                <TextField
                    onChangeText={text => setName(text)}
                    hideUnderline
                    placeholder="Manufacturer Name"
                    style={[styles.inputText, {backgroundColor: Colors.mainbg}]}
                    value={name}
                />
                <TextField
                    onChangeText={text => setPrice(text)}
                    hideUnderline
                    placeholder="Price"
                    style={[styles.inputText, {backgroundColor: Colors.mainbg}]}
                    value={price}
                />
                <TextField
                    onChangeText={text => setUrl(text)}
                    hideUnderline
                    placeholder="Url"
                    style={[styles.inputText, {backgroundColor: Colors.mainbg}]}
                    value={url}
                />
                <View style={styles.buttonGroup}>
                    <Button
                        label="Create"
                        style={{ marginRight: 10 }}
                        onPress={() => create()}
                    />
                    <Button
                        label="Save"
                        style={{ marginRight: 10 }}
                        onPress={() => save()}
                    />
                </View>
                <View style={styles.cardContainer}>
                    <Text style={[styles.title, styles.mainHeader]}>All Manufacturers</Text>
                    {
                        manufacturers.map(manufacturer =>
                            <Manufacturer key={manufacturer.id} manufacturer={manufacturer} edit={edit} remove={remove}/>
                        )
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mainbg
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    fieldsContainer: {
        margin: 20
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    buttonGroup: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    mainHeader: {
        color: Colors.primary,
        margin: 40
    },
    card: {
        padding: 20,
        backgroundColor: "#ffffff",
        margin: 20,
        width: 350,
        textAlign: "center",
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
    }
});