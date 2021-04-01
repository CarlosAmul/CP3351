import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native'
import { Card, Colors, Button, View, Text, Chip } from 'react-native-ui-lib'
import db from '../../db'
import FitnessTip from './FitnessTip'

export default function FitnessTips({ navigation }) {

    Colors.loadColors({
        primary: '#6874e2',
        secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
        sidebg: '#ffffff',
    });

    const [approvedTips, setApprovedTips] = useState([])
    useEffect(() => db.FitnessTips.listenToApprovedTips(setApprovedTips), [])

    return (
        <View>
            <Text style={[styles.title, styles.mainHeader]}>See valuable fitness tips given by our customers</Text>
            <ScrollView horizontal={true}>
                {
                    approvedTips.slice(0, 2).map(tip =>
                        <FitnessTip key={tip.id} tip={tip} />
                    )
                }
                <Button
                    onPress={() => navigation.navigate('ApprovedFitnessTipsScreen', { approvedTips: approvedTips })}
                    label="View All"
                    labelStyle={{ color: "#ff466a" }}
                    style={[styles.transparentButton, { margin: 20, height: 50, marginTop: 120, marginLeft: 0}]}
                />
            </ScrollView>
        </View>
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
        padding: 20
    }
})