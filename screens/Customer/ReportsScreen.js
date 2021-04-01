import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, View, Colors, Card } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import { ScrollView } from 'react-native-gesture-handler';

import OneReport from './OneReport'
import UserContext from '../../UserContext'
import db from '../../db'

export default function ReportsScreen() {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    }, [navigation]);

    const { user } = useContext(UserContext)

    const [reports, setReports] = useState([])
    const [reportsWithSensors, setReportsWithSensors] = useState([])
    const [readings, setReadings] = useState([])
    const [report, setReport] = useState(null)
    const [isOpen, open] = useState(false)

    const [xAxis, setXAxis] = useState(null)
    const [yAxis, setYAxis] = useState(null)

    // Listen by newest reports first
    useEffect(() => db.Users.Reports.listenByUserDesc(setReports, user.id), [])

    // Give reports their sensor location information
    useEffect(() => {
        (async () => {
            let newReports = await Promise.all(reports.map(async report => {
                let sensor = await db.Sensors.findOne(report.sensorid)
                report.sensor = sensor
                return report
            }))
            setReportsWithSensors(newReports)
        })()
    }, [reports])

    // Get readings from the sensor the user picked
    useEffect(() => report ? db.Sensors.Readings.listenAllBetween(report.sensorid, setReadings, report.from, report.to) : undefined, [report])

    // Calculate graph display data
    useEffect(() => {
        (async () => {
            if (report && readings) {
                
                // Month names for yAxis labels of reading times
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ]

                let data = {}
                readings.forEach(reading => {
                    let month = reading.when.toDate().getMonth()
                    if (data[monthNames[month]]) {
                        data[monthNames[month]].push(reading.current)
                    } else {
                        data[monthNames[month]] = []
                        data[monthNames[month]].push(reading.current)
                    }
                })

                // Average each month
                for (const month in data) {
                    let values = data[month]
                    let length = values.length
                    values = values.reduce((p,c) => p+c)
                    values = Math.round(values / length)
                    data[month] = values
                }

                // console.log("xaxis", Object.keys(data))
                // console.log("yaxis", Object.values(data))

                setXAxis(Object.keys(data))
                setYAxis(Object.values(data))
            }
        })()
    }, [report, readings])

    Colors.loadColors({
        primary: '#6874e2',
        basic: '#f5f6fa',
    });

    const showReport = (picked) => {
        open(!isOpen)
        setReport(picked)
    }

    return (

        <ScrollView style={styles.cardContainer}>
            {
                !isOpen && reportsWithSensors.map(
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
                                    { text: `Report for: ${report.sensor.location} sensor`, text60: true, grey10: true },
                                    { text: `Requested on: ` + report.when.toDate('MM/dd/yyyy').toString().slice(0, 24), text70: true, grey30: true }
                                ]}
                                style={{ padding: 10 }}
                            />
                        </Card>
                )
            }
            {
                isOpen && report && xAxis && yAxis &&
                <View style={styles.getStartedContainer}>
                    <OneReport type={report.type} data={yAxis} labels={xAxis} />
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