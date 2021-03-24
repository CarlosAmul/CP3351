import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, Text, Image } from 'react-native';
import { View, Colors, Card, Button } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../components/MenuIcon'
import db from '../db';
import CustomerReward from './CustomerReward'
import UserContext from '../UserContext'

export default function CustomerRewardsScreen() {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

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

    const [rewards, setRewards] = useState([])
    useEffect(() => db.Rewards.listenAll(setRewards), [])

    const {user} = useContext(UserContext)

    return (
        <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ alignItems: 'center' }}>
            <Card
                borderRadius={25}
                style={[styles.card, { backgroundColor: "#0df5e226", borderBottomRightRadius: 0 }]}
                enableShadow={false}
            >
                <View style={styles.leftCardVew}>
                    <Text style={[styles.title, { color: Colors.darkprimary }]}>FitIoT Rewards</Text>
                    <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Our customers enjoy rewards!</Text>
                    {
                        user
                        &&
                        <Text style={{ color: Colors.secondary, fontWeight: 'bold', fontSize: 16 }}>{user.points} points in wallet</Text>
                    }
                </View>
                <View style={styles.rightCardView}>
                    <Image
                        source={require("../assets/images/admin-reward.png")}
                        style={{ width: 100, height: 150 }}
                    />
                </View>
            </Card>
            <Text style={[styles.title, styles.mainHeader, { marginTop: -5, marginBottom: 15 }]}>Buy from us and get the rewards</Text>
            {
                user
                &&
                <Button
                    label="My Rewards"
                    labelStyle={{ color: "#ff466a" }}
                    style={[styles.transparentButton]}
                    onPress={() => navigation.navigate('RewardsHistoryScreen')}
                />
            }
            {
                rewards.map(reward =>
                    <CustomerReward
                        key={reward.id}
                        reward={reward}
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
