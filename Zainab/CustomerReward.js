import React, { useContext } from 'react';
import { Colors } from 'react-native-ui-lib'
import { View } from 'react-native'
import { Text, Card, Button, } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native';
import UserContext from '../UserContext'
import * as Progress from 'react-native-progress';
import db from '../db'

export default function CustomerReward({ reward }) {

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

    const updatePoints = async () => {
        await db.Users.updatePoints(user.id, user.points - reward.points)
        await db.Users.CustomerRewards.createReward(user.id, {rewardid: reward.id, redeem: false})
    }

    return (
        <Card
            borderRadius={12}
            style={styles.card}
            elevation={15}
        >
            <View style={styles.leftCardView}>
                <Card.Image
                    style={styles.cardimg}
                    source={{ uri: reward.image }}
                />
            </View>
            <View style={styles.rightCardView}>
                <Text style={[styles.title, styles.cardText, { textAlign: 'left', fontSize: 16 }]}>{reward.title}</Text>
                <Text style={styles.cardText}>{reward.description}</Text>
                <Text style={[{ color: Colors.sidebg, backgroundColor: Colors.secondary, marginTop: -30 }, styles.cardText, styles.points]}>{reward.points} points</Text>
                {
                    user &&
                    user.points >= reward.points ?
                        <Button
                            label="Redeem"
                            backgroundColor={Colors.green70}
                            color={Colors.green10}
                            labelStyle={{fontSize: 14}}
                            style={{padding: 0, marginTop: -30}}
                            onPress={() => updatePoints()}
                        />
                    :
                        null
                }
                {
                    user
                    &&
                    <Progress.Bar 
                        progress={user.points / reward.points} 
                        width={100} color={Colors.darkprimary} 
                        unfilledColor="#ff467720" 
                        borderWidth={0} 
                        height={4} 
                        style={{marginBottom: -15}}
                    />
                }
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mainbg
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    fieldsContainer: {
        margin: 20
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "center"
    },
    mainHeader: {
        color: Colors.primary,
        margin: 40
    },
    card: {
        padding: 20,
        backgroundColor: "#ffffff",
        margin: 20,
        width: 350,
        textAlign: "center",
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 250
    },
    cardimg: {
        width: 120,
        height: 120,
        marginBottom: 10
    },
    rightCardView: {
        width: "50%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    leftCardView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondaryBtn: {
        width: 50,
        backgroundColor: Colors.secondary,
        marginBottom: 10
    },
    cardText: {
        marginBottom: 30
    },
    points: {
        padding: 5,
        borderRadius: 15,
        margin: 10
    }
});