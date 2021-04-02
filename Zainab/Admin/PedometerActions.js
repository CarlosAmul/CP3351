import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import db from '../../db'
import UserContext from '../../UserContext'
import {Colors} from 'react-native-ui-lib'

export default function PedometerActions({ sensor }) {

  const { user } = useContext(UserContext)

  const [reading, setReading] = useState(null)
  useEffect(() => db.Sensors.Readings.listenLatestOne(setReading, sensor.id), [sensor])

  const uploadReading = async () => await db.Sensors.Readings.createReading(sensor.id, {
    when: new Date(),
    current: (reading?.current || 500) + Math.floor(Math.random() * 100) - 10
  })

  const handleToggleAlert = async () => await db.Sensors.toggleAlert(sensor)

  const updateGoal = async (goal) => await db.Sensors.update({ ...sensor, goal})

  return (
    <View style={[styles.helpContainer, {backgroundColor: Colors.yellow70, padding: 10}]}>
      <TouchableOpacity onPress={() => updateGoal(-100)}>
        <Text style={{color: Colors.blue10}}>
          Decrement goal by 100
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateGoal(100)}>
        <Text style={{color: Colors.blue10}}>
          Increment goal by 10
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadReading}>
        <Text style={{color: Colors.blue10}}>
          Upload new random step counters
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
