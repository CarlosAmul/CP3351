import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import { Card, Colors, Button, View, Text } from 'react-native-ui-lib'
import db from '../../db'
import { Entypo } from '@expo/vector-icons';

export default function MostFavorite() {
    
    Colors.loadColors({
        primary: '#6874e2',
		secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
		sidebg: '#ffffff',
    });

    const [allFavs, setAllFavs] = useState([])
    useEffect(() => db.Categories.Favorites.listenToAllFavs(setAllFavs), [])

    const [categories, setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories), [allFavs])

    return ( 
        <>   
            <Text style={[styles.title, styles.mainHeader]}>Most Favorite Caetgory</Text>
            <Card
                borderRadius={10}
                style={styles.card}
                elevation={15}
            >
                <View style={styles.leftCardView}>
                    {
                        allFavs.length > 0 ?
                                <Card.Image
                                    style={styles.cardimg}
                                    source={{ uri: categories.reduce((first, second) => allFavs.filter(f => f.parentId === first.id).length > allFavs.filter(f => f.parentId === second.id).length ? first : second ).url}}
                                />
                            :
                                <Card.Image
                                    style={styles.cardimg}
                                    source={{ uri: "Loading..."}}
                                />
                    }
                </View>
                <View style={styles.rightCardView}>
                    <Entypo name="trophy" size={50} color={Colors.secondary} />
                    {
                        allFavs.length > 0 && categories.length > 0 ?
                            <Card.Section
                                content={[{ text: categories.reduce((first, second) => allFavs.filter(f => f.parentId === first.id).length > allFavs.filter(f => f.parentId === second.id).length ? first : second).name, text60M: true, dark10: true, marginT: 20 }]}
                                backgroundColor={Colors.white}
                            />
                        :
                            <Card.Section
                                content={[{ text: "Nothin yet...", text60M: true, dark10: true, marginT: 20 }]}
                                backgroundColor={Colors.white}
                            />
                    }
                </View>
            </Card>
        </>
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
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    },
    mainHeader: {
        color: "#6874e2",
        margin: 40
    }
})