import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../UserContext'
import MenuIcon from '../components/MenuIcon'
import db from '../db'
import { Card } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Colors as CustomColors } from 'react-native-ui-lib';

export default function ReviewsScreen({review}) {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const [user, setUser] = useState(null)
    useEffect(() => db.Users.listenOne(setUser, review.parent), [])

    return (
        <Card
            row
            enableShadow
            key={review.id}
            style={[styles.card]}
        >
            <Card.Section
                content={[
                    { text: review.comment, text70: true, grey10: true },
                    { text: user ? 'Review by ' + user.name: '', text80: true, grey20: true },
                    { text: review.when.toDate().toString(), text80: true, grey20: true },
                ]}
                style={{ padding: 20, flex: 1 }}
            />
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
