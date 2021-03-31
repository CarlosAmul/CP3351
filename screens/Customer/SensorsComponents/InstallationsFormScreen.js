import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, View, Colors, Text, DateTimePicker, TextField } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../../components/MenuIcon'
import { ScrollView } from 'react-native-gesture-handler';
import { getDistance } from 'geolib';
import UserContext from '../../../UserContext'
import fb from '../../../fb'
import db from '../../../db'

import InstallationsMapComponent from './InstallationsMapComponent'
import InstallationTypePicker from '../../pickers/InstallationTypePicker'

export default function InstallationsFormScreen({ route }) {

    const { sensor } = route.params
    const navigation = useNavigation()
    const { user } = useContext(UserContext)

    const [distances, setDistances] = useState([])
    const [category, setCategory] = useState(null)
    const [closest, setClosest] = useState(null)
    const [fee, setFee] = useState(0)
    const [note, setNote] = useState("")
    const [type, setType] = useState("")
    const [operationMessage, setOperationMessage] = useState(null)
    const [centers, setCenters] = useState([])
    const [requestDate, setRequestDate] = useState(null)

    useEffect(() => db.SupportCenters.listenAll(setCenters), [])
    useEffect(() => {
        (async () => {
            if (sensor)
                setCategory(await db.Categories.findOne(sensor.categoryid))
        })()
    }, [])

    const calculateDistances = (address) => {
        // Distance between two points for each center
        // to the user address using the formula below
        // d=√((lat_2-lat_1)²+(long_2-long_1)²)
        let latitude, longitude, distances
        if (user?.address && centers.length > 0 && category) {
            distances = centers.map(center => {
                latitude = center.address[0]
                longitude = center.address[1]
                return Math.sqrt(Math.pow((latitude - address[0]), 2) + Math.pow((longitude - address[1]), 2))
            })
            setDistances(distances)
        }
    }

    useEffect(() => calculateDistances(user.address), [user.address, centers])

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
        return Math.abs(Math.floor((utc2 - utc1) / oneDay));
    }

    // const [pending, setPending] = useState([])
    // const [isOpen, open] = useState(false)

    // Average sedan-size car tank volume contains x<45 liters
    // Qatar gas price is 1.6 per liter
    // Average fuel efficieny of light vehicles is 9.4 L/100 km
    // a 1 km drive would cost close to 0.16
    // assume an arbitrary delivery profit of 100%
    // final cost per km would be 0.192 ~ 0.2 QAR
    // ~ 0.5 out of greediness
    const handleFees = () => {
        let fee = 0
        if (requestDate && closest) {
            let userLocation = { latitude: user.address[0], longitude: user.address[1] }
            let centerLocation = { latitude: closest.address[0], longitude: closest.address[1] }
            let distance = getDistance(userLocation, centerLocation)
            let km = Math.ceil(distance / 1000)
            if (km > closest.range) {
                return "You're outside the service range, sorry"
            }
            fee += km * 0.5

            let transport = fee
            console.log("transport", transport)
            // Assuming a tech does most of their job at the company
            // and that an understaffed center would be more affected
            // and assuming each tech generates about 50k yearly revenue
            // then it hourly be 136, assmuing fitIot is large, then 30
            // Each techCost would reflect how much that would be affected
            // per total techs at a center
            let techCost = 30 / closest.techs
            fee += techCost

            // Servicing and installations costs from experience, no googling here, sorry.
            fee += category.price / 3

            // Quick response adds a 50% increase from normal techCost (less than usual)
            if (dayDiff(new Date(), requestDate) < 7) {
                fee += (techCost / 100 * 50) + techCost
            }
            if (dayDiff(new Date(), requestDate) < 2) {
                fee += (techCost / 100 * 50) + techCost
            }

            if (transport < 10)
                transport = "free"
            else
                transport = Math.ceil(transport)
            fee = Math.ceil(fee)

            let message = `Transport will be ${transport}. Requested installation date is on ${requestDate.toLocaleDateString()} between 2 to 6 pm. Totalling at ${fee} QAR`
            setFee(fee)
            setOperationMessage(message)
        }
    }

    useEffect(() => { handleFees() }, [requestDate, closest])

    const validateFinal = () =>
        !type ||
        type === "" ||
        requestDate === null

    const sendRequest = () => {
        (async () => {
            let item = {
                type: type,
                when: requestDate,
                on: new Date(),
                status: "Processing",
                fee: fee,
                note: note,
                centerid: closest.id,
                centername: closest.name,
                from: closest.address,
                to: user.address,
                customerid: user.id,
                userid: null
            }
            await db.Sensors.Installations.createInstallation(item, sensor.id)
            let newSensor = { ...sensor, request: "yes" }
            await db.Sensors.update(newSensor)
            navigation.goBack()
        })()
    }

    // console.log("req date", requestDate)
    // console.log("type", type)

    return (
        <>
            <View styles={styles.container}>
                <Text style={[styles.subtitle, { color: "black" }]}>
                    Choose a request date:
                </Text>
                <DateTimePicker
                    placeholder="Request Date"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg, }]}
                    value={requestDate}
                    // onChange={handleRequestDate}
                    onSelect={(date) => { setRequestDate(date) }}
                    minimumDate={new Date()}
                />
                {
                    operationMessage &&
                    <Text style={[styles.message, { color: Colors.darkprimary, alignSelf: "center" }]}>
                        {operationMessage}
                    </Text>
                }
                <Text style={[styles.subtitle, { color: "black" }]}>
                    Notes:
                </Text>
                <TextField
                    onChangeText={text => setNote(text)}
                    placeholder="Extra address notes (Optional)"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={note}
                />
                <InstallationTypePicker set={setType} sensor={sensor} />
                <Button label="Send Request"
                    style={{ width: '60%', alignSelf: "center" }}
                    backgroundColor={Colors.primary}
                    onPress={sendRequest}
                    disabled={validateFinal()}
                    marginT-15
                />
            </View>
            <View style={styles.container}>
                {
                    user.address && centers.length > 0 &&
                    <>
                        <Text style={[styles.muted, { color: "grey" }]}>
                            Service radius displayed in blue
                    </Text>
                        <InstallationsMapComponent
                            distances={distances} centers={centers}
                            closest={closest} setClosest={setClosest}
                        />
                    </>
                }
                {
                    !user.address &&
                    <Text style={[styles.title, { color: Colors.darkprimary, marginTop: 10 }]}>
                        Please edit your address information in your settings before continuing
                </Text>
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
        flex: 1,
        flexDirection: "row",
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