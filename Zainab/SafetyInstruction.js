import React, { useEffect, useContext } from 'react';
import { Colors } from 'react-native-ui-lib'
import { View } from 'react-native'
import { Button, Text, Card } from 'react-native-ui-lib'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import UserContext from '../UserContext'

export default function SafetInstruction({ instruction, edit, remove }) {

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
            elevation={12}
        >
            <View style={styles.leftCardView}>
                <Card.Image
                    style={styles.cardimg}
                    source={{ uri: instruction.image }}
                />
            </View>
            <View style={styles.rightCardView}>
                <Card.Section
                    content={[{ text: instruction.title, text60M: true, color: Colors.primary }]}
                    backgroundColor={Colors.white}
                />
                <Card.Section
                    contentStyle={{marginTop: 10}}
                    content={[{ text: instruction.description, text55M: true, dark10: true }]}
                    backgroundColor={Colors.white}
                />
                {
                    user 
                    &&
                    user.role === "Service"
                    &&
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity onPress={() => edit(instruction)}>
                            <MaterialIcons name="mode-edit" size={30} color={Colors.darkprimary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => remove(instruction.id)}>
                            <MaterialIcons name="delete" size={30} color={Colors.darkprimary} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </Card >
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
        fontSize: 20,
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
        flex: 1,
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
        height: 250
    },
    cardimg: {
        width: 120,
        height: 120,
        marginBottom: 10
    },
    rightCardView: {
        width: "50%",
        textAlign: "center",
        flex: 1,
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
    }
});