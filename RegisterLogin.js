import React, { useState } from "react";
import fb from './fb'
import db from './db'
import { StyleSheet, Image } from 'react-native';
import LoginPicker from './screens/pickers/LoginPicker'
import { Button, TextField, View } from 'react-native-ui-lib';
import {Colors} from 'react-native-ui-lib'

export default function RegisterLogin() {

	Colors.loadColors({
        primary: '#6874e2',
        basic: '#f5f6fa',
    });

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const login = async () => {
		email !== "" && password !== "" ?
			await fb.auth().signInWithEmailAndPassword(email, password)
			:
			undefined
	}

	const register = async () => {
		if (email !== "" && password !== "") {
			try {
				await fb.auth().createUserWithEmailAndPassword(email, password)
				console.log(fb.auth().currentUser.uid)
				await db.Users.update({ id: fb.auth().currentUser.uid, role: "Customer" })
			} catch (error) {
				alert(error.message)
			}
		}
	}

	return (
		<View style={[styles.container, {backgroundColor: Colors.basic}]}>
			<Image 
				style={{width: 200, height: 200, marginBottom: 20}}
				source={require('./assets/images/logo.png')}
				resizeMode="contain"
			/>
			<LoginPicker setEmail={setEmail} setPassword={setPassword} />
			<TextField
				onChangeText={text => setEmail(text)}
				hideUnderline
				placeholder={"Email..."}
				style={styles.inputText}
				value={email}
			/>
			<TextField
				onChangeText={text => setPassword(text)}
				hideUnderline
				placeholder={"Password..."}
				style={styles.inputText}
				value={password}
			/>
			<Button label="Login"
				style={{ width: '80%' }}
				backgroundColor={Colors.primary}
				onPress={login}
				marginT-15
			/>
			<Button label="Register"
				marginT-15
				style={{ width: '80%' }}
				outlineColor={Colors.primary}
				backgroundColor={Colors.basic}
				color="#6874e2"
				onPress={register}
			/>
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
		alignItems: 'center',
		justifyContent: 'center'
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
	inputText: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		width: '80%'
	}
});
