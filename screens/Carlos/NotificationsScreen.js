import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../UserContext'
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import { Card } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function NotificationsScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
            , headerRight: () => (
                <TouchableOpacity onPress={clearAll}>
                    <Text style={{ marginRight: 25, fontSize: 15 }}>Clear</Text>
                </TouchableOpacity>
            )
        });
    });

    const { user } = useContext(UserContext)

    const [notifications, setNotifications] = useState([])
    useEffect(() => db.Users.Notifications.listenByUserAll(user?.id || "", setNotifications), [user])

    // console.log(notifications)

    function link(uid, nid, screen, extra) {
        db.Users.Notifications.markRead(uid, nid)
        navigation.navigate(screen, { screen: screen + "Screen", params: { extra: extra ? extra : null } })
    }

    function clearAll() {
        notifications.map(notif => {
            removeNotif(notif.id)
        })
    }

    function removeNotif(id) {
        db.Users.Notifications.remove(user.id, id)
        console.log('notification cleared')
    }

    return (
        <ScrollView style={styles.notifContainer}>
            {
                notifications.map(
                    notification =>
                        <Card
                            row
                            enableShadow
                            key={notification.id}
                            onPress={() => link(user.id, notification.id, notification.screen, notification.extra)}
                            style={[styles.card, { backgroundColor: notification.status ? '#f2f2f2' : 'white' }]}
                        >
                            <Card.Section
                                content={[
                                    { text: notification.message, text60: true, grey10: true },
                                    { text: notification.when.toDate('MM/dd/yyyy').toString().slice(0, 24), text70: true, grey30: true },
                                ]}

                                style={{ padding: 20, flex: 1 }}
                            />
                            <TouchableOpacity onPress={() => removeNotif(notification.id)}>
                                <Text>Dismiss</Text>
                            </TouchableOpacity>

                        </Card>
                )
            }
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifContainer: {
        flex: 1
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
