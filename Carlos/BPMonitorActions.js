import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import db from '../db'
import UserContext from '../UserContext'

export default function TemperatureActions({ sensor }) {

  const { user } = useContext(UserContext)

  const [reading, setReading] = useState(null)
  useEffect(() => db.Sensors.Readings.listenLatestOne(setReading, sensor.id), [sensor])

  const changeOps = ['+', '-']

  const uploadReading = async () => {
    const op = Math.floor(Math.random() * 2)

    changeOps[op] === '+' ?
    await db.Sensors.Readings.createReading(sensor.id, {
      when: new Date(),
      current: {
        sys: (reading?.current.sys || 120) * 1 + Math.floor(Math.random() * 2),
        dia: (reading?.current.dia || 80) * 1 + Math.floor(Math.random() * 2),
        pulse: (reading?.current.pulse || 72) * 1 + Math.floor(Math.random() * 2)
      }
    })
    :
    await db.Sensors.Readings.createReading(sensor.id, {
      when: new Date(),
      current: {
        sys: (reading?.current.sys || 120) * 1 - Math.floor(Math.random() * 2),
        dia: (reading?.current.dia || 80) * 1 - Math.floor(Math.random() * 2),
        pulse: (reading?.current.pulse || 72) * 1 - Math.floor(Math.random() * 2)
      }
    })
  }

  const handleToggleAlert = async () => await db.Sensors.toggleAlert(sensor)

  //   const updateMinMax = async (minmax, amount) => await db.Sensors.update({ ...sensor, [minmax]: sensor[minmax] + amount })

  return (
    <View style={styles.helpContainer}>
      <TouchableOpacity onPress={uploadReading} style={styles.title}>
        <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
          Upload a new random reading
    </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleToggleAlert} style={styles.title}>
        <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
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
