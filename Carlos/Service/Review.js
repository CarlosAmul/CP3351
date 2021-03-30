import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../UserContext'
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import { Card, Button, Text } from 'react-native-ui-lib'
import { Directions } from 'react-native-gesture-handler';

export default function ReviewsScreen({ review }) {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });
    

    const [user, setUser] = useState(null)
    useEffect(() => db.Users.listenOne(setUser, review.parent), [])

    const [req, setReqs] = useState([])
    useEffect(() => db.Sensors.Installations.listenOne(setReqs, review.jobid), [])

    const linkToDetails = () => {
        console.log(req)
        navigation.navigate("DetailsScreen", { request: req })
    } 
    return (
        <Card
            row
            enableShadow
            key={review.id}
            style={[styles.card]}
        >
            <View style={{ flexDirection: 'column' }}>
                <View style={{ margin: 5, padding: 5, textAlign: 'center' }}>
                    <Text text70 grey10>{review.comment}</Text>
                    <Text text80 grey20>{user ? 'Review by ' + user.name : 'unknown'}</Text>
                    <Text text80 grey20>{review.when.toDate().toString()}</Text>
                </View>
                <View style={{ flex: 1,  flexDirection: 'row'}}>
                    <Button label="Installation Details"
                        style={{width: '98%', margin: 5, alignSelf: "center"}}
                    // backgroundColor={Colors.primary}
                    onPress={linkToDetails}
                    />
                </View>
            </View>


            {/* <Card.Section
                content={[
                    { text: review.comment, text70: true, grey10: true },
                    { text: user ? 'Review by ' + user.name : '', text80: true, grey20: true },
                    { text: review.when.toDate().toString(), text80: true, grey20: true },
                ]}
                style={{ padding: 20, flex: 1 }}
            /> */}

        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifContainer: {
        flex: 1
    },
    card: {
        padding: 20,
        margin: 5,
        borderWidth: 2,
        borderColor: 'lightgray',
        color: 'red'
    },
    cardRead: {
        backgroundColor: 'lightgray',
        color: 'black'
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
});
