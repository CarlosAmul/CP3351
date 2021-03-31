import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../../components/Themed';
import CategoryPicker from '../../screens/pickers/CategoryPicker'
import SensorByCategoryPicker from '../../screens/pickers/SensorByCategoryPicker'
import TemperatureActions from '../../screens/Admin/TemperatureActions'
import MotionActions from '../../screens/Admin/MotionActions'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import AdminTabs from './AdminTabs'
import { Colors, Card } from 'react-native-ui-lib'
import AdminCategories from './AdminCategories'
import Manufacturers from './Manufacturers'
import TechsTab from '../../screens/Admin/TechsTab'
import db from '../../db'
import HeartRateMonitorActions from './HeartRateMonitorActions'
import PedometerActions from './PedometerActions'

export default function ActionsScreen() {

    Colors.loadColors({
        primary: '#6874e2',
        secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
        sidebg: '#ffffff',
        darkprimary: '#ff466a',
        darksecondary: '#0df5e3',
        darkmainbg: '#201a31',
        darksidebg: '#38304d'
    });

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const [category, setCategory] = useState(null)
    useEffect(() => setSensor(null), [category])
    const [sensor, setSensor] = useState(null)

    const [selectedTab, setSelectedTab] = useState(0)


    const [out, setOut] = useState(null)
    useEffect(() => db.Simulator.listenOne(setOut, "out"), [])

    let delay = 5
    // start uploading random readings every 5 seconds
    const handleStartSimulator = () => {
        db.Simulator.update({ id: "in", command: "Start", delay: delay })
    }

    const handleStopSimulator = () => {
        db.Simulator.update({ id: "in", command: "Stop" })
    }

    const handleDelay = async change => {
        delay = out.delay + change
        handleStopSimulator()
        handleStartSimulator()
    }

    return (
        <>
            <AdminTabs set={setSelectedTab} />
            {
                selectedTab === 0 ?
                    <AdminCategories />
                    :
                    selectedTab === 1 ?
                        <Manufacturers />
                        : selectedTab === 2 ?
                            <View style={[{ backgroundColor: Colors.white }, styles.container]}>
                                <View style={[styles.simulationDetails, { backgroundColor: "#DCFDDE" }]}>
                                    <TouchableOpacity onPress={handleStartSimulator} disabled={out?.status === "Running"}>
                                        <Card style={[styles.sensorField, { backgroundColor: Colors.yellow70 }]} elevation={12}>
                                            <Text
                                                style={styles.getStartedText}
                                            >
                                                Start Simulator
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelay(-1)} disabled={out?.delay <= 1}>
                                        <Card style={[styles.sensorField, { backgroundColor: Colors.red70 }]} elevation={12}>
                                            <Text
                                                style={styles.getStartedText}
                                            >
                                                Decrement Delay by 1
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelay(1)}>
                                        <Card style={[styles.sensorField, { backgroundColor: Colors.purple70 }]} elevation={12}>
                                            <Text
                                                style={styles.getStartedText}
                                            >
                                                Increment Delay by 1
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                    <Card style={[styles.sensorField, { backgroundColor: Colors.blue70 }]} elevation={12}>
                                        <Text
                                            style={styles.getStartedText}
                                        >
                                            {out?.status} at delay {out?.delay}
                                        </Text>
                                    </Card>
                                    <TouchableOpacity onPress={handleStopSimulator} disabled={out?.status !== "Running"}>
                                        <Card style={[styles.sensorField, { backgroundColor: Colors.orange60 }]} elevation={12}>
                                            <Text
                                                style={styles.getStartedText}
                                            >
                                                Stop Simulator
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.sensorControls, {backgroundColor: Colors.yellow70}]}>
                                    <CategoryPicker set={setCategory} />
                                    {
                                        category
                                        &&
                                        <SensorByCategoryPicker category={category} set={setSensor} />
                                    }
                                    {
                                        category
                                        &&
                                        sensor
                                        &&
                                        category.name === "Motion"
                                        &&
                                        <MotionActions sensor={sensor} />
                                    }
                                    {
                                        category
                                        &&
                                        sensor
                                        &&
                                        category.name === "Temperature"
                                        &&
                                        <TemperatureActions sensor={sensor} />
                                    }
                                    {
                                        category
                                        &&
                                        sensor
                                        &&
                                        category.name === "Heart Rate Monitor"
                                        &&
                                        <HeartRateMonitorActions sensor={sensor} />
                                    }
                                    {
                                        category
                                        &&
                                        sensor
                                        &&
                                        category.name === "Pedometer"
                                        &&
                                        <PedometerActions sensor={sensor} />
                                    }
                                </View>
                            </View>
                            :
                            <TechsTab />
            }

        </>
    );
}

const styles = StyleSheet.create({
    simulationDetails: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 20,
        width: 300
    },
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
    sensorField: {
        padding: 5,
        width: 200,
        margin: 10
    },
    getStartedText: {
        textAlign: 'center'
    },
    sensorControls: {
        width: 300,
        margin: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
