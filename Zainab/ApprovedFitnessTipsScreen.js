import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { Colors, Text, TextField } from 'react-native-ui-lib'
import FitnessTip from './FitnessTip'

export default function ApprovedFitnessTipsScreen({route}) {

    const {approvedTips} = route.params

    Colors.loadColors({
        primary: '#6874e2',
        secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
        sidebg: '#ffffff',
    });

    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState(approvedTips)

    const filterTips = (searched) => {
        if(searched === "") {
            setFiltered(approvedTips)
        }
        else {
            let filteredList = []
            setSearch(searched)
            approvedTips.map(tip => {
                if(tip.tags.includes(searched)) {
                    filteredList.push(tip)
                }
            })
            setFiltered(filteredList)
        }
    }

    return (
        <ScrollView style={styles.scrollcontainer}>
            <Text style={[styles.mainHeader, styles.title]}>
                We like to keep you fit! See what tips our customers have to offer!
            </Text>
            <Image
                width={150}
                height={150}
                source={{uri: 'https://i.pinimg.com/originals/54/2e/c6/542ec68513d564e12f422d96d739da49.png'}}
            />
            <TextField
                onChangeText={text => filterTips(text)}
                hideUnderline
                placeholder="Search Tips by Tags..."
                style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                value={search}
            />
            {
                filtered.map(tip => 
                    <FitnessTip key={tip.id} tip={tip} />
                )
            }
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
        textAlign: 'center'
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
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%',
        margin: 10
    },
});