import React from 'react';
import { StyleSheet } from 'react-native'
import { Card, Colors,  View,  Chip } from 'react-native-ui-lib'

import { Fontisto } from '@expo/vector-icons';

export default function FitnessTip({ tip }) {

    Colors.loadColors({
        primary: '#6874e2',
        secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
        sidebg: '#ffffff',
    });

    return (

        <Card key={tip.id} style={styles.approved} elevation={12}>
            <Card.Section
                contentStyle={{ marginBottom: 10 }}
                content={[{ text: tip.title, text50M: true, color: Colors.darkprimary, margin: 20 }]}
            />
            <Fontisto name="quote-a-right" size={15} color={Colors.secondary} style={{ marginTop: 5, marginBottom: 10 }} />
            <Card.Section
                content={[{ text: tip.description, text65M: true, color: Colors.violet50, margin: 20 }]}
            />
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                {
                    tip.tags.map((tag, index) =>
                        <Chip
                            key={index}
                            label={"#" + tag}
                            labelStyle={{ color: Colors.darksecondary }}
                            containerStyle={{ borderWidth: 0, width: 100 }}
                        />
                    )
                }
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
        margin: 40,
        marginBottom: -5
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a"
    },
    approved: {
        margin: 30,
        padding: 20,
        width: 350,
        height: 250
    }
})