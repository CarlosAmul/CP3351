import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Text, ExpandableSection, Colors } from 'react-native-ui-lib'
import useColorScheme from '../../hooks/useColorScheme'
import { Entypo } from '@expo/vector-icons';
import db from '../../db'

export default function FAQ({ faq }) {
    // const [sender, setSender] = useState(null)
    // useEffect(() => db.Users.listenOne(setSender, faq.userid), [])
    const colorScheme = useColorScheme();
    const [expanded, setExpanded] = useState(false)

    const drawHeader = () => {
        return (
            <View style={styles.headerSection}>
                <Text style={{fontSize: 20}} color={Colors.primary}>{faq.question}</Text>
                <View style={styles.icon}>
                    <Entypo name={expanded ? "chevron-thin-up" : "chevron-thin-down"} size={15} color={expanded? Colors.primary : 'gray'} />
                </View>
            </View>
        )
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
                    <Text style={{fontSize: 15}}>{faq.answer}</Text>
                </View>
            </ExpandableSection>
        </View>

    );
}

const styles = StyleSheet.create({
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
