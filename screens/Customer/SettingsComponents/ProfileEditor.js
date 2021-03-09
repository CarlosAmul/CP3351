import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../../components/Themed';
import { Button, TextField, View, Colors } from 'react-native-ui-lib';
import UserContext from '../../../UserContext'

export default function ProfileEditor({ name, setName }) {

    const { user } = useContext(UserContext)

    Colors.loadColors({
        primary: '#6874e2',
        basic: '#f5f6fa',
    });

    const [isOpen, open] = useState(false)

    return (
        <View>
            <View style={styles.centerMargin}>
                <View style={styles.smallSeparator}></View>

                <Text>Name: </Text>
                <TextField
                    onChangeText={text => setName(text)}
                    hideUnderline
                    placeholder={user.name}
                    style={styles.inputText}
                    value={name}
                />
                <Button label={"Save"}
                    style={{ width: '80%' }}
                    backgroundColor={Colors.primary}
                    // onPress={ save }
                    // disabled={validate()}
                    marginT-15
                />

            </View>
        </View>
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
