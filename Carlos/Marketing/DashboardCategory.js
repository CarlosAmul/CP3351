import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Card, Colors } from 'react-native-ui-lib'
import db from '../../db';

export default function DashboardCategory({ category }) {

    const [favs, setFavs] = useState(0)
    useEffect(() => db.Categories.Favorites.listenCategoryFavCount(setFavs, category.id), [])
    const [sensors, setSensors] = useState(0)
    useEffect(() => db.Sensors.listenByCategoryCount(setSensors, category.id), [])
    console.log(sensors)

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
                <Card.Image
                    style={styles.cardimg}
                    source={{ uri: category.url }}
                />
            </View>
            <View style={{ width: '50%' }}>
                <Card.Section
                    content={[
                        { text: 'Category', text70: true, color: Colors.primary },
                        { text: category.name, text80: true, textAlign: 'center' },
                        { text: 'Likes', text70: true, color: Colors.primary },
                        { text: favs, text80: true, textAlign: 'center' },
                        { text: 'Sensors', text70: true, color: Colors.primary },
                        { text: sensors, text80: true, textAlign: 'center' }
                    ]}
                    style={{ marginLeft: 20 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 5,
        width: '90%',
        borderWidth: 2,
        borderColor: 'lightgray',
        justifyContent: 'center'
    },
    cardimg: {
        width: 120,
        height: 120,
        marginLeft: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
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
