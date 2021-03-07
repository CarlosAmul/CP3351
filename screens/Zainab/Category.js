import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import { Card, Colors, Button, View, Text } from 'react-native-ui-lib'
import { AntDesign } from '@expo/vector-icons'
import UserContext from '../../UserContext'
import db from '../../db'

export default function Category({ category, onPress }) {

    const { user } = useContext(UserContext)

    const [userCatFavs, setuserCatFavs] = useState([])
    useEffect(() => db.Categories.Favorites.listenToCatgoryFavsByUser(setuserCatFavs, category?.id || "", user?.id || ""), [category, user])

    const favCat = async () => {
        if (userCatFavs.length === 0) {
            await db.Categories.Favorites.addFav(category.id, { userid: user.id, when: new Date() })
        }
        else {
            await db.Categories.Favorites.removeFavs(category.id, userCatFavs[0].id)
        }
    }

    const [catFavs, setCatFavs] = useState([])
    useEffect(() => db.Categories.Favorites.listenToCategoryFavs(setCatFavs, category?.id || ""), [category])

    return (
        <Card key={category.id}
            borderRadius={10}
            style={styles.card}
        >
            <View style={styles.leftCardView}>
                <Card.Image
                    style={styles.cardimg}
                    source={{ uri: "https://help.apple.com/assets/5FC7E0F6680CE2AB1DD5C9B5/5FC7E100680CE2AB1DD5C9CD/en_US/eb91e3ce332fd07b4eeeb3d462066ffe.png" }}
                />
                <Card.Section
                    content={[{ text: category.name, text60M: true, dark10: true }]}
                    backgroundColor={Colors.white}
                />
                <Button
                    style={styles.iconButton}
                    onPress={() => favCat()}
                    label={
                        userCatFavs.length > 0 ?
                            <AntDesign name="heart" size={24} color="#fa1a65" />
                        :
                            <AntDesign name="hearto" size={24} color="#fa1a65" />
                    }
                />
                <Button
                    style={styles.iconButton}
                    onPress={onPress}
                    label={<Text style={styles.buttonText}>{catFavs.length} favs </Text>}
                />
            </View>
            <View style={styles.rightCardView}>
                <Text>Category Description</Text>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
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
    leftCardView: {
        width: "50%",
    },
    rightCardView: {
        width: "50%",
    },
    cardimg: {
        width: 120,
        height: 120
    },
    iconButton: {
        backgroundColor: 'transparent',
        width: 0
    },
    buttonText: {
        color: '#fa1a65'
    }
})