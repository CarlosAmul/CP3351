import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import { Card, Colors, Button, View, Text } from 'react-native-ui-lib'
import { AntDesign } from '@expo/vector-icons'
import UserContext from '../../UserContext'
import db from '../../db'

export default function UserFavorite({ categoryid }) {

    Colors.loadColors({
        primary: '#6874e2',
		secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
		sidebg: '#ffffff',
    });

    const { user } = useContext(UserContext)

    const [category, setCategory] = useState(null)
    useEffect(() => categoryid ? db.Categories.listenOne(setCategory, categoryid ) : undefined, [categoryid])
    
    return (    
        <Card
            borderRadius={10}
            style={styles.card}
            elevation={12}
        >
            <View style={styles.leftCardView}>
                <Card.Image
                    style={styles.cardimg}
                    source={{ uri: category?.url || "" }}
                />
                <Card.Section
                    content={[{ text: category?.name || "", text60M: true, dark10: true, marginT: 20 }]}
                    backgroundColor={Colors.sidebg}
                />
            </View>
            <View style={styles.rightCardView}>

            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
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
    }
})