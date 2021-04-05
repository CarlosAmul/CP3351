import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import db from '../../db'
import { Picker } from '@react-native-picker/picker';

export default function InstallationEditPicker({ set, request }) {

    const [option, setOption] = useState("")
    const [options, setOptions] = useState([])

    useEffect(() => set(option), [])

    useEffect(() => {
        (async () => {
            let items = []
            if (request.status === "Assigned")
                items.push({ label: "Arrived", value: "Arrived" })
            items.push({ label: "Finished", value: "Finished" },)
            setOptions(items)
        })()
    }, [request])

    const handleChange = (value) => {
        setOption(value)
        set(value)
    }

    return (
        <Picker
            style={{ height: 50, flex:1 }}
            selectedValue={option}
            onValueChange={handleChange}
        >
            <Picker.Item label='Select request status' value="" />
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
