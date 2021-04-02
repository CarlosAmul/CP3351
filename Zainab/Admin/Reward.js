import React, { useEffect, useContext } from 'react';
import { Colors } from 'react-native-ui-lib'
import { View } from 'react-native'
import { Text, Card } from 'react-native-ui-lib'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import UserContext from '../../UserContext'

export default function Reward({ reward, edit, remove }) {

    useEffect(() => {
        Colors.loadColors({
            primary: '#6874e2',
            secondary: '#f9ce7f',
            mainbg: '#f5f6fa',
            sidebg: '#ffffff',
        });
    }, [Colors])

    const { user } = useContext(UserContext)

    return (
        <Card
            borderRadius={12}
            style={styles.card}
            elevation={15}
        >
            <View style={styles.leftCardView}>
                <Card.Image
                    style={styles.cardimg}
                    source={{ uri: reward.image }}
                />
            </View>
            <View style={styles.rightCardView}>
                <Text style={[styles.title, styles.cardText, {textAlign: 'left', fontSize: 16}]}>{reward.title}</Text>
                <Text style={styles.cardText}>{reward.description}</Text>
                <Text style={[{color: Colors.darkprimary}, styles.cardText]}>{reward.points} points</Text>
                <Text style={[{color: Colors.purple60}, styles.cardText]}>{reward.type}</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={() => edit(reward)}>
                        <MaterialIcons name="mode-edit" size={24} color={Colors.darkprimary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => remove(reward.id)}>
                        <MaterialIcons name="delete" size={24} color={Colors.darkprimary} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mainbg
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    fieldsContainer: {
        margin: 20
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "center"
    },
    mainHeader: {
        color: Colors.primary,
        margin: 40
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
        height: 180
    },
    cardimg: {
        width: 120,
        height: 120,
        marginBottom: 10
    },
    rightCardView: {
        width: "50%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    leftCardView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondaryBtn: {
        width: 50,
        backgroundColor: Colors.secondary,
        marginBottom: 10
    },
    cardText: {
        marginBottom: 30
    }
});