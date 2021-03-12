import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import UserContext from '../../UserContext'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import db from '../../db'
import { Colors, TabBar, TextField, TextArea, ChipsInput, Button, Card, Chip } from 'react-native-ui-lib'
import { MaterialIcons } from '@expo/vector-icons';

export default function FitnessTipsScreen() {

    const { user } = useContext(UserContext)

    const [userFitness, setUserFitness] = useState([])
    useEffect(() => db.FitnessTips.listenToUserFitnessTips(setUserFitness, user?.id || ""), [user])

    const [supports, setSupports] = useState([])
    useEffect(() => db.Users.listenToUsersByRole(setSupports, 'Support'), [])

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
    }, [navigation]);

    const [type, setType] = useState(0)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])

    const addTip = async () => {
        if (validate()) {
            await db.FitnessTips.create({ title, description, tags, userid: user.id, approved: false, approvedby: "" })
            setTitle("")
            setDescription("")
            setTags([])
            //give a notification to all the users
            await Promise.all(
                supports.map(async support => 
                    await db.Users.Notifications.newNotification(support.id, `${user.name} has submitted a fitness tip. `, 'AllFitness')
                )
            )
        }
    }

    const validate = () =>
        tags.length > 0 &&
        title !== "" &&
        description !== ""

    const remove = async (id) =>
        await db.FitnessTips.remove(id)

    return (
        <ScrollView style={styles.scrollcontainer}>
            <Text style={[styles.mainHeader, styles.title]}>Our sensors made you fit!</Text>
            <Text style={{ marginTop: -30, marginBottom: 20, textAlign: 'center' }}>You can give valuable tips to the public</Text>
            <TabBar
                backgroundColor={Colors.sidebg}
                onTabSelected={(index) => setType(index)}
                enableShadow
            >
                <TabBar.Item
                    label="Create Tips"
                    selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
                />
                <TabBar.Item
                    label="My Created Tips"
                    selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
                />
                <TabBar.Item
                    label="My Approved Tips"
                    selectedLabelStyle={{ color: Colors.primary, fontWeight: "bold" }}
                />
            </TabBar>
            {
                type === 0 ?
                    <View style={styles.fieldsContainer}>
                        <TextField
                            onChangeText={text => setTitle(text)}
                            hideUnderline
                            placeholder="Title"
                            style={[styles.inputText, { backgroundColor: Colors.mainbg }]}
                            value={title}
                        />
                        <View
                            style={{
                                height: 150,
                                marginBottom: 30,
                                padding: 10,
                                backgroundColor: Colors.mainbg,
                                borderRadius: 20
                            }}
                        >
                            <TextArea placeholder="Write Description.." value={description} onChangeText={text => setDescription(text)} />
                        </View>
                        <ChipsInput
                            containerStyle={styles.inputChips}
                            placeholder="Enter Tags"
                            hideUnderline
                            disableTagRemoval={false}
                            onChangeTags={(tags) => setTags(tags)}
                            tags={tags}
                        />
                        <Button
                            label="Post Tip"
                            style={styles.transparentButton}
                            labelStyle={{ color: Colors.darkprimary }}
                            onPress={() => addTip()}
                        />
                    </View>
                    :
                    type === 1 ?
                        <View>
                            {
                                userFitness.filter(f => f.approved === false).length === 0 ?
                                    <View style={styles.bigMsgContainer}>
                                        <Text style={[styles.bigMsg, {color: Colors.darkprimary}]}>Nothing here...</Text>
                                        <MaterialIcons name="hourglass-empty" size={45} color={Colors.darkprimary} />
                                    </View>
                                :
                                userFitness.filter(f => f.approved === false).map(tip =>
                                    <Card key={tip.id} style={styles.disapproved} elevation={12}>
                                        <Card.Section
                                            contentStyle={{ marginBottom: 10 }}
                                            content={[{ text: tip.title, text50M: true, color: Colors.darkprimary, margin: 20 }]}
                                        />
                                        <Card.Section
                                            content={[{ text: tip.description, text65M: true, color: Colors.violet50, margin: 20 }]}
                                        />
                                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                                            {
                                                tip.tags.map((tag, index) =>
                                                    <Chip
                                                        key={index}
                                                        label={"#" + tag}
                                                        labelStyle={{ color: Colors.darksecondary }}
                                                        containerStyle={{ borderWidth: 0, width: 100 }}
                                                    />
                                                )
                                            }
                                        </View>
                                        <Button
                                            label={<MaterialIcons name="delete" size={24} color={Colors.secondary} />}
                                            onPress={() => remove(tip.id)}
                                            style={{backgroundColor: 'transparent'}}
                                        />
                                    </Card>
                                )
                            }
                        </View>
                        :
                        <View>
                            {
                                userFitness.filter(f => f.approved === true).map(tip =>
                                    <Card key={tip.id} style={styles.disapproved} elevation={12}>
                                        <Card.Section
                                            contentStyle={{ marginBottom: 10 }}
                                            content={[{ text: tip.title, text50M: true, color: Colors.darkprimary, margin: 20 }]}
                                        />
                                        <Card.Section
                                            content={[{ text: tip.description, text65M: true, color: Colors.violet50, margin: 20 }]}
                                        />
                                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                                            {
                                                tip.tags.map((tag, index) =>
                                                    <Chip
                                                        key={index}
                                                        label={"#" + tag}
                                                        labelStyle={{ color: Colors.darksecondary }}
                                                        containerStyle={{ borderWidth: 0, width: 100 }}
                                                    />
                                                )
                                            }
                                        </View>
                                    </Card>
                                )
                            }
                        </View>
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollcontainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mainHeader: {
        color: "#6874e2",
        margin: 40,
        textAlign: "center"
    },
    inputText: {
        backgroundColor: Colors.mainbg,
        borderRadius: 20,
        padding: 10,
        width: '80%'
    },
    fieldsContainer: {
        margin: 20
    },
    inputArea: {
        backgroundColor: "#f5f6fa",
        padding: 10
    },
    inputChips: {
        backgroundColor: "#f5f6fa",
        borderRadius: 20,
        padding: 10,
        height: 150,
        marginBottom: 30
    },
    transparentButton: {
        backgroundColor: "#ff467725",
        color: "#ff466a"
    },
    disapproved: {
        margin: 30,
        padding: 20
    },
    bigMsg: {
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold'
    },
    bigMsgContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})