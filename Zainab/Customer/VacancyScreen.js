import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { Colors, Button, Card } from 'react-native-ui-lib'
import db from '../../db'
import Vacancy from './Vacancy'

export default function VacancyScreen({ navigation }) {

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

    const [vacancies, setVacancies] = useState([])
    useEffect(() => db.Vacancies.listenAll(setVacancies), [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card
                borderRadius={20}
                style={styles.card}
                enableShadow={false}
            >
                <View style={styles.leftCardVew}>
                    <Text style={[styles.title, { color: Colors.darkprimary }]}>We are Hiring!</Text>
                    <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Apply For Vacancies</Text>
                </View>
                <View style={styles.rightCardView}>
                    <Image
                        source={require("../../assets/images/hiring2.png")}
                        style={{ width: 170, height: 170 }}
                    />
                </View>
            </Card>
            <Text style={[styles.title, styles.mainHeader]}>We have the following vacancies</Text>
            <View style={{ width: "80%", justifyContent: 'center', alignItems: 'center' }}>
                {
                    vacancies.map(vacancy =>
                        <Vacancy
                            key={vacancy.id}
                            vacancy={vacancy}
                            navigation={navigation}
                        />
                    )
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    fieldsContainer: {
        margin: 20
    },
    container: {
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
        margin: 40,
        textAlign: 'center'
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a"
    },
    buttonGroup: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    card: {
        padding: 20,
        backgroundColor: "#f9ce7f49",
        margin: 20,
        width: 380,
        textAlign: "center",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});