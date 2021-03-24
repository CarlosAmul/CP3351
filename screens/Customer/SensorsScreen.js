import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import MotionInfo from './MotionInfo'
import TemperatureInfo from './TemperatureInfo'
import CategoryByUserPicker from '../pickers/CategoryByUserPicker';
import SensorByUserAndCategoryPicker from '../pickers/SensorByUserAndCategoryPicker';
import ReportPicker from '../pickers/ReportPicker'
import UserContext from '../../UserContext'
import { Text, Button, Colors } from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../../components/MenuIcon'
import db from '../../db';

export default function SensorsScreen({ route }) {

	Colors.loadColors({
		primary: '#6874e2',
		basic: '#f5f6fa',
	});

	const navigation = useNavigation();

	const [catId, setCatId] = useState(route.params ? route.params.extra.catId : "")
	const [sensorId, setSensorId] = useState(route.params ? route.params.extra.sensorId : "")

	const { user } = useContext(UserContext)
	useEffect(() => setCategory(null), [user])
	const [category, setCategory] = useState(null)
	useEffect(() => setSensor(null), [category])
	const [sensor, setSensor] = useState(null)

	//Omar
	const [openReportForm, setOpenReportForm] = useState(false)
	const [report, setReport] = useState(null)
	const [installations, setInstallations] = useState([])

	useEffect(() => db.Sensors.Installations.listenByCustomer(setInstallations,user.id), [sensor])

	const renderDrawerView = () =>
		<View>
			<Text>Home</Text>
		</View>

	useEffect(() => {
		navigation.setOptions({
			// @ts-expect-error
			headerLeft: () => (<MenuIcon />)
		});
	});

	const sendRequestForm = () => {
		db.Users.Reports.createReport(user.id, { type: report, when: new Date(), sensorId: sensor.id })
		setOpenReportForm(!openReportForm)
	}

	const isLastRequestActive = () => {
		return sensor.request === "yes" ? true : false
	}

	// console.log("installations", installations)

	//

	return (
		<View style={{ flex: 1 }}>

			<View style={styles.getStartedContainer}>
				{
					user
					&&
					<CategoryByUserPicker set={setCategory} routeId={catId} setRoute={setSensorId} />
				}
				{
					user
					&&
					category
					&&
					<SensorByUserAndCategoryPicker category={category} set={setSensor} routeId={sensorId} />
				}
				{
					user
					&&
					category
					&&
					sensor
					&&
					<>
						{
							category.name === "Motion"
							&&
							<MotionInfo user={user} category={category} sensor={sensor} />
						}
						{
							category.name === "Temperature"
							&&
							sensor.install === "yes"
							&&
							<TemperatureInfo user={user} category={category} sensor={sensor} />
						}
						{/* Omar */}
						<Button label="Request Report"
							style={{ width: '60%' }}
							backgroundColor={Colors.primary}
							onPress={() => { navigation.navigate({ name: 'ReportsFormScreen', params: { sensor: sensor } }) }}
							marginT-15
						/>
						{
							sensor.install === "no" || sensor.install === "yes" ?
							<>
							{
							!isLastRequestActive() &&
								<Button label="Request Service"
									style={{ width: '60%' }}
									backgroundColor={Colors.primary}
									onPress={() => { navigation.navigate({ name: 'InstallationsFormScreen', params: { sensor: sensor } }) }}
									marginT-15
								/>
							}
							</>: undefined
						}
						{/* // */}
					</>
				}
			</View>
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
