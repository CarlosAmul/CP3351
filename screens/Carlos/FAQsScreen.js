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
import FAQ from './FAQ'
import { createImportSpecifier } from 'typescript';

export default function FAQsScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const { user } = useContext(UserContext)

    const [faqs, setFaqs] = useState([])
    useEffect(() => db.FAQs.listenAllAnswered(setFaqs), [])

    const [expanded, setExpanded] = useState(false)
    const [question, setQuestion] = useState('')
    const [statusHidden, setStatusHidden] = useState(true)
    console.log(question)

    const drawFormHeader = () => {
        return (
            <View style={styles.headerSection}>
                <Text style={styles.header}>Submit a Question</Text>
                <View style={styles.icon}>
                    <Entypo name={expanded ? "chevron-thin-up" : "chevron-thin-down"} size={15} color={expanded ? Colors.primary : 'gray'} />
                </View>
            </View>
        )
    }

    const submitQuestion = () => {
        db.FAQs.create({question ,answer: "", userid: user.id})
        console.log('Question Sent2!')
        setExpanded(false)
        setQuestion("")
        setStatusHidden(false)
        setTimeout(() => setStatusHidden(true), 3000)
    }

    const drawSubmitForm = () => {
        return (
            <View style={styles.submitContainer}>
                <View style={styles.textAreaContainer}>
                    <TextArea
                        placeholder={"What's on your mind?"}
                        style={{ marginBottom: 20 }}
                        onChangeText={text => setQuestion(text)}
                        placeholder={"What's on your mind?"}
                        value={question}
                    />
                </View>
                <Button
                    backgroundColor={Colors.primary}
                    label="Submit Question"
                    labelStyle={{ fontWeight: '100' }}
                    style={{ marginBottom: 10 }}
                    enableShadow
                    onPress={submitQuestion}
                />
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.helpContainer}>
            <View style={{ borderBottomWidth: 2, borderBottomColor: 'lightgray' }}>
                <ExpandableSection
                    sectionHeader={drawFormHeader()}
                    expanded={expanded}
                    onPress={() => setExpanded(!expanded)}
                >
                    {drawSubmitForm()}
                </ExpandableSection>
            </View>
            {
                !statusHidden &&
                <View style={{ backgroundColor: '#f2f2f2' }}>
                    <Text style={styles.statusMessage}>Question Submitted!</Text>
                </View>
            }
            <View style={{ marginTop: 20 }}>
                {
                    faqs.map(
                        faq =>
                            // {console.log(faq)},
                            <FAQ key={faq.id} faq={faq}>
                            </FAQ>
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
