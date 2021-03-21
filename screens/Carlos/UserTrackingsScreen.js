import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Carousel, TextArea, Image } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import MenuIcon from '../../components/MenuIcon'
import { Colors } from 'react-native-ui-lib'
import UserTracking from './UserTracking'
import db from '../../db';
import { LineChart } from 'react-native-chart-kit';


export default function DashboardScreen() {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const [users, setUsers] = useState([])
    useEffect(() => db.Users.listenByRole('Customer', setUsers), [])
    const userCarousel = createRef();
    console.log(users)

    return (
        <ScrollView style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text text60 style={{ marginTop: 20, marginBottom: 10, color: Colors.primary }}>User Tracking</Text>
                <Card
                    row
                    enableShadow
                    style={styles.card}
                >
                    {
                        users.length > 0 ?
                            <Carousel
                                ref={userCarousel}
                                pageControlProps={{
                                    size: 8,
                                    enlargeActive: true,
                                    onPagePress: page => userCarousel.current.goToPage(page)
                                }}
                                pageControlPosition={Carousel.pageControlPositions.UNDER}
                            >
                                {
                                    users.map(user =>
                                        <UserTracking key={user.id} user={user} />
                                    )
                                }
                            </Carousel>
                            :
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image
                                    cover
                                    source={{ uri: 'https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' }}
                                />
                                <Text text60>
                                    Loading...
                                </Text>
                            </View>
                    }

                </Card>
                <Text text60 style={{ marginTop: 20, marginBottom: 10, color: Colors.primary }}>Graph</Text>
                <LineChart
                    data={{
                        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", 'Sat'],
                        datasets: [
                            {
                                data: [5, 0, 1, 4, 0, 30]
                            }
                        ]
                    }}
                    width={350} // from react-native
                    height={220}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "white",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => Colors.primary,
                        labelColor: (opacity = 1) => Colors.primary,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "6"
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
            </View>
        </ScrollView>
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
