import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Text, ExpandableSection, Colors, TextArea, Button } from 'react-native-ui-lib'
import useColorScheme from '../../hooks/useColorScheme'
import { Entypo } from '@expo/vector-icons';
import db from '../../db'

export default function PendingQuestion({ faq, set }) {

    const [expanded, setExpanded] = useState(false)
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
        db.Users.Notifications.newNotification(faq.userid, 'Your Question has been answered: ' + faq.question, 'FAQs')
        set('Question has been answered')
        setTimeout(() => set(''), 3000)
    }

    const saveDraft = () => {
        db.FAQs.saveDraft(faq.id, answer)
        setExpanded(false)
        set('Draft saved')
        setTimeout(() => set(''), 3000)
    }

    const deleteQuestion = () => {
        db.FAQs.remove(faq.id)
        db.Users.Notifications.newNotification(faq.userid, 'Your Question has been deleted by Support: ' + faq.question, 'FAQs')
        set('Question has been deleted')
        setTimeout(() => set(''), 3000)
    }

    return (
        <View style={styles.container}>
            <ExpandableSection
                sectionHeader={drawHeader()}
                expanded={expanded}
                onPress={() => setExpanded(!expanded)}
                style={styles.container}
            >
                <View style={styles.formContainer}>
                    <View style={styles.textAreaContainer}>
                        <TextArea
                            placeholder={"Answer this question"}
                            style={{ marginBottom: 20 }}
                            onChangeText={text => setAnswer(text)}
                            value={faq.status == "draft" ? faq.answer : answer}
                        />
                    </View>
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Button
                            backgroundColor={Colors.grey30}
                            label={faq.status == 'draft' ? 'Save' : 'Save as Draft'}
                            labelStyle={{ fontWeight: '100' }}
                            style={{borderRadius: 5}}
                            enableShadow
                            onPress={() => saveDraft()}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            backgroundColor={Colors.primary}
                            label="Submit"
                            labelStyle={{ fontWeight: '100' }}
                            style={[styles.button, { width: '39%' }]}
                            enableShadow
                            onPress={() => submitAnswer()}
                        />
                        <Button
                            backgroundColor={Colors.red20}
                            label="Remove Question"
                            labelStyle={{ fontWeight: '100' }}
                            style={[styles.button, {width: '60%'}]}
                            enableShadow
                            onPress={() => deleteQuestion()}
                        />
                    </View>
                </View>
            </ExpandableSection>
        </View>

    );
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 10,
        width: 350
    },
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
