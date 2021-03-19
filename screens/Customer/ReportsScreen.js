import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, View, Colors, Card } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import { ScrollView } from 'react-native-gesture-handler';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import UserContext from '../../UserContext'
import fb from '../../fb'
import db from '../../db'

export default function SettingsScreen() {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    }, [navigation]);

    const { user } = useContext(UserContext)

    const [reports, setReports] = useState([])
    const [report, setReport] = useState(null)
    const [isOpen, open] = useState(false)


    useEffect(() => db.Users.Reports.listenByUser(setReports, user.id), [])

    Colors.loadColors({
        primary: '#6874e2',
        basic: '#f5f6fa',
    });

    const showReport = (picked) => {
        open(!isOpen)
        setReport(picked)
    }

    const typeToString = (type) => {
        switch (type) {
            case 0:
                return "Yearly"
            case 1:
                return "Monthly"
            case 2:
                return "Weekly"
        }
    }

    return (

        <ScrollView style={styles.cardContainer}>
            {
                !isOpen && reports.map(
                    report =>
                        <Card
                            row
                            enableShadow
                            key={report.id}
                            containerStyle={'white'}
                            style={styles.card}
                            onPress={() => showReport(report)}>
                            <Card.Section
                                content={[
                                    { text: typeToString(report.type), text60: true, grey10: true },
                                    { text: report.when.toDate('MM/dd/yyyy').toString().slice(0, 24), text70: true, grey30: true }
                                ]}
                                style={{ padding: 10 }}
                            />
                        </Card>
                )
            }
            {
                isOpen &&
                <View style={styles.getStartedContainer}>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        // yAxisLabel=""
                        yAxisSuffix="C"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            // backgroundColor: "#e26a00",
                            // backgroundColor: `${Colors.primary}`,
                            backgroundGradientFrom: `${Colors.primary}`,
                            backgroundGradientTo: `${Colors.primary}`,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            color: () => `${Colors.basic}`,
                            labelColor: () => `${Colors.basic}`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            // borderRadius: 16
                        }}
                    />
                    <Button label="Back"
                        style={{ width: '60%' }}
                        backgroundColor={Colors.primary}
                        onPress={() => open(!isOpen)}
                        marginT-15
                    />
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    cardContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    centerMargin: {
        marginHorizontal: 50,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
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
    smallSeparator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },
});