import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, Text, Image } from 'react-native';
import { View, Colors, Card } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../components/MenuIcon'
import db from '../db';
import CustomerAddedReward from './CustomerAddedReward'
import UserContext from '../UserContext'

export default function RewardsHistoryScreen() {

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

    const [userRewards, setUserRewards] = useState([])
    useEffect(() => db.Users.CustomerRewards.listenToUserRewards(setUserRewards, user?.id || ""), [user])
    
    return (
        <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ alignItems: 'center' }}>
            <Text style={[styles.title, styles.mainHeader]}>Your Rewards</Text>
            {
                userRewards.map(customerreward =>
                    <CustomerAddedReward
                        key={customerreward.id}
                        customerreward={customerreward}
                    />
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    card: {
        padding: 20,
        margin: 20,
        width: 380,
        textAlign: "center",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        color: "#ff466a",
        margin: 10
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    radioGroup: {
        borderRadius: 20,
        padding: 10,
        width: 350,
    },
    fieldsContainer: {
        marginLeft: 30,
        marginRight: 30
    },
});
