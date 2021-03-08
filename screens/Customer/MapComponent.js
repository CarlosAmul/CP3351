import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class LatLng {
  constructor(latitude, longitude){
    this.latitude = latitude
    this.longitude = longitude
  }
}

export default function MapComponent() {

  return (

    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomEnabled={true}
        region={{
          latitude: 25.28625331405168,
          longitude: 51.42407464959876,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={ new LatLng(25.28625331405168, 51.42407464959876) }
        >
          <View style={{ backgroundColor: "red", padding: 10 }}>
            <Text>SF</Text>
          </View>
        </Marker>
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