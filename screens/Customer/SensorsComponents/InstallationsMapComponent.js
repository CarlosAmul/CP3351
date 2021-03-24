import React, { useState, useEffect, useContext, useMemo } from "react";
import { Alert, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { Assets, Image, Colors } from 'react-native-ui-lib';
import UserContext from '../../../UserContext'

import db from '../../../db'

class LatLng {
    constructor(latitude, longitude) {
        this.latitude = latitude
        this.longitude = longitude
    }
}

export default function InstallationMapComponent({ distances, centers, setClosest, closest }) {

    const { user } = useContext(UserContext)

    const [region, setRegion] = useState(null)

    Colors.loadColors({
        primary: '#6874e2',
        basic: '#f5f6fa',
    });

    // Save moved position to stay still
    // on component render
    const savePan = (r) => { setRegion(r) }

    const getClosestCenter = () => {
        if (centers.length > 0 && distances.length > 0) {
            let shortest = distances.reduce((prev, cur) => cur < prev ? cur : prev)
            let index = distances.indexOf(shortest)
            return centers[index]
        }
    }

    useEffect(() => setClosest(getClosestCenter()), [distances, centers])

    // console.log("s",closest)
    // console.log(distances.length)
    // console.log(centers.length)

    return (

        <View style={styles.container}>
            {
                closest &&
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
                        user.address &&
                        <Marker
                            coordinate={new LatLng(user.address[0], user.address[1])}
                            icon={require('../../../assets/images/pin-user.png')}
                            key={centers.length+1}
                        >
                        </Marker>
                    }
                    {
                        <Circle key={centers.length}
                            radius={closest.range * 1000}
                            strokeWidth={5}
                            fillColor={"#0000"}
                            strokeColor={Colors.primary}
                            center={new LatLng(closest.address[0], closest.address[1])}
                        >
                        </Circle>
                    }
                </MapView>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: Dimensions.get("window").width,
        alignItems: 'center',
        marginTop:"10%",
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