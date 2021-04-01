import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import { Card, Colors, Button, View, Text } from 'react-native-ui-lib'
import { AntDesign } from '@expo/vector-icons'
import UserContext from '../../UserContext'
import db from '../../db'

export default function Category({ category, onPressFav, onPressBuy, onPressSafety }) {

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
            elevation={15}
        >
            <View style={styles.leftCardView}>
                <Card.Image
                    style={styles.cardimg}
                    source={{ uri: category.url }}
                />
                <Card.Section
                    content={[{ text: category.name + " QAR " + category.price, text60M: true, dark10: true }]}
                    backgroundColor={Colors.white}
                />
                {
                    user
                    &&
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
                }
                <Button
                    style={styles.iconButton}
                    onPress={onPressFav}
                    label={<Text style={styles.buttonText}>{catFavs.length} favs </Text>}
                />
            </View>
            <View style={styles.rightCardView}>
                <Text>{category.description} </Text>
                <Button
                    label="Buy sensor"
                    labelStyle={{ color: "#ff466a" }}
                    style={[styles.transparentButton]}
                    onPress={onPressBuy}
                />
                <Button
                    label="Safety Instructions"
                    style={[styles.transparentButton, { backgroundColor: '#f9ce7f49' }]}
                    labelStyle={{ color: Colors.secondary }}
                    onPress={onPressSafety}
                />
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
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
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a"
    },
})