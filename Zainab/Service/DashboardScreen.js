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
const screenWidth = Dimensions.get("window").width;
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function DashboardScreen() {

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

    const [categories, setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories), [])

    const [users, setUsers] = useState([])
    useEffect(() => db.Users.listenToUsersByRole(setUsers, 'Customer'), [])

    const [safetyInstructions, setSafetyInstructions] = useState([])
    useEffect(() => db.Categories.SafetInstructions.listenToAllSafetyInstructions(setSafetyInstructions), [])

    const [supportCenters, setSupportCenters] = useState([])
    useEffect(() => db.SupportCenters.listenAll(setSupportCenters), [])
    
    const [pendingInstalls, setPendingInstalls] = useState([])
    useEffect(() => db.Sensors.Installations.listenToAllPendings(setPendingInstalls), [])

    return (
        <ScrollView contentContainerStyle={[styles.container, {backgroundColor: Colors.sidebg}]}>
            <View style={styles.figuresContainer}>
                <Card style={[styles.card, {borderBottomWidth: 3, borderBottomColor: Colors.primary}]} elevation={15}>
                    <AntDesign name="Safety" size={45} color={Colors.primary} />
                    <Text style={[styles.title, {color: Colors.primary}]}>Safety Instructions</Text>
                    <Text style={[styles.numberTitle]}>{safetyInstructions.length}</Text>
                </Card>
                <Card style={[styles.card, {borderBottomWidth: 3, borderBottomColor: Colors.darkprimary}]} elevation={15}>
                    <FontAwesome name="users" size={45} color={Colors.darkprimary} />
                    <Text style={[styles.title, {color: Colors.darkprimary}]}>Customers</Text>
                    <Text style={[styles.numberTitle]}>{users.length}</Text>
                </Card>
            </View>
            <View style={styles.figuresContainer}>
                <Card style={[styles.card, {borderBottomWidth: 3, borderBottomColor: Colors.secondary}]} elevation={15}>
                    <FontAwesome5 name="building" size={45} color={Colors.secondary} />
                    <Text style={[styles.title, {color: Colors.secondary}]}>Support Centers</Text>
                    <Text style={[styles.numberTitle]}>{supportCenters.length}</Text>
                </Card>
                <Card style={[styles.card, {borderBottomWidth: 3, borderBottomColor: Colors.green30}]} elevation={15}>
                    <MaterialIcons name="pending" size={45} color={Colors.green30} />
                    <Text style={[styles.title, {color: Colors.green30}]}>Pending Installs</Text>
                    <Text style={[styles.numberTitle]}>{pendingInstalls.length}</Text>
                </Card>
            </View>
            <View style={styles.graphContainer}>
                <Text style={[styles.title, {color: Colors.grey30, fontSize: 16, marginBottom: 10}]}>Safety Instructions by Category</Text>
                <BarChart
                    data={{
                        labels: categories.map(c => c.name),
                        datasets: [
                            {
                                data: categories.map(c => safetyInstructions.filter(s => s.parentId === c.id).length)
                            }
                        ]
                    }}
                    width={screenWidth - 40}
                    height={300}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    withInnerLines={false}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
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
