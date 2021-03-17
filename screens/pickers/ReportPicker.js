import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import db from '../../db'
import { Picker } from '@react-native-picker/picker';

export default function ReportPicker({ set, sensor }) {

    const [period, setPeriod] = useState(null)
    const [options, setOptions] = useState([])

    useEffect(() => set(period), [period])

    const oneDay = 1000 * 60 * 60 * 24;
    function dayDiff(a, b) {
        // UTC to discount daylight saving time
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.abs(Math.floor((utc2 - utc1) / oneDay));
    }

    // Set report period options based on oldest reading
    useEffect(() => {
        (async () => {

            let oldest = await db.Sensors.Readings.findOldestOne(sensor.id)
            // console.log("Oldest", new Date(oldest.when.toDate()).toUTCString() )
            console.log(dayDiff(new Date(), oldest.when.toDate()))

            let items = []

            // Oldest reading is a year or more
            if (dayDiff(new Date(), oldest.when.toDate()) >= 365) {
                items.push({ label: "Yearly", value: 0 })
                items.push({ label: "Weekly", value: 2 })
                items.push({ label: "Monthly", value: 1 })

            // Oldest reading is a month or more
            } else if (dayDiff(new Date(), oldest.when.toDate()) >= 30) {
                items.push({ label: "Monthly", value: 1 })
                items.push({ label: "Weekly", value: 2 })

            // Oldest reading is a week or more
            } else {
                items.push({ label: "Weekly", value: 2 })
            }

            setOptions(items)
        })()
    }, [sensor])

    return (
        <Picker
            style={{ height: 50, width: 200 }}
            selectedValue={period}
            onValueChange={setPeriod}
        >
            <Picker.Item label='Select Period' value="" />
            {
                options.map((e, i) =>
                    <Picker.Item key={i} label={e.label} value={e.value} />
                )
            }
        </Picker>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
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
