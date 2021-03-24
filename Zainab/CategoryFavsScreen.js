import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import UserContext from '../UserContext'
import db from '../db'
import Favorite from './Favorite'

export default function CategoryFavsScreen({ route }) {
    const { category } = route.params
    const { user } = useContext(UserContext)

    const [catFavs, setCatFavs] = useState([])
    useEffect(() => db.Categories.Favorites.listenToCategoryFavs(setCatFavs, category?.id || ""), [category])

    return (
        <ScrollView style={styles.scrollcontainer}>
            <Text style={[styles.mainHeader, styles.title]}>Favorites for {category.name}</Text>
            {
                catFavs.map(fav => (
                    <Favorite key={fav.id} favorite={fav} />
                ))
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