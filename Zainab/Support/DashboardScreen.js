import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import {Card, Colors} from 'react-native-ui-lib'
import { MaterialIcons } from '@expo/vector-icons';
import db from '../../db'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {BarChart} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import * as Progress from 'react-native-progress';

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {

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

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const chartConfig = {
        backgroundGradientFrom: "#FFDFF1",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFDFF1",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `${Colors.primary}`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1
        //seShadowColorFromDataset: false // optional
    };

    const [users, setUsers] = useState([])
    useEffect(() => db.Users.listenToUsersByRole(setUsers, 'Customer'), [])

    const [allTips, setAllTips] = useState([])
    useEffect(() => db.FitnessTips.listenAll(setAllTips), [])

    const [approvedTips, setApprovedTips] = useState([])
    useEffect(() => db.FitnessTips.listenToApprovedTips(setApprovedTips), [])

    const [disapprovedTips, setDisapprovedTips] = useState([])
    useEffect(() => db.FitnessTips.listenToDisapprovedTips(setDisapprovedTips), [])

    const [faqs, setFaqs] = useState([])
    useEffect(() => db.FAQs.listenAll(setFaqs), [])

    const [answeredFaqs, setAnsweredFaqs] = useState([])
    useEffect(() => db.FAQs.listenAllAnswered(setAnsweredFaqs), [])

    return (
        <ScrollView contentContainerStyle={[styles.container, {backgroundColor: Colors.sidebg}]}>
            <View style={styles.figuresContainer}>
                <Card style={[styles.card, {borderBottomWidth: 3, borderBottomColor: Colors.primary}]} elevation={15}>
                    <MaterialIcons name="approval" size={45} color={Colors.primary} />
                    <Text style={[styles.title, {color: Colors.primary}]}>Approved Tips</Text>
                    <Text style={[styles.numberTitle]}>{approvedTips.length}</Text>
                </Card>
                <Card style={[styles.card, {borderBottomWidth: 3, borderBottomColor: Colors.darkprimary}]} elevation={15}>
                    <FontAwesome name="users" size={45} color={Colors.darkprimary} />
                    <Text style={[styles.title, {color: Colors.darkprimary}]}>Customers</Text>
                    <Text style={[styles.numberTitle]}>{users.length}</Text>
                </Card>
            </View>
            <View style={styles.figuresContainer}>
                <Card style={[styles.card, {borderBottomWidth: 3, borderBottomColor: Colors.secondary}]} elevation={15}>
                    <MaterialIcons name="do-not-touch" size={45} color={Colors.secondary} />
                    <Text style={[styles.title, {color: Colors.secondary}]}>Disapproved Tips</Text>
                    <Text style={[styles.numberTitle]}>{disapprovedTips.length}</Text>
                </Card>
                <Card style={[styles.card, {borderBottomWidth: 3, borderBottomColor: Colors.green30}]} elevation={15}>
                    <MaterialCommunityIcons name="comment-question" size={45} color={Colors.green30} />
                    <Text style={[styles.title, {color: Colors.green30}]}>FAQs</Text>
                    <Text style={[styles.numberTitle]}>{faqs.length}</Text>
                </Card>
            </View>
            <Text style={[styles.title, {color: Colors.grey30}]}>Total Approved Tips {approvedTips.length} / {allTips.length}</Text>
            {/* <Progress.Bar 
                progress={approvedTips.length / allTips.length} 
                width={300} 
                color={Colors.darkprimary}
                unfilledColor="#ff467720" 
                borderWidth={0} 
                height={7} 
                style={{marginTop: -20}}
            />
            <Text style={[styles.title, {color: Colors.grey30}]}>Total FAQs Answered {answeredFaqs.length} / {faqs.length}</Text>
            <Progress.Bar 
                progress={answeredFaqs.length / faqs.length} 
                width={300} 
                color={Colors.blue30}
                unfilledColor={Colors.blue70} 
                borderWidth={0} 
                height={7} 
                style={{marginTop: -20}}
            /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    card: {
        padding: 20,
        backgroundColor: "#ffffff",
        margin: 20,
        width: "40%",
        textAlign: "center",
        flexDirection: 'column',
        height: 160,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightCardView: {
        width: "50%",
        textAlign: "center",
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    leftCardView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    figuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    leftCardView: {
        width: "100%"
    },
    rightCardView: {
        width: "100%"
    },
    numberTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.grey30
    },
    graphContainer: {
        margin: 10,
        marginLeft: 10,
        marginRight: 10
    }
});
