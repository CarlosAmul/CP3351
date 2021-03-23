import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Button, Colors, Image, Text } from 'react-native-ui-lib'
import Ad from '../Ad'
import db from '../../db';

export default function DashboardAd({ ad }) {

    const navigation = useNavigation();

    const [showAd, setShowAd] = useState(false)

    const deleteAd = () => {
        db.Ads.remove(ad.id)
    }

    return (
        <View>
            {
                showAd ?
                    <Ad ad={ad} />
                    :
                    <View style={{ alignSelf: 'center', width: 300, height: 160 }}>
                        <Image
                            source={{ uri: ad.image }}
                            style={styles.cardimg}
                            resizeMode="contain"
                        />
                    </View>
            }
            <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text text70 style={{ color: Colors.primary }}>Title</Text>
                <Text text80>{ad.title}</Text>
                <Text text70 style={{ color: Colors.primary }}>Description</Text>
                <Text text80>{ad.description}</Text>
                <Text text70 style={{ color: Colors.primary }}>Screen</Text>
                <Text text80>{ad.screen}</Text>
                <Text text70 style={{ color: Colors.primary }}>Start Date</Text>
                <Text text80>{ad.startDate.toDate('MM/dd/yyyy').toString().slice(0, 24)}</Text>
                <Text text70 style={{ color: Colors.primary }}>End Date</Text>
                <Text text80>{ad.endDate.toDate('MM/dd/yyyy').toString().slice(0, 24)}</Text>
            </View>
            <Button
                backgroundColor={Colors.primary}
                label={showAd ? 'Hide Ad' : "Show Ad"}
                labelStyle={{ fontWeight: '100' }}
                style={[styles.button, { width: '100%', marginTop: 20 }]}
                enableShadow
                onPress={() => setShowAd(!showAd)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button
                    backgroundColor={Colors.primary}
                    label="Edit"
                    labelStyle={{ fontWeight: '100' }}
                    style={[styles.button]}
                    enableShadow
                    onPress={() => navigation.navigate('AdForm', { screen: "AdForm", ad })}
                />
                <Button
                    backgroundColor={Colors.red20}
                    label="Remove"
                    labelStyle={{ fontWeight: '100' }}
                    style={styles.button}
                    enableShadow
                    onPress={deleteAd}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        borderRadius: 5,
        width: '47%'
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
        flex: 1,
        width: null,
        height: null
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
