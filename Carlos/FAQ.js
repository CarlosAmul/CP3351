import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { Button, Text, ExpandableSection, Colors, TextArea } from 'react-native-ui-lib'
import useColorScheme from '../hooks/useColorScheme'
import { Entypo } from '@expo/vector-icons';
import db from '../db'
// import { user } from 'firebase-functions/lib/providers/auth';
import UserContext from '../UserContext'

export default function FAQ({ faq }) {
    // const [sender, setSender] = useState(null)
    // useEffect(() => db.Users.listenOne(setSender, faq.userid), [])


    const { user } = useContext(UserContext)
    const colorScheme = useColorScheme();
    const [expanded, setExpanded] = useState(false)
    const [inEdit, setInEdit] = useState(false)
    const [answer, setAnswer] = useState('')


    const drawHeader = () => {
        return (
            <View style={styles.headerSection}>
                <Text style={{ fontSize: 20 }} color={Colors.primary}>{faq.question}</Text>
                <View style={styles.icon}>
                    <Entypo name={expanded ? "chevron-thin-up" : "chevron-thin-down"} size={15} color={expanded ? Colors.primary : 'gray'} />
                </View>
            </View>
        )
    }

    const submitAnswer = () => {
        db.FAQs.answerFAQ(faq.id, answer)
        db.Users.Notifications.newNotification(faq.userid, 'Answer to your question has been updated: ' + faq.question, 'FAQs')
        setInEdit(false)
        setExpanded(false)
    }

    const deleteQuestion = () => {
        db.FAQs.remove(faq.id)
        db.Users.Notifications.newNotification(faq.userid, 'Your Question has been deleted by Support: ' + faq.question, 'FAQs')
        console.log('question deleted')
    }

    return (
        <View style={styles.container}>
            <ExpandableSection
                sectionHeader={drawHeader()}
                expanded={expanded}
                onPress={() => setExpanded(!expanded)}
                style={styles.container}
            >
                <View style={styles.section}>
                    {
                        !inEdit ?
                            <Text style={{ fontSize: 15 }}>{faq.answer}</Text>
                            :
                            <View style={styles.textAreaContainer}>
                                <TextArea
                                    style={{ marginBottom: 20 }}
                                    onChangeText={text => setAnswer(text)}
                                    value={faq.answer}
                                />
                            </View>
                    }
                    {
                        user.role != 'Customer' &&
                        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                            {
                                !inEdit ?
                                    <>
                                        <Button
                                            backgroundColor={Colors.primary}
                                            label="Edit Answer"
                                            labelStyle={{ fontWeight: '100' }}
                                            style={styles.button}
                                            enableShadow
                                            onPress={() => setInEdit(true)}
                                        />
                                        <Button
                                            backgroundColor={Colors.red20}
                                            label="Delete Question"
                                            labelStyle={{ fontWeight: '100' }}
                                            style={styles.button}
                                            enableShadow
                                            onPress={() => deleteQuestion()}
                                        />
                                    </>
                                    :
                                    <>
                                        <Button
                                            backgroundColor={Colors.primary}
                                            label="Submit"
                                            labelStyle={{ fontWeight: '100' }}
                                            style={styles.button}
                                            enableShadow
                                            onPress={() => submitAnswer()}
                                        />
                                        <Button
                                            backgroundColor={Colors.red20}
                                            label="Cancel"
                                            labelStyle={{ fontWeight: '100' }}
                                            style={styles.button}
                                            enableShadow
                                            onPress={() => setInEdit(false)}
                                        />
                                    </>
                            }
                        </View>
                    }

                </View>
            </ExpandableSection>
        </View>

    );
}

const styles = StyleSheet.create({
    textAreaContainer: {
        padding: 20,
        backgroundColor: Colors.grey60,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.grey40
    },
    button: {
        marginBottom: 10,
        width: '49%',
        borderRadius: 5
    },
    text: {
        width: '100%'
    },
    header: {
        fontSize: 20
    },
    icon: {
        position: 'absolute',
        marginLeft: 310,
        marginTop: 15
    },
    container: {
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
    },
    headerSection: {
        padding: 10,
        width: 350
    },
    section: {
        padding: 10,
        paddingTop: 2,
        paddingBottom: 20,
        width: 350
    }
});
