import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Colors, Text, DateTimePicker, TextField } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import UserContext from '../../../UserContext'
import db from '../../../db'


export default function ReportsFormScreen({ route }) {

    const { sensor } = route.params
    const navigation = useNavigation()
    const { user } = useContext(UserContext)

    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [min, setMin] = useState(null)
    const [max, setMax] = useState(null)
    const [type, setType] = useState(null)
    const [category, setCategory] = useState(null)


    useEffect(() => {
        (async () => {
            if (sensor) {
                // Get sensor category
                let category = await db.Categories.findOne(sensor.categoryid)
                setCategory(category)
                // Set report date range
                let oldestReading = await db.Sensors.Readings.findOldestOne(sensor.id)
                let latestReading = await db.Sensors.Readings.findLatestOne(sensor.id)
                setMin(oldestReading.when.toDate())
                setMax(latestReading.when.toDate())
            }
        })()
    }, [sensor])

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


    const oneDay = 1000 * 60 * 60 * 24;
    function dayDiff(a, b) {
        // UTC to discount daylight saving time
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        console.log("diff", Math.abs(Math.floor((utc2 - utc1) / oneDay)))
        return Math.abs(Math.floor((utc2 - utc1) / oneDay));
    }

    const validateFinal = () =>
        to === null ||
        from === null

    const sendRequest = () => {
        (async () => {
            await db.Users.Reports.createReport(user.id, {
                sensorid: sensor.id,
                to: to,
                type: category.name,
                from: from,
                when: new Date()
            })
            navigation.goBack()
        })()
    }

    const getMaxAllowed = () => {
        let fromToMax = dayDiff(from, max)
        if (fromToMax / 30.417 > 6)
            return new Date(from.getTime() + 1000 * 60 * 60 * 24 * 30 * 6)
        else
            return max
    }

    return (
        <>
            <View style={styles.container}>
                {
                    <>
                        <Text style={{ marginBottom: 15 }} text40M>Select report data range</Text>
                        {
                            <>
                                <DateTimePicker
                                    placeholder="Report start date"
                                    style={[styles.inputText, { backgroundColor: Colors.mainbg, }]}
                                    value={from}
                                    onChange={(date) => { setFrom(date) }}
                                    minimumDate={min}
                                    maximumDate={max}
                                />
                                {
                                    from &&
                                    <>
                                        <Text style={styles.muted}>Maximum of 6 months of data per report</Text>
                                        <DateTimePicker
                                            placeholder="Report end date"
                                            style={[styles.inputText, { backgroundColor: Colors.mainbg, }]}
                                            value={to}
                                            onChange={(date) => { setTo(date) }}
                                            minimumDate={from}
                                            maximumDate={getMaxAllowed()}
                                        />
                                        <Button label="Send Request"
                                            style={{ width: '60%', alignSelf: "center" }}
                                            backgroundColor={Colors.primary}
                                            onPress={sendRequest}
                                            disabled={validateFinal()}
                                            marginT-15
                                        />
                                    </>
                                }
                            </>
                        }
                    </>
                }

            </View>
        </>
    );
}



const styles = StyleSheet.create({
    muted: {
        fontSize: 13,
        padding: 5,
        alignContent: "center",
        color: 'grey'
    },
    message: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: "center",
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
    cardContainer: {
        flex: 1
    },
    container: {
        padding: 15,
        flex: 1,
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