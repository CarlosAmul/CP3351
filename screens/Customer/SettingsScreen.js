import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View, Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import ProfileEditor from './SettingsComponents/ProfileEditor.js'
import UserMapComponent from './SettingsComponents/UserMapComponent.js'

import UserContext from '../../UserContext'
import fb from '../../fb'
import db from '../../db'

export default function SettingsScreen() {

	const navigation = useNavigation();
	useEffect(() => {
		navigation.setOptions({
			// @ts-expect-error
			headerLeft: () => (<MenuIcon />)
		});
	}, [navigation]);

	const { user } = useContext(UserContext)

	const logout = async () => {
		await fb.auth().signOut()
	}

	const [isOpen, open] = useState(false)

	// User settings for profile editing
	const [userLocation, setUserLocation] = useState(null)
	const [name, setName] = useState("")

	Colors.loadColors({
		primary: '#6874e2',
		basic: '#f5f6fa',
	});

	const save = () => {
		let location = [userLocation.latitude, userLocation.longitude]
		db.Users.update({ ...user, name: name, address: location })
		open(!isOpen)
	}

	const validate = () =>
		name.length === 0 ||
		userLocation === null


	return (
		<View>
			<View style={styles.getStartedContainer}>
				<Button label="Logout"
					style={{ width: '80%' }}
					backgroundColor={Colors.primary}
					onPress={logout}
					marginT-15
				/>
				<Button label={isOpen ? "Cancel Edit" : "Edit Profile"}
					style={{ width: '80%' }}
					backgroundColor={Colors.primary}
					onPress={() => open(!isOpen)}
					marginT-15
				/>
			</View>
			<View style={styles.centerMargin}>
				<View style={styles.smallSeparator}></View>
				{
					isOpen &&
					<ProfileEditor name={name} setName={setName} location={userLocation}
						validate={validate} save={save}
					/>
				}
			</View>
			{
				isOpen &&
				<UserMapComponent set={setUserLocation} location={userLocation} />
			}
		</View>
	);
}

const styles = StyleSheet.create({
	tinyLogo: {
		width: 150,
		height: 150,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	developmentModeText: {
		marginBottom: 20,
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	centerMargin: {
		marginHorizontal: 50,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	codeHighlightContainer: {
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		lineHeight: 24,
		textAlign: 'center',
	},
	helpContainer: {
		marginTop: 15,
		marginHorizontal: 20,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		textAlign: 'center',
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
	smallSeparator: {
		marginVertical: 10,
		height: 1,
		width: '80%',
	},
});