import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Assets, Image, Colors } from 'react-native-ui-lib';

import db from '../../../db'

class LatLng {
    constructor(latitude, longitude) {
        this.latitude = latitude
        this.longitude = longitude
    }
}

export default function UserMapComponent({ set, location }) {

    Colors.loadColors({
        primary: '#6874e2',
        basic: '#f5f6fa',
    });

    const [centers, setCenters] = useState([])
    const [region, setRegion] = useState(null)

    useEffect(() => db.SupportCenters.listenAll(setCenters), [])

    const placeMarker = (e) => {
        let coordinate = e.nativeEvent.coordinate
        set(new LatLng(coordinate.latitude, coordinate.longitude))
    }

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
                onLongPress={placeMarker}
            >
                {/* Adding markers as images and not
                icons causes some serious performance
                issues */}
                {
                    centers.map((e, i) =>
                        <Marker
                            coordinate={new LatLng(e.address[0], e.address[1])}
                            icon={require('../../../assets/images/pin.png')}
                            title={e.name}
                            key={i}
                        >
                        </Marker>

                    )
                }
                {
                    location && centers.length > 0 &&
                    <Marker key={centers.length}
                        coordinate={new LatLng(location.latitude, location.longitude)}
                        icon={require('../../../assets/images/pin-user.png')}
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
        width: 400,
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