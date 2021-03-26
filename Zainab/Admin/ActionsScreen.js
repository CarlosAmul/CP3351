import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import CategoryPicker from '../../screens/pickers/CategoryPicker'
import SensorByCategoryPicker from '../../screens/pickers/SensorByCategoryPicker'
import TemperatureActions from '../../screens/Admin/TemperatureActions'
import MotionActions from '../../screens/Admin/MotionActions'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import AdminTabs from './AdminTabs'
import { Colors } from 'react-native-ui-lib'
import AdminCategories from './AdminCategories'
import Manufacturers from './Manufacturers'

export default function ActionsScreen() {

    useEffect(() => {
        Colors.loadColors({
            primary: '#6874e2',
            secondary: '#f9ce7f',
            mainbg: '#f5f6fa',
            sidebg: '#ffffff',
        });
    }, [Colors])

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

    return (
        <>
            <AdminTabs set={setSelectedTab} />
            {
                selectedTab === 0 ?
                    <AdminCategories />
                :
                selectedTab === 1 ?
                    <Manufacturers />
                :
                    <View style={styles.container}>
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
                    </View>
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
