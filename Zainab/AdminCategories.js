import React, { useState, useEffect } from 'react';
import { Colors } from 'react-native-ui-lib'
import { ScrollView, View } from 'react-native'
import { TextField, Button, Text, Checkbox, Assets } from 'react-native-ui-lib'
import db from '../db'
import { StyleSheet } from 'react-native';
import AdminCategory from './AdminCategory'

export default function AdminCategories() {

    useEffect(() => {
        Colors.loadColors({
            primary: '#6874e2',
            secondary: '#f9ce7f',
            mainbg: '#f5f6fa',
            sidebg: '#ffffff',
        });
    }, [Colors])

    const [categories, setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories), [])

    const [manufacturers, setManufacturers] = useState([])
    useEffect(() => db.Manufacturers.listenAll(setManufacturers), [])

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [description, setDescription] = useState("")
    const [mansList, setMansList] = useState([])

    const edit = (category) => {
        setId(category.id)
        setName(category.name + "")
        setDescription(category.description + "")
        setUrl(category.url + "")
        setMansList(category.manufacturers)
    }

    const save = async () => {
        if (id !== "" && name !== "" && description !== "" && url !== "") {
            await db.Categories.update({ id, name, description, url, manufacturers: mansList })
            setName("")
            setDescription("")
            setUrl("")
            setMansList([])
        }
    }

    const create = async () => {
        if (name !== "" && description !== "" && url !== "") {
            if (categories.filter(c => c.name === name).length === 0) {
                await db.Categories.create({ name, description, url, manufacturers: mansList })
                setName("")
                setDescription("")
                setUrl("")
                setMansList([])
            }
        }
    }

    const remove = async (id) => {
        await db.Categories.remove(id)
    }

    const addMan = (manid) => {
        if(mansList.find(m => m === manid)) {
            setMansList(mansList.filter(m => m !== manid))
        }
        else {
            setMansList([...mansList, manid])
        }
    }

    console.log(mansList)

    return (
        <ScrollView style={{ backgroundColor: Colors.sidebg }}>
            <View style={styles.fieldsContainer}>
                <TextField
                    onChangeText={text => setName(text)}
                    hideUnderline
                    placeholder="Category Name"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={name}
                />
                <TextField
                    onChangeText={text => setDescription(text)}
                    hideUnderline
                    placeholder="Category Description"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={description}
                />
                <TextField
                    onChangeText={text => setUrl(text)}
                    hideUnderline
                    placeholder="Category Url"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={url}
                />
                {
                    manufacturers.map(man =>
                        <Checkbox
                            key={man.id}
                            label={man.name}
                            value={mansList.length > 0 ? mansList.find(man2 => man2 === man.id) !== undefined : false}
                            onValueChange={() => addMan(man.id)}
                            borderRadius={10}
                            size={20}
                            color={Colors.primary}
                            selectedIcon={Assets.icons.x}
                            style={{ margin: 5 }}
                        />
                    )
                }
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
                    <Text style={[styles.title, styles.mainHeader]}>All Categories</Text>
                    {
                        categories.map(category =>
                            <AdminCategory key={category.id} category={category} edit={edit} remove={remove} />
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
        justifyContent: "center",
        marginTop: 15
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