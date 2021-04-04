import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Image, TextArea, TouchableOpacity, DateTimePicker } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native-ui-lib'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

import fb from '../fb'
import db from '../db';
import { LogBox } from 'react-native';

export default function ReviewForm({ navigation: { goBack }, route }) {
    // LogBox.ignoreLogs(['TypeError: _reactNative.NativeModules.RNDatePickerAndroid.dismiss is not a function'])

    if(route.params.extra){
        route.params.request = route.params.extra
    }

    const [support, setSupport] = useState(null)
    useEffect(() => db.Users.listenOne(setSupport, route.params.request.userid), [])
    console.log('support ', support)

    const [comment, setComment] = useState('')
    console.log('params', route.params.request)

    let routing = new Array()
    routing["install"] = "Installation"
    routing["remove"] = "Removal"

    const submitReview = async () => {
       //create review in db
       await db.Users.Reviews.createReview(route.params.request.customerid, { comment, when: new Date(), supportid: support.id, jobid: route.params.request.id })
       if (route.params.extra){
          let doc = await db.Users.Notifications.findByJob(route.params.request.customerid, route.params.request.id)
          await db.Users.Notifications.remove(route.params.request.customerid, doc.id)
       }
       goBack()
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text text70 style={{ color: Colors.primary, marginTop: 20 }}>Job</Text>
                    <Text text80 style={{ color: Colors.grey30, marginTop: 5 }}>
                        {routing[route.params.request.type]}
                    </Text>
                    <Text text70 style={{ color: Colors.primary, marginTop: 20 }}>Date</Text>
                    <Text text80 style={{ color: Colors.grey30, marginTop: 5 }}>
                        {route.params.request.when.toDate().toString()}
                    </Text>
                    <Text text70 style={{ color: Colors.primary, marginTop: 20 }}>Support Employee</Text>
                    <Text text80 style={{ color: Colors.grey30, marginTop: 5 }}>
                        {support && support.name}
                    </Text>
                    <Text text70 style={{ color: Colors.primary, marginTop: 20 }}>Comment</Text>
                    <View style={[styles.textAreaContainer, { margin: 10, height: 150 }]}>
                        <TextArea
                            style={{ marginBottom: 20 }}
                            placeholder="Enter comment here.."
                            value={comment} onChangeText={value => setComment(value)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
                        <Button
                            backgroundColor={Colors.primary}
                            label="Submit"
                            labelStyle={{ fontWeight: '100' }}
                            style={[styles.button]}
                            enableShadow
                            onPress={() => submitReview()}
                        />
                           <Button
                            backgroundColor={Colors.red10}
                            label="Cancel"
                            labelStyle={{ fontWeight: '100' }}
                            style={[styles.button, { marginLeft: 20}]}
                            enableShadow
                            onPress={() => goBack()}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>


    )
}
const styles = StyleSheet.create({
    cardimg: {
        flex: 1,
        width: null,
        height: null
    },
    button: {
        marginBottom: 10,
        borderRadius: 5
    },
    textAreaContainer: {
        width: 320,
        padding: 20,
        backgroundColor: Colors.grey60,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.grey40
    },
    input: {
        width: 250,
        padding: 8,
        paddingLeft: 20,
        backgroundColor: Colors.grey60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey40
    },
    card: {
        padding: 20,
        margin: 5,
        width: '90%',
        borderWidth: 2,
        borderColor: 'lightgray',
        justifyContent: 'center'
    },
    cardimg: {
        width: 400,
        height: 120
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20
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
});
