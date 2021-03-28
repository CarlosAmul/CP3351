import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../UserContext'
import MenuIcon from '../components/MenuIcon'
import db from '../db'
import { Card } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import Review from './Review'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Colors as CustomColors } from 'react-native-ui-lib';

export default function ReviewsScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const { user } = useContext(UserContext)

    const [reviews, setReviews] = useState([])
    console.log(reviews)
    useEffect(() => db.Users.Reviews.listenByRevieweeAll(user?.id || "", setReviews), [])

    return (
        <ScrollView style={styles.notifContainer}>
            {
                reviews.map(
                    review =>
                        <Review review={review}/>
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
