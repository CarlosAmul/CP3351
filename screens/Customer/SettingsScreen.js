import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../components/Themed';
import { Button, TextField, View, Colors } from 'react-native-ui-lib';
import UserContext from '../../UserContext'
import fb from '../../fb'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import MapComponent from './MapComponent';

export default function SettingsScreen() {

	const navigation = useNavigation();
	useEffect(() => {
		navigation.setOptions({
			// @ts-expect-error
			headerLeft: () => (<MenuIcon />)
		});
	});

	const { user } = useContext(UserContext)

	const logout = async () => {
		await fb.auth().signOut()
	}

	console.log(user)

	const [openProfileEditor, setOpenProfileEditor] = useState(false)
	const [name, setName] = useState("")

	Colors.loadColors({
		primary: '#6874e2',
		basic: '#f5f6fa',
	});

	return (
		<View>
			<View style={styles.getStartedContainer}>
				<Button label="Logout"
					style={{ width: '80%' }}
					backgroundColor={Colors.primary}
					onPress={logout}
					marginT-15
				/>
				<Button label={openProfileEditor ? "Cancel Edit" : "Edit Profile"}
					style={{ width: '80%' }}
					backgroundColor={Colors.primary}
					onPress={() => setOpenProfileEditor(!openProfileEditor)}
					marginT-15
				/>
			</View>
			<View style={styles.centerMargin}>
				<View style={styles.separator}></View>
				{
					openProfileEditor &&
					<>
						<Text>Name: </Text>
						<TextField
							onChangeText={text => setName(text)}
							hideUnderline
							placeholder={user.name}
							style={styles.inputText}
							value={name}
						/>
					</>
				}
			</View>
			{
				openProfileEditor &&
				<MapComponent />
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
});
