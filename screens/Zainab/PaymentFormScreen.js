import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native'
import {
    Card, Colors, Button, View,
    Text, TextField, RadioGroup, RadioButton,
    Stepper, Dialog
} from 'react-native-ui-lib'
import db from '../../db'
import { FontAwesome5 } from '@expo/vector-icons';
import UserContext from '../../UserContext'
import { AntDesign } from '@expo/vector-icons';
import fb from '../../fb'

export default function PaymentFormScreen({ navigation, route }) {

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

    const { category } = route.params
    const { user } = useContext(UserContext)

    const [userRewards, setUserRewards] = useState([])
    useEffect(() => db.Users.CustomerRewards.listenToUnRedeemCustomerRewards(setUserRewards, user?.id || ""), [user])

    const [rewards, setRewards] = useState([])
    useEffect(() => db.Rewards.listenToRewardsByType(setRewards, 'Discount'), [])

    const [manufacturers, setManufacturers] = useState([])
    useEffect(() => db.Manufacturers.listenAll(setManufacturers), [])

    const [location, setLocation] = useState("")
    const [cardno, setCardno] = useState("")
    const [pin, setPin] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(category.price)
    const [promoCode, setPromoCode] = useState("")
    const [promoCodeStatus, setPromoCodeStatus] = useState("")

    const setManufacturerAndPrice = (value) => {
        quantity ? 
            setPrice((category.price * 1 + manufacturers.find(m => m.id === value).price * 1) * (quantity * 1))
        :
            setPrice(category.price * 1 + manufacturers.find(m => m.id === value).price * 1)
        setManufacturer(value)
        validatePromoCode(promoCode, quantity, value)
    }
    
    const validate = () =>
        location !== "" &&
        cardno.match(/^[0-9]{16}$/) &&
        pin.match(/^[0-9]{4}$/) &&
        manufacturer !== ""

    const validateAndSetAction = async () => {
        if(validate()) {
            setAction(true)
            const creward = userRewards.find(ur => ur.id === promoCode)
            if(creward) {
                if(rewards.map(r => r.id).includes(creward.rewardid)) {
                    await db.Users.CustomerRewards.setRedeemToTrue(user.id, creward.id)
                }
            }
            const addSensor = fb.functions().httpsCallable('addSensor')
            if(category.name === "Temperature") {
                await addSensor({location, user, categoryid: category.id, min: 0, max: 100, alert: false, price, manufacturer, category, install: "no", quantity: quantity*1})
            }
            else if(category.name === "Sleep Tracker") {
                await addSensor({location, user, categoryid: category.id, min: 0, max: 100, alert: false, price, manufacturer, category, install: false, quantity: quantity*1})
            }
        }
        else {
            setAction(false)
        }
    }

    const setQuantityAndPrice = (value) => {
        manufacturer ? 
            setPrice((category.price * 1 + manufacturers.find(m => m.id === manufacturer).price * 1) * value)
        :
            setPrice(category.price * 1  * value)
        setQuantity(value)
        validatePromoCode(promoCode, value, manufacturer)
    }

    const validatePromoCode = async (value, quantity, manufacturer) => {
        setPromoCode(value)
        const creward = userRewards.find(ur => ur.id === value)
        if(creward) {
            if(rewards.map(r => r.id).includes(creward.rewardid)) {
                setPromoCodeStatus("Promo Code Applied")
                const reward = await db.Rewards.findOne(creward.rewardid)
                let previousPrice = category.price
                if(manufacturers.find(m => m.id === manufacturer)) {
                    previousPrice += manufacturers.find(m => m.id === manufacturer).price
                }
                let totalPrice = previousPrice * quantity * 1
                totalPrice = totalPrice - (reward.discount / 100 * totalPrice)
                setPrice(totalPrice)
            }
        } else {
            let previousPrice = category.price
            if(manufacturers.find(m => m.id === manufacturer)) {
                previousPrice += manufacturers.find(m => m.id === manufacturer).price
            }
            let totalPrice = previousPrice * quantity * 1
            setPrice(totalPrice)
            setPromoCodeStatus("Invalid Code")
        }
    }

    const [action, setAction] = useState(false)
    return (
        <ScrollView style={[styles.container, { backgroundColor: Colors.sidebg }]}>
            <View style={styles.fieldsContainer}>
                <Card
                    style={{ padding: 30, marginBottom: 40, backgroundColor: Colors.secondary }}
                    elevation={15}
                >
                    <Card.Section
                        content={[{ text: "Buy " + category.name + " sensor", text60BO: true, white: true, }]}
                        contentStyle={{ flex: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}
                    />
                    <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5 name="cc-amazon-pay" size={50} color="white" />
                        <Text style={[styles.title, { color: Colors.darkprimary, marginTop: 10 }]}>Total Price: QAR {price}</Text>
                    </View>
                </Card>
                <TextField
                    onChangeText={text => setLocation(text)}
                    hideUnderline
                    placeholder="Where you want your sensor?"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={location}
                />
                <Stepper
                    initialValue={1}
                    min={1}
                    label="Quantity"
                    onValueChange={value => setQuantityAndPrice(value)}
                    containerStyle={styles.inputText}
                />
                <View style={[styles.radioGroup, { backgroundColor: Colors.mainbg }]}>
                    <Text style={{ marginTop: 15, fontSize: 18 }}>Choose brand (price varies depending on quality) </Text>
                    <RadioGroup
                        style={{ marginTop: 20 }}
                        onValueChange={value => setManufacturerAndPrice(value)}
                    >
                        {
                            category.manufacturers.map(m =>
                                <RadioButton
                                    key={m}
                                    size={17}
                                    label={manufacturers.length > 0 ? manufacturers.find(m2 => m2.id === m).name : "Getting.."}
                                    value={m}
                                    style={{ margin: 5 }}
                                />
                            )
                        }
                    </RadioGroup>
                </View>
                <Text style={[styles.title, styles.mainHeader]}>Your Payment Details</Text>
                <TextField
                    onChangeText={text => setCardno(text)}
                    hideUnderline
                    placeholder="Credit Card No"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={cardno}
                />
                <TextField
                    onChangeText={text => setPin(text)}
                    hideUnderline
                    placeholder="Pin"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={pin}
                />
                <TextField
                    onChangeText={text => validatePromoCode(text, quantity, manufacturer)}
                    hideUnderline
                    placeholder="Promo Code (optional)"
                    style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                    value={promoCode}
                />
                <Text style={{color: Colors.red20, marginBottom: 20, marginTop: -10, marginLeft: 5}}>{promoCodeStatus}</Text>
                <Button
                    label="Confirm Payment"
                    backgroundColor={Colors.darkprimary}
                    onPress={() => validateAndSetAction()}
                />
                <Dialog
                    useSafeArea
                    bottom={true}
                    visible={action}
                    onDismiss={() => navigation.navigate('PublicHomeScreen')}
                    containerStyle={[styles.dialog]}
                >
                    <Text style={[styles.title, styles.mainHeader]}>Payment Successful</Text>
                    <AntDesign name="checkcircle" size={50} color="green" style={{ alignSelf: 'center' }} />
                    <Text style={[styles.paragraph, { color: Colors.darkprimary }]}>Thank you for purchasing! We hope you will come back again!</Text>
                    <Button
                        label="Back to Home"
                        style={{ backgroundColor: Colors.primary, marginTop: 20 }}
                        onPress={() => navigation.navigate('PublicHomeScreen')}
                    />
                </Dialog>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fieldsContainer: {
        margin: 20
    },
    card: {
        padding: 20,
        backgroundColor: "#ffffff",
        margin: 20,
        width: 350,
        textAlign: "center",
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    leftCardView: {
        width: "50%",
    },
    rightCardView: {
        width: "50%",
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    cardimg: {
        width: 120,
        height: 120
    },
    iconButton: {
        backgroundColor: 'transparent',
        width: 0
    },
    buttonText: {
        color: '#fa1a65'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    },
    mainHeader: {
        color: "#6874e2",
        margin: 40
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    radioGroup: {
        borderRadius: 20,
        padding: 10,
        width: '80%',
        marginTop: 30
    },
    dialog: {
        borderRadius: 10,
        backgroundColor: "#ffffff",
        height: 350,
        padding: 20,
        width: "100%"
    },
    paragraph: {
        textAlign: 'center',
        fontSize: 17,
        marginTop: 20
    }
})