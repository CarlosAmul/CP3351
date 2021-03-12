import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../UserContext'
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import { ExpandableSection, TextArea, Button, Colors } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PendingQuestion from './PendingQuestion'
import { createImportSpecifier } from 'typescript';

export default function PendingQuestions() {

    
    const navigation = useNavigation();

    const { user } = useContext(UserContext)

    const [faqs, setFaqs] = useState([])
    useEffect(() => db.FAQs.listenAllPending(setFaqs), [])

    return (
        <ScrollView contentContainerStyle={styles.helpContainer}>
            <View style={{ marginTop: 20 }}>
                {
                    faqs.map(
                        faq =>
                            <PendingQuestion key={faq.id} faq={faq}>
                            </PendingQuestion>
                    )
                }
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    statusMessage: {
        color: 'green',
        alignSelf: 'center',
        marginTop: 10
    },
    header: {
        fontSize: 20,
        color: Colors.primary,
        alignSelf: 'center'
    },
    icon: {
        position: 'absolute',
        marginLeft: 310,
        marginTop: 15
    },
    headerSection: {
        padding: 10,
        width: 350
    },
    submitContainer: {
        padding: 5,
        width: 350
    },
    textAreaContainer: {
        padding: 30,
        width: 350
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center'
    },
    notifContainer: {
        flex: 1
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
