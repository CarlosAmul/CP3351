import React, { useEffect } from 'react';
import { Colors } from 'react-native-ui-lib'
import { View } from 'react-native'
import {  Button, Text, Card } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Manufacturer({ manufacturer, edit, remove }) {

    useEffect(() => {
        Colors.loadColors({
            primary: '#6874e2',
            secondary: '#f9ce7f',
            mainbg: '#f5f6fa',
            sidebg: '#ffffff',
        });
    }, [Colors])

    return (
        <Card
            borderRadius={10}
            style={styles.card}
            elevation={8}
        >
            <View style={styles.leftCardView}>
                <Card.Image
                    style={styles.cardimg}
                    source={{ uri: manufacturer.url }}
                />
                <Card.Section
                    content={[{ text: manufacturer.name, text60M: true, dark10: true }]}
                    backgroundColor={Colors.white}
                />
            </View>
            <View style={styles.rightCardView}>
                <Text style={{textAlign: "center", fontSize: 18, marginBottom: 10}}>{manufacturer.price}</Text>
                <Button 
                    style={{width: 50, backgroundColor: Colors.secondary, marginBottom: 10}}
                    label={<MaterialIcons name="mode-edit" size={24} color="white" />}
                    onPress={() => edit(manufacturer)}
                />
                <Button 
                    style={{backgroundColor: Colors.secondary}}
                    label={<MaterialIcons name="delete" size={24} color="white" />}
                    onPress={() => remove(manufacturer.id)}
                />
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
        flexWrap: 'wrap'
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
        alignItems: "center"
    },
    secondaryBtn: {
        width: 50,
        backgroundColor: Colors.secondary,
        marginBottom: 10
    }
});