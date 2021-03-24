import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native'
import { Colors, Text, Card, TextField, TextArea, Button, TouchableOpacity, RadioGroup, RadioButton } from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native'
import MenuIcon from '../../components/MenuIcon'

import CenterPicker from '../pickers/CenterPicker'

export default function Tech({ tech, assign, auto, centers }) {

    const navigation = useNavigation();

    const [center, setCenter] = useState(null)

    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const validateAssign = () =>
        center === null ||
        center === ""

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


    return (
        <View key={tech.id} style={[styles.container, { marginVertical: 10 }]}>
            <Text text50M>{tech.name}</Text>
            <View style={styles.horizontalView}>
                <Button label="Assign"
                    style={styles.smallButton}
                    backgroundColor={Colors.primary}
                    onPress={() => { assign(tech, center) }}
                    disabled={validateAssign(tech)}
                    marginT-15
                />
                <Button label="Auto Assign"
                    style={styles.smallButton}
                    backgroundColor={Colors.primary}
                    onPress={() => { auto(tech) }}
                    marginT-15
                />
            </View>
            <CenterPicker set={setCenter} center={center} centers={centers} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 25,
        borderColor: Colors.primary,
        justifyContent: 'center',
        padding: 10
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
    smallButton: {
        width: Dimensions.get("window").width / 2.5,
        margin: 5,
        alignSelf: "center"
    },
    card: {
        padding: 20,
        margin: 20,
        width: 380,
        textAlign: "center",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    horizontalView: {
        flex: 1,
        flexDirection: 'row'
    },
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    mainHeader: {
        color: "#6874e2",
        margin: 40,
        textAlign: 'center'
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a",
        margin: 10
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    radioGroup: {
        borderRadius: 20,
        padding: 10,
        width: 350,
    },
    fieldsContainer: {
        marginLeft: 30,
        marginRight: 30
    },
});
