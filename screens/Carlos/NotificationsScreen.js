import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../UserContext'
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import { Card } from 'react-native-ui-lib'

export default function NotificationsScreen() {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const { user } = useContext(UserContext)

    const [notifications, setNotifications] = useState([])
    useEffect(() => db.Users.Notifications.listenByUserAll(user?.id || "", setNotifications), [user])

    return (
        <View>
            {
                notifications.map(
                    notification =>
                        <Card row useNative key={notification.id} style={styles.card} onPress={() => { }}>
                            <Card.Section
                                bg-white
                                content={[
                                    { text: notification.message, text70: true, grey10: true },
                                    {text: notification.when.toDate().toString(), text90: true, grey30: true}
                                ]}
                                style={{ padding: 20 }}
                            />
                        </Card>
                )
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: 20,
        // backgroundColor: "#ffffff",
        // margin: 20,
        // width: 300,
        // textAlign: "center"
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
