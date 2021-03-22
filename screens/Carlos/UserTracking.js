import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, TabBar } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import MenuIcon from '../../components/MenuIcon'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib'
import db from '../../db';
import { LineChart } from 'react-native-chart-kit';


export default function UserTracking({ user }) {

    console.log(user)

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const [trackings, setTrackings] = useState([])
    useEffect(() => db.UserTrackings.listenTrackings(user.id, setTrackings, getDay(0), getDay(7)), [user])

    const [lastLogin, setLastLogin] = useState(null)
    useEffect(() => db.UserTrackings.lastTrack(user.id, 'login', setLastLogin), [user])

    const [lastLogout, setLastLogout] = useState(null)
    useEffect(() => db.UserTrackings.lastTrack(user.id, 'logout', setLastLogout), [user])

    const [registered, setRegistered] = useState(null)
    useEffect(() => db.UserTrackings.lastTrack(user.id, 'register', setRegistered), [user])

    const [filter, setFilter] = useState('login')
    console.log(filter)

    // const [sensorCount, setSensorCount] = useState(0)
    // useEffect(() => db.Sensors.listenUserSensorCount(user.id, setSensorCount), [user])

    // const [favCount, setFavCount] = useState(0)
    // useEffect(() => db.Categories.Favorites.listenUserLikesCount(setFavCount, user.id), [user])



    function getDay(day) {
        var date = new Date();
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : day);
        return new Date(date.setDate(diff));
    }

    // trackings.length > 0 && console.log('tracking date', trackings.filter(tracking => tracking.when.toDate().toDateString() == getDay(1).toDateString()))

    return (
        <>
            <Text text60 style={{ marginTop: 20, marginBottom: 10, color: Colors.primary }}>User Tracking</Text>
            <Card
                row
                enableShadow
                style={styles.card}
            >
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ width: '100%', marginBottom: 20 }}>
                        <Text text60 style={{ textAlign: 'center', justifyContent: 'center', color: Colors.primary }}>{user.name}</Text>
                        <Text text70 style={{ textAlign: 'center', justifyContent: 'center', color: Colors.primary }}>{user.id}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ padding: 15, alignSelf: 'center', alignItems: 'center', width: '44%', borderWidth: 1, borderRightWidth: 0, borderColor: Colors.primary, backgroundColor: Colors.purple80, borderRadius: 10 }}>
                            <Text text70 style={{ color: Colors.primary }}>Name</Text>
                            <Text text80 style={{ color: Colors.black }}>{user.name}</Text>
                            <Text text70 style={{ color: Colors.primary }}>Registered</Text>
                            <Text text80 style={{ color: Colors.black }}>{registered ? registered.when.toDate().toDateString().slice(4) : 'Loading...'}</Text>
                            <Text text70 style={{ color: Colors.primary }}>Role</Text>
                            <Text text80 style={{ color: Colors.black }}>{user.role}</Text>
                        </View>
                        <View style={{ paddingTop: 15, paddingBottom: 15, alignSelf: 'center', alignItems: 'center', width: '55%', borderWidth: 1, borderColor: Colors.primary, borderRadius: 10 }}>
                            <Text text70 style={{ color: Colors.primary }}>Logins This Week</Text>
                            <Text text80 style={{ color: Colors.black }}>{trackings.filter(tracking => tracking.operation == 'login').length}</Text>
                            <Text text70 style={{ color: Colors.primary }}>Last Login</Text>
                            <Text text80 style={{ color: Colors.black }}>{lastLogin ? lastLogin.when.toDate().toString().slice(4, 24) : 'No Data'}</Text>
                            <Text text70 style={{ color: Colors.primary }}>Logouts This Week</Text>
                            <Text text80 style={{ color: Colors.black }}>{trackings.filter(tracking => tracking.operation == 'logout').length}</Text>
                            <Text text70 style={{ color: Colors.primary }}>Last Logout</Text>
                            <Text text80 style={{ color: Colors.black }}>{lastLogout ? lastLogout.when.toDate().toString().slice(4, 24) : 'No Data'}</Text>
                        </View>
                    </View>
                </View>
            </Card>
            <Text text60 style={{ marginTop: 20, marginBottom: 10, color: Colors.primary }}>Graph</Text>
            <TabBar
                backgroundColor={Colors.sidebg}
                onTabSelected={(value) => setFilter(value==0? 'login' : 'logout')}
                enableShadow
            >
                <TabBar.Item
                    label="Logins"
                    selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
                />
                <TabBar.Item
                    label="Logouts"
                    selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
                />
            </TabBar>
            <LineChart
                data={{
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", 'Sat'],
                    datasets: [
                        {
                            data: [
                                trackings.filter(tracking => tracking.operation == filter && tracking.when.toDate().toDateString() == getDay(0).toDateString()).length,
                                trackings.filter(tracking => tracking.operation == filter && tracking.when.toDate().toDateString() == getDay(1).toDateString()).length,
                                trackings.filter(tracking => tracking.operation == filter && tracking.when.toDate().toDateString() == getDay(2).toDateString()).length,
                                trackings.filter(tracking => tracking.operation == filter && tracking.when.toDate().toDateString() == getDay(3).toDateString()).length,
                                trackings.filter(tracking => tracking.operation == filter && tracking.when.toDate().toDateString() == getDay(4).toDateString()).length,
                                trackings.filter(tracking => tracking.operation == filter && tracking.when.toDate().toDateString() == getDay(5).toDateString()).length,
                                trackings.filter(tracking => tracking.operation == filter && tracking.when.toDate().toDateString() == getDay(6).toDateString()).length,
                            ]
                        }
                    ]
                }}
                width={435} // from react-native
                height={220}
                yAxisInterval={1}
                fromZero={true}
                chartConfig={{
                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 100) => Colors.primary,
                    labelColor: (opacity = 1) => Colors.primary,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6"
                    },
                    propsForBackgroundLines: {
                        stroke: 'grey',
                        strokeWidth: 1
                    }
                }}
                style={{
                    marginVertical: 20,
                    borderRadius: 16
                }}
            />
            <Button style={styles.button}>
                <Text text70 style={{ color: Colors.white }}>Create Report</Text>
            </Button>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 20,
        borderRadius: 9,
        width: '90%'
    },
    textAreaContainer: {
        width: 250,
        padding: 20,
        backgroundColor: Colors.grey60,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.grey40
    },
    input: {
        width: 250,
        padding: 8,
        paddingLeft: 20,
        backgroundColor: Colors.grey60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey40
    },
    card: {
        padding: 20,
        margin: 5,
        width: '90%',
        borderWidth: 2,
        borderColor: 'lightgray',
        justifyContent: 'center',
        marginTop: 20
    },
    cardimg: {
        width: 400,
        height: 120
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
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
