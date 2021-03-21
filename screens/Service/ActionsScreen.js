import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import { Colors, Text, Card, Button } from 'react-native-ui-lib'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import db from '../../db'
import { AntDesign } from '@expo/vector-icons';

export default function ActionsScreen() {

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

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            // @ts-expect-error
            headerLeft: () => (<MenuIcon />)
        });
    });

    const [categories, setCategories] = useState([])
    useEffect(() => db.Categories.listenAll(setCategories), [])

    return (
        <ScrollView contentContainerStyle={[styles.container, , { backgroundColor: Colors.sidebg }]}>
            <Card
                style={{ padding: 30, marginBottom: 40, backgroundColor: Colors.darksecondary }}
                elevation={15}
            >
                <Card.Section
                    content={[{ text: "We are proud of our fast service", text60BO: true, white: true, }]}
                    contentStyle={{ flex: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}
                />
                <View style={{ flex: 0, flexDiretion: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.darksecondary }}>
                    <Ionicons name="md-settings" size={50} color="white" />
                    {/* <MaterialCommunityIcons name="trophy-award" size={60} color="white" /> */}
                </View>
            </Card>
            <View>
                <Text style={[styles.title, styles.mainHeader, { color: Colors.primary }]}>
                    As a service user, you provide service to our customers in various aspects.
                </Text>
                <Image
                    source={{
                        uri: 'https://image.freepik.com/free-vector/sport-fitness-tracker-abstract-concept-vector-illustration-activity-band-health-monitor-wrist-worn-device-application-running-cycling-every-day-training-abstract-metaphor_335657-1454.jpg'
                    }}
                    style={{ width: 350, height: 350 }}
                />
                <Text style={styles.subtitle}>Manage Safety Instructions</Text>
                <ScrollView contentContainerStyle={styles.horizontalView}>
                    {
                        categories.map(category =>
                            <Card
                                key={category.id}
                                borderRadius={10}
                                style={styles.card}
                                elevation={12}
                            >
                                <Card.Image
                                    source={{ uri: category.url }}
                                    style={{ width: 100, height: 100, margin: 10 }}
                                />
                                <Card.Section
                                    content={[{ text: category.name, text60BO: true, dark10: true }]}
                                />
                                <Button
                                    style={{ backgroundColor: 'transparent' }}
                                    label={<AntDesign name="pluscircle" size={24} color={Colors.secondary} />}
                                    onPress={() => navigation.navigate("SafetyInstructionsScreen", { categoryid: category.id })}
                                />
                            </Card>
                        )
                    }
                </ScrollView>
                <Text style={styles.subtitle}>Manage Safety Instructions</Text>
                <ScrollView contentContainerStyle={styles.horizontalView}>
                    {
                        <Card
                            borderRadius={10}
                            style={styles.card, {marginLeft: 0}}
                            elevation={12}
                        >
                            <Card.Section
                                content={[{ text: "Check pending service requests under your installations screen", marginR:20, text60BO: true, dark10: true }]}
                            />
                            <Button
                                style={{ backgroundColor: 'transparent' }}
                                onPress={() => navigation.navigate("InstallationsScreen")}
                            />
                        </Card>
                    }
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10
    },
    mainHeader: {
        margin: 10,
        textAlign: 'center'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    horizontalView: {
        flex: 1,
        flexDirection: 'row'
    },
    card: {
        padding: 10,
        paddingTop: 20,
        paddingLeft: 20,
        backgroundColor: "#ffffff",
        margin: 20,
        width: 400,
        textAlign: "center",
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
