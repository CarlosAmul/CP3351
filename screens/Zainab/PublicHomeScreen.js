import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import { Colors } from 'react-native-ui-lib'
import Categories from './Categories'
import MostFavorite from './MostFavorite'
import Ad from '../../Carlos/Ad'
import db from '../../db';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PublicHomeScreen(props) {
    const stacknavigation = props.navigation

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    }, [navigation]);

    Colors.loadColors({
        primary: '#6874e2',
        secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
        sidebg: '#ffffff',
    });

    const [ads, setAds] = useState([])
    const [ad, setAd] = useState(null)

    useEffect(() => db.Ads.listenAllActive(setAds), [])
    useEffect(() => setAd(ads[Math.floor(Math.random() * ads.length)]), [ads]
    )
    ad && console.log(ad.endDate.toDate() > new Date())

    const onPress = () => {
        navigation.navigate(ad.screen, { screen: ad.screen + "Screen" })
    }

    return (
        <ScrollView style={styles.scrollcontainer}>
            {
                ad ?
                    <TouchableOpacity onPress={onPress}>
                        <Ad ad={ad} styling={{ margin: 20, marginBottom: 0 }} />
                    </TouchableOpacity>
                    :
                    <View style={[{ borderWidth: 1, borderColor: 'black', alignItems: 'center', borderRadius: 10, margin: 20, marginBottom: 0  }]} >
                        <View style={{ width: '50%', margin: 5, padding: 5, textAlign: 'center' }}>
                            <Text text40 style={{ color: Colors.grey20, alignSelf: 'center' }}>No Ad Available</Text>
                        </View>
                    </View>
            }
            <Categories stacknavigation={stacknavigation} />
            <MostFavorite />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
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
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#ffffff',
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