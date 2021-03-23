import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../components/MenuIcon'
import { Colors, Card, Carousel, Button } from 'react-native-ui-lib'
import Categories from './Categories'
import MostFavorite from './MostFavorite'
import FitnessTips from './FitnessTips'
import CustomerHiring from './CustomerHiring'

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
        darkprimary: '#ff466a',
        darksecondary: '#0df5e3',
        darkmainbg: '#201a31',
        darksidebg: '#38304d'
    });

    return (
        <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ alignItems: 'center' }}>
            <Card
                borderRadius={20}
                style={styles.card}
                enableShadow={false}
            >
                <View style={styles.leftCardVew}>
                    <Text style={[styles.title, { color: Colors.darkprimary }]}>Welcome to FitIoT</Text>
                    <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Be smart in your fitness!</Text>
                </View>
                <View style={styles.rightCardView}>
                    <Image
                        source={require("../assets/images/sensor-vector.png")}
                        style={{ width: 150, height: 150 }}
                    />
                </View>
            </Card>
            <Carousel
                containerStyle={{
                    height: 250,
                    width: "90%",
                    margin: 20
                }}
                loop
                pageControlProps={{
                    size: 10,
                    containerStyle: styles.loopCarousel
                }}
                pageControlPosition={Carousel.pageControlPositions.OVER}
                autoplay={true}
                containerPaddingVertical={10}
            >
                <View centerV key={0}>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={require("../assets/images/fitness-tracker1.jpg")}
                    />
                </View>
                <View centerV key={1}>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={require("../assets/images/fitness-tracker2.jpg")}
                    />
                </View>
                <View centerV key={2}>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={require("../assets/images/fitness-tracker3.jpg")}
                    />
                </View>
            </Carousel>
            <Categories stacknavigation={stacknavigation} />
            <MostFavorite />
            <CustomerHiring navigation={navigation}/>
            <FitnessTips navigation={navigation} />
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
        fontWeight: 'bold'
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
        backgroundColor: "#ff467720",
        margin: 20,
        width: 380,
        textAlign: "center",
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});