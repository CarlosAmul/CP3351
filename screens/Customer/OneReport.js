import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, View, Colors, Card } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'

import { BarChart } from "react-native-chart-kit";

import UserContext from '../../UserContext'

export default function OneReport({ type, data, labels }) {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    }, [navigation]);

    const { user } = useContext(UserContext)

    const [suffix, setSuffix] = useState("")

    useEffect(() => {
        if (type) {
            switch (type) {
                case "Temperature":
                    setSuffix("C")
                    break;
                case "Motion":
                    setSuffix(" Steps")
                default:
                    break;
            }
        }
    }, [type])

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

    const config = {
        // backgroundColor: "#e26a00",
        // backgroundColor: `${Colors.primary}`,
        backgroundGradientFrom: `${Colors.primary}`,
        backgroundGradientTo: `${Colors.primary}`,
        decimalPlaces: 2, // optional, defaults to 2dp
        // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        color: () => `${Colors.secondary}`,
        labelColor: () => `${Colors.basic}`,
        style: {
            borderRadius: 0
        },
    }

    return (
        <View style={styles.getStartedContainer}>
            {
                suffix.length > 0 &&
                <>
                    <BarChart
                        data={{
                            labels: labels,
                            datasets: [{ data: data }]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisSuffix={suffix}
                        chartConfig={config}
                        style={{ marginVertical: 0 }}
                    />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    cardContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        padding: 20,
        margin: 5,
        borderWidth: 2,
        borderColor: 'lightgray',
        color: 'red'
    },
    cardRead: {
        backgroundColor: 'lightgray',
        color: 'black'
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
    centerMargin: {
        marginHorizontal: 50,
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
    smallSeparator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },
});