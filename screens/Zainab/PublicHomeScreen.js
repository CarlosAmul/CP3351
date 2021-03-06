import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '../../components/Themed';
import UserContext from '../../UserContext'
import { Text } from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import { Card, Colors } from 'react-native-ui-lib'

export default function PublicHomeScreen() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    Colors.loadColors({
        primary: '#6874e2',
        basic: '#f5f6fa',
        white: '#ffffff'
    });

    const { user } = useContext(UserContext)

    const [categories, setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories), [])

    return (
        <ScrollView style={styles.scrollcontainer}>
            <View style={styles.container}>
                <Text style={[styles.title, styles.mainHeader]}>
                    Sensor Categories
                </Text>
                <ScrollView style={styles.subcontainer} horizontal={true}>
                    {
                        categories.map(category =>
                            <Card key={category.id}
                                borderRadius={10}
                                style={styles.card}
                            >
                                <Card.Image
                                    style={styles.cardimg}
                                    source={{uri: "https://help.apple.com/assets/5FC7E0F6680CE2AB1DD5C9B5/5FC7E100680CE2AB1DD5C9CD/en_US/eb91e3ce332fd07b4eeeb3d462066ffe.png"}}
                                />
                                <Card.Section
                                    content={[{ text: category.name, text70: true, dark10: true }]}
                                    backgroundColor={Colors.white}
                                />
                            </Card>
                        )
                    }
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        alignItems: "center",
    },
    subcontainer: {
        display: 'flex',
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
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
    subcontainer: {

    },
    mainHeader: {
        color: "#6874e2",
        margin: 40
    },
    card: {
        padding: 20,
        backgroundColor: "#ffffff",
        margin: 20,
        width: 150,
        textAlign: "center"
    },
    cardimg: {
        width: 120,
        height: 120
    }
});