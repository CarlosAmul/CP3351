import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-ui-lib'
import UserContext from '../../UserContext'
import db from '../../db'
import {Avatar} from 'react-native-ui-lib'
import { Colors } from 'react-native-ui-lib'

export default function CategoryFavsScreen({ favorite }) {

    const [fuser, setFuser] = useState(null)
    useEffect(() => db.Users.listenOne(setFuser, favorite?.userid || ""), [favorite])

    Colors.loadColors({
        primary: '#6874e2',
		secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
		sidebg: '#ffffff',
    });

    return (
        <ListItem 
            key={favorite.id} 
            middle 
            style={styles.listItem}
            underlayColor={Colors.primary}
            height={70}
        >
            <ListItem.Part left>
                <Text>{fuser?.name || ""}</Text>
            </ListItem.Part>
            <ListItem.Part middle>
                <Text>
                    {favorite.when.toLocaleDateString() }
                </Text>
            </ListItem.Part>
            <ListItem.Part right>
                <Avatar
                    source={{uri: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png"}} 
                    size={60}
                />
            </ListItem.Part>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mainHeader: {
        color: "#6874e2",
        margin: 40,
        textAlign: "center"
    },
    listItem: {
        padding: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "#f9ce7f"
    }
})