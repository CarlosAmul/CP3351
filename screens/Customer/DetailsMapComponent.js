import React, { useState, useEffect, useRef, useContext } from "react";
import { Alert, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Assets, Image, Colors } from 'react-native-ui-lib';
import UserContext from '../../UserContext'

import db from '../../db'

class LatLng {
    constructor(latitude, longitude) {
        this.latitude = latitude
        this.longitude = longitude
    }
}

export default function UserMapComponent({ oldCenter, oldCenterName, userAddress }) {

    Colors.loadColors({
        primary: '#6874e2',
        basic: '#f5f6fa',
    });

    const [region, setRegion] = useState(null)

    // Save moved position to stay still
    // on component render
    const savePan = (r) => { setRegion(r) }

    return (

        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                zoomEnabled={true}
                region={region || {
                    latitude: 25.28625331405168,
                    longitude: 51.42407464959876,
                    latitudeDelta: 0.615,
                    longitudeDelta: 0.6121,
                }}
                onRegionChangeComplete={savePan}
            >
                {/* Adding markers as images and not
                icons causes some serious performance
                issues */}
                {
                    <Marker
                        coordinate={new LatLng(oldCenter[0], oldCenter[1])}
                        icon={require('../../assets/images/pin.png')}
                        title={oldCenterName}
                    >
                    </Marker>
                }
                {
                    userAddress &&
                    <Marker
                        coordinate={new LatLng(userAddress[0], userAddress[1])}
                        icon={require('../../assets/images/pin-user.png')}
                    >
                    </Marker>
                }

            </MapView>
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        marginTop: "80%",
        height: 400,
        width: Dimensions.get("window").width,
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});