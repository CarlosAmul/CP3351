import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import db from '../../db'
import UserContext from '../../UserContext'
import {Colors} from 'react-native-ui-lib'

export default function HeartRateMonitorActions({ sensor }) {

  const { user } = useContext(UserContext)

  const [reading, setReading] = useState(null)
  useEffect(() => db.Sensors.Readings.listenLatestOne(setReading, sensor.id), [sensor])

  const uploadReading = async () => await db.Sensors.Readings.createReading(sensor.id, {
    when: new Date(),
    current: (reading?.current || 36) + Math.floor(Math.random() * 5)
  })

  const handleToggleAlert = async () => await db.Sensors.toggleAlert(sensor)

  const updateMinMax = async (minmax, amount) => await db.Sensors.update({ ...sensor, [minmax]: sensor[minmax] + amount })

  return (
    <View style={[styles.helpContainer, {backgroundColor: Colors.yellow70, padding: 10}]}>
      <TouchableOpacity onPress={() => updateMinMax('min', -1)}>
        <Text style={{color: Colors.blue10}}>
          Decrement min rate by 1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateMinMax('min', 1)}>
        <Text style={{color: Colors.blue10}}>
          Increment min rate by 1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateMinMax('max', -1)}>
        <Text style={{color: Colors.blue10}}>
          Decrement max rate by 1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateMinMax('max', 1)}>
        <Text style={{color: Colors.blue10}}>
          Increment max rate by 1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadReading}>
        <Text style={{color: Colors.blue10}}>
          Upload a new random rate
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleToggleAlert}>
        <Text style={{color: Colors.blue10}}>
          Toggle alert field
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
