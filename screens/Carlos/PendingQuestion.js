import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Text, ExpandableSection, Colors, TextArea, Button } from 'react-native-ui-lib'
import useColorScheme from '../../hooks/useColorScheme'
import { Entypo } from '@expo/vector-icons';
import db from '../../db'

export default function PendingQuestion({ faq }) {

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
        console.log('question answered')
    }
    
    const saveDraft = () => {
        db.FAQs.saveDraft(faq.id, answer)
        console.log('Answer sent to drafts')
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
                            value={answer}
                        />
                    </View>
                </View>
                <Button
                    backgroundColor={Colors.primary}
                    label="Submit Answer"
                    labelStyle={{ fontWeight: '100' }}
                    style={{ marginBottom: 10 }}
                    enableShadow
                    onPress={() => submitAnswer()}
                />
                <Button
                    backgroundColor={Colors.grey30}
                    label="Save as Draft"
                    labelStyle={{ fontWeight: '100' }}
                    style={{ marginBottom: 10 }}
                    enableShadow
                    onPress={() => saveDraft()}
                />
                <Button
                    backgroundColor={Colors.red20}
                    label="Remove Question"
                    labelStyle={{ fontWeight: '100' }}
                    style={{ marginBottom: 10 }}
                    enableShadow
                />
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
        backgroundColor: Colors.grey60
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
