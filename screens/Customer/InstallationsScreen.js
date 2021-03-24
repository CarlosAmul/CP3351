import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import { Colors, Text, Card, Button } from 'react-native-ui-lib'
import UserContext from '../../UserContext'
import db from '../../db'

export default function InstallationsScreen() {

	const { user } = useContext(UserContext)

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

	const [sensors, setSensors] = useState([])
	useEffect(() => db.Sensors.listenByUser(setSensors, user.id), [])

	const [requests, setRequests] = useState([])

	useEffect(() => db.Sensors.Installations.listenByCustomer(setRequests, user.id), [sensors])

	const handleDetails = (req) => {
		navigation.navigate("DetailsScreen", { request: req })
	}

	const handleCancel = (req) => {
		(async()=>{
			await db.Sensors.Installations.removeInstallation(req.id, req.parent)
			let sensor = await db.Sensors.findOne(req.parent)
			let newSensor = {...sensor, request:"no"}
			await db.Sensors.update(newSensor)
		})()
	}

	return (
		<>
			<ScrollView>
				{
					requests.map(request =>
						<View key={request.id} style={styles.container}>
							<Text text60M>{request.type === "install" ? "Installation" : "Removal"} Request</Text>
							<Text>Made on: {request.on.toDate().toLocaleDateString()}</Text>
							<Text green10>Fee: {request.fee} QAR</Text>
							<View style={styles.horizontalView}>
								<Button label="Details"
									style={request.status !== "Finished" ? styles.smallButton : styles.flexButton}
									backgroundColor={Colors.primary}
									onPress={() => { handleDetails(request) }}
									marginT-15
								/>
								{
									request.status !== "Finished" &&
									< Button label="Cancel"
										style={styles.smallButton}
										backgroundColor={Colors.red10}
										onPress={() => { handleCancel(request) }}
										marginT-15
									/>
								}
							</View>
						</View>
					)
				}
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 25,
		margin: 15,
		padding: 15,
		justifyContent: 'center',
		backgroundColor: Colors.mainbg
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
	smallButton: {
		width: Dimensions.get("window").width / 2.5,
		margin: 5,
		alignSelf: "center"
	},
	flexButton: {
        width: Dimensions.get("window").width / 1.2,
        margin: 5,
        alignSelf: "center"
    },
	card: {
		padding: 10,
		paddingTop: 15,
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
