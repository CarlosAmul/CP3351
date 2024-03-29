import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../../components/Themed';
import CategoryPicker from '../pickers/CategoryPicker'
import SensorByCategoryPicker from '../pickers/SensorByCategoryPicker'
import TemperatureActions from './TemperatureActions'
import MotionActions from './MotionActions'
import BPMonitorActions from '../../Carlos/BPMonitorActions'
import { useNavigation } from '@react-navigation/native'
import MenuIcon from '../../components/MenuIcon'
import AdminTabs from '../../Zainab/AdminTabs'
import { Colors } from 'react-native-ui-lib'
import AdminCategories from '../../Zainab/AdminCategories'
import Manufacturers from '../../Zainab/Manufacturers'
import TechsTab from '../Admin/TechsTab'
import db from '../../db'

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
                            <View style={styles.container}>

                                <TouchableOpacity onPress={handleStartSimulator} style={styles.title} disabled={out?.status === "Running"}>
                                    <Text style={styles.helpLinkText} lightColor={Colors.primary}>
                                        Start simulator
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelay(-1)} style={styles.title} disabled={out?.delay <= 1}>
                                    <Text style={styles.helpLinkText} lightColor={Colors.primary}>
                                        Decrement delay by 1
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelay(1)} style={styles.title}>
                                    <Text style={styles.helpLinkText} lightColor={Colors.primary}>
                                        Increment delay by 1
                                </Text>
                                </TouchableOpacity>
                                <Text style={styles.helpLinkText} lightColor={Colors.primary}>
                                    Status: {out?.status} Delay: {out?.delay}
                                </Text>
                                <TouchableOpacity onPress={handleStopSimulator} style={styles.title} disabled={out?.status !== "Running"}>
                                    <Text style={styles.helpLinkText} lightColor={Colors.primary}>
                                        Stop simulator
                                </Text>
                                </TouchableOpacity>

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
                                    category.name === "Blood Pressure"
                                    &&
                                    <BPMonitorActions sensor={sensor} />
                                }
                            </View>
                            :
                            <TechsTab />
            }

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mainbg
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
