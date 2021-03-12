import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import UserContext from '../../UserContext'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import { Colors, Button, Card, Chip, TabBar } from 'react-native-ui-lib'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FitnessTip from './FitnessTip'

export default function FitnessTipsScreen() {

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
    }, [navigation]);

    const { user } = useContext(UserContext)

    const approve = async (tip, approved) => {
        await db.FitnessTips.update({ ...tip, approved: approved, approvedby: user.id})
        await db.Users.Notifications.newNotification(tip.userid, !approved ? "Your fitness tip was disapproved to be posted" : "Your fitness tip was approved to be posted", "FitnessTipsScreen")
    }

    const [allFitness, setAllFitness] = useState([])
    useEffect(() => db.FitnessTips.listenAll(setAllFitness), [])

    const [type, setType] = useState(0)

    return (
        <ScrollView style={styles.scrollcontainer}>
            <Text style={[styles.mainHeader, styles.title]}>As a support, you can approve/disapprove tips given by customers</Text>
            <TabBar
                backgroundColor={Colors.sidebg}
                onTabSelected={(index) => setType(index)}
                enableShadow
            >
                <TabBar.Item
                    label="Customer Tips"
                    selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
                />
                <TabBar.Item
                    label="Feeded Tips"
                    selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
                />
            </TabBar>
            {
                type === 0 ?
                allFitness.filter(f => f.approvedby === "").length === 0 ?
                    <View style={styles.bigMsgContainer}>
                        <Text style={[styles.bigMsg, { color: Colors.darkprimary }]}>Nothing to Feedback</Text>
                        <MaterialIcons name="hourglass-empty" size={45} color={Colors.darkprimary} />
                    </View>
                    :
                    allFitness.filter(f => f.approved === false && f.approvedby === "").map(tip =>
                        <Card key={tip.id} style={styles.disapproved} elevation={12}>
                            <Card.Section
                                contentStyle={{ marginBottom: 10 }}
                                content={[{ text: tip.title, text50M: true, color: Colors.darkprimary, margin: 20 }]}
                            />
                            <Card.Section
                                content={[{ text: tip.description, text65M: true, color: Colors.violet50, margin: 20 }]}
                            />
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                                {
                                    tip.tags.map((tag, index) =>
                                        <Chip
                                            key={index}
                                            label={"#" + tag}
                                            labelStyle={{ color: Colors.darksecondary }}
                                            containerStyle={{ borderWidth: 0, width: 100 }}
                                        />
                                    )
                                }
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Button
                                    label={<Entypo name="circle-with-cross" size={25} color={Colors.darkprimary} />}
                                    style={{ backgroundColor: 'transparent', margin: 10, padding: 50 }}
                                    onPress={() => approve(tip, false)}
                                />
                                <Button
                                    label={<FontAwesome name="check-circle" size={25} color={Colors.green30} />}
                                    style={{ backgroundColor: 'transparent', margin: 10, padding: 50 }}
                                    onPress={() => approve(tip, true)}
                                />
                            </View>
                        </Card>
                    )
                :
                    <View>
                        {
                            allFitness.filter(tip => tip.approvedby !== "").map(tip =>  
                                <FitnessTip key={tip.id} tip={tip} />
                            )
                        }
                    </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mainHeader: {
        color: "#6874e2",
        margin: 40,
        textAlign: "center"
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    fieldsContainer: {
        margin: 20
    },
    inputArea: {
        backgroundColor: "#f5f6fa",
        padding: 10
    },
    inputChips: {
        backgroundColor: "#f5f6fa",
        borderRadius: 20,
        padding: 10,
        height: 150,
        marginBottom: 30
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a"
    },
    disapproved: {
        margin: 30,
        padding: 20
    },
    approved: {
        margin: 30,
        padding: 20
    },
    bigMsg: {
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold'
    },
    bigMsgContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})