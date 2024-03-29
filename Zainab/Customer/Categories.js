import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '../../components/Themed';
import UserContext from '../../UserContext'
import { Text } from 'react-native-ui-lib'
import db from '../../db'
import { Colors } from 'react-native-ui-lib'
import Category from './Category'

export default function Categories({navigation}) {
    
    Colors.loadColors({
        primary: '#6874e2',
		secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
		sidebg: '#ffffff',
    });

    const { user } = useContext(UserContext)

    const [categories, setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories), [])

    const onPress = (category) => {
        user ? 
            navigation.navigate("CategoryFavsScreen", {category: category})
        :
            navigation.navigate("LoginRegister")
    }

    const onPressBuy = (category) => {
        user ? 
            navigation.navigate("PaymentFormScreen", {category: category})
        :
            navigation.navigate("LoginRegister")
    }

    const onPressSafety = (category) => {
        navigation.navigate("CustomerSafetyInstructionsScreen", {categoryid: category.id})
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.mainHeader]}>
                Sensor Categories
            </Text>
            <ScrollView style={styles.subcontainer}>
                {
                    categories.map(category =>
                        <Category key={category.id} category={category} onPressFav={() => onPress(category)} onPressBuy={() => onPressBuy(category)} onPressSafety={() => onPressSafety(category)} />
                    )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    scrollcontainer: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
    },
    subcontainer: {
        display: 'flex',
        width: "100%"
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
    }
});