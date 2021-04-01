import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ExpandableSection, Button } from 'react-native-ui-lib'
import { Colors } from 'react-native-ui-lib'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Vacancy({ vacancy, navigation }) {

    Colors.loadColors({
        primary: '#6874e2',
        secondary: '#f9ce7f',
        mainbg: '#f5f6fa',
        sidebg: '#ffffff',
    });

    const [expanded, setExpanded] = useState(false)

    const drawHeader = () => {
        return (
            <View style={[styles.headerSection, styles.listItem]}>
                <Text style={{ fontSize: 20, color: Colors.green10 }}>{vacancy.role}</Text>
                <View style={styles.icon}>
                    {
                        expanded ?
                            <FontAwesome5 name="eye-slash" size={24} color={Colors.green10} />
                            :
                            <FontAwesome5 name="eye" size={24} color={Colors.green10} />
                    }
                </View>
            </View>
        )
    }

    return (
        <ExpandableSection
            sectionHeader={drawHeader()}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
        >
            <View style={styles.section}>
                <Text style={{ fontSize: 15, width: 340 }}>{vacancy.description}</Text>
                <Text style={{ fontSize: 17, width: 340 }}>Spaces: {vacancy.spaces}</Text>
            </View>
            {
                vacancy.spaces > 0 ?
                    <Button
                        label="Apply Now"
                        labelStyle={{ color: "#ff466a" }}
                        style={{ backgroundColor: "#ff467720", marginBottom: 20, width: 200, alignSelf: 'center' }}
                        onPress={() => navigation.navigate('ApplicationScreen', {vacancy: vacancy})}
                    />
                :
                    null
            }
        </ExpandableSection>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        backgroundColor: "#DCFDDE",
        borderRadius: 20,
        marginBottom: 20
    },
    section: {
        marginTop: -10,
        marginLeft: 20,
        marginBottom: 10,
        flexWrap: 'wrap',
        width: 200,
        justifyContent: 'center'
    },
    headerSection: {
        padding: 10,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "center"
    },
})