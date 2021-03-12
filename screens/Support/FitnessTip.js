import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet,  View } from 'react-native';
import UserContext from '../../UserContext'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import { Colors,  Card, Chip } from 'react-native-ui-lib'
import { Fontisto } from '@expo/vector-icons';

export default function FitnessTip({tip}) {

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

    const [support, setSupport] = useState("")
    useEffect(() => db.Users.listenOne(setSupport, tip?.approvedby || ""), [tip])

    return (
        <Card key={tip.id} style={styles.approved} elevation={12}>
            <Card.Section
                contentStyle={{ marginBottom: 10 }}
                content={[{ text: tip.title, text50M: true, color: Colors.darkprimary, margin: 20 }]}
            />
            <Fontisto name="quote-a-right" size={15} color={Colors.secondary} style={{ marginTop: 5, marginBottom: 10 }} />
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
            <Card.Section
                content={[{ text: tip.approved ? `Approved by ${support?.name || ""}` : `Disapproved by ${support?.name || ""}`, text65M: true, color: Colors.violet50, margin: 20 }]}
            />
        </Card>
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