import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import UserContext from '../UserContext'
import db from '../db'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../components/MenuIcon'
import UserFavorite from './UserFavorite'

export default function UserFavoritesScreen() {
    const navigation = useNavigation();
    useEffect(() => {
		navigation.setOptions({
		  // @ts-expect-error
		  headerLeft: () => (<MenuIcon />)
		});
	});

    const {user} = useContext(UserContext)

    const [userFavs, setUserFavs] = useState([])
    useEffect(() => db.Categories.Favorites.listenToFavsByUser(setUserFavs, user?.id || ""), [user])

    console.log(userFavs)

    return (
        <ScrollView style={styles.scrollcontainer}>
            <Text style={[styles.mainHeader, styles.title]}>My Favorites</Text>
            {
                userFavs.map(fav => 
                    <UserFavorite key={fav.id} categoryid={fav.parentId} />
                )
            }
        </ScrollView>
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
    }
})