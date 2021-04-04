const firebase = require('firebase')

// put your own config here
const firebaseConfig = {
    apiKey: "AIzaSyCPV44gVwibJaPpWH_4G2KY8kc6AKvA1ZM",
    authDomain: "cp3351-39dd4.firebaseapp.com",
    databaseURL: "https://cp3351-39dd4-default-rtdb.firebaseio.com",
    projectId: "cp3351-39dd4",
    storageBucket: "cp3351-39dd4.appspot.com",
    messagingSenderId: "442367383444",
    appId: "1:442367383444:web:c462446d76f860aac6e181",
    measurementId: "G-XQJBRTN4B6"
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

db.useEmulator("localhost", 8081)
firebase.functions().useEmulator("localhost", 5001)
firebase.auth().useEmulator("http://localhost:9099")

const reformat = doc => ({ id: doc.id, ...doc.data() })
const findAll = async collection => (await db.collection(collection).get()).docs.map(reformat)
const findOne = async (collection, id) => reformat(await db.collection(collection).doc(id).get())
const listenOne = (act, collection, id) => db.collection(collection).doc(id).onSnapshot(snap => act(reformat(snap)))
const findOneSubAll = async (collection, id, subcollection) => (await db.collection(collection).doc(id).collection(subcollection).get()).docs.map(reformat)
const removeOneSubOne = async (collection, id, subcollection, subId) => await db.collection(collection).doc(id).collection(subcollection).doc(subId).delete()
const removeOne = async (collection, id) => await db.collection(collection).doc(id).delete()


const inDoc = db.collection('simulator').doc('in')
const outDoc = db.collection('simulator').doc('out')

let delay = 5
let intervalId = 0

// when command received, act on it
// - send back any info to 'out' document
const act = async ({ command, delay: newDelay }) => {
    console.log('acting on', command, newDelay)
    if (command === 'Start' && intervalId === 0) {
        delay = newDelay
        handleStartSimulator()
    } else if (command === 'Stop') {
        handleStopSimulator()
    } else {
        console.log("Unrecognized command")
    }
}

// set listener to 'in' document
inDoc.onSnapshot(snap => act(reformat(snap)))

// start listening to all categories
let categories = []
db.collection('categories').onSnapshot(snap => categories = snap.docs.map(reformat))
const isCategory = (sensor, name) => categories.find(category => category.id === sensor.categoryid).name === name

// start listening to all sensors
let sensors = []
db.collection('sensors').onSnapshot(snap => sensors = snap.docs.map(reformat))

const simulateReading = async sensor => {
    // first get latest reading
    const readings = (await db.collection('sensors').doc(sensor.id).collection('readings').orderBy("when", 'desc').limit(1).get()).docs.map(reformat)
    // then update it
    if (isCategory(sensor, "Temperature")) {
        const current = readings.length > 0 ? readings[0].current : 50
        await db.collection('sensors').doc(sensor.id).collection('readings').add({
            when: new Date(),
            current: current + Math.floor(Math.random() * 20) - 10
        })
    }
    if (isCategory(sensor, "Blood Pressure")) {
        const changeOps = ['+', '-']
        const op = Math.floor(Math.random() * 2)
        const current = readings.length > 0 ? readings[0].current : { sys: 120, dia: 80, pulse: 72 }

        changeOps[op] === '+' ?
            await db.collection('sensors').doc(sensor.id).collection('readings').add({
                when: new Date(),
                current: {
                    sys: current.sys + op,
                    dia: current.dia + op,
                    pulse: current.pulse + op
                }
            })
            :
            await db.collection('sensors').doc(sensor.id).collection('readings').add({
                when: new Date(),
                current: {
                    sys: current.sys - op,
                    dia: current.dia - op,
                    pulse: current.pulse - op
                }
            })
    } else if (isCategory(sensor, "Heart Rate Monitor")) {
        const currentR = readings.length > 0 ? readings[0].current : 70
        const changeOps = ['-', '+']
        const op = Math.floor(Math.random() * 2)
        const randomValue = Math.floor(Math.random() * 10)
        changeOps[op] === '-' ?
            await db.collection('sensors').doc(sensor.id).collection('readings').add({
                when: new Date(),
                current: currentR - randomValue
            })
            :
            await db.collection('sensors').doc(sensor.id).collection('readings').add({
                when: new Date(),
                current: currentR + randomValue
            })
    }
    else if (isCategory(sensor, "Pedometer")) {
        const currentR = readings.length > 0 ? readings[0].current : 100
        await db.collection('sensors').doc(sensor.id).collection('readings').add({
            when: new Date(),
            current: currentR + 1
        })
    }
    else if (isCategory(sensor, "Body Temperature")) {
        const currentR = readings.length > 0 ? readings[0].current : 36
        const changeOps = ['-', '+']
        const op = Math.floor(Math.random() * 2)
        const randomValue = Math.floor(Math.random() * 4)
        changeOps[op] === '-' ?
            await db.collection('sensors').doc(sensor.id).collection('readings').add({
                when: new Date(),
                current: currentR - randomValue
            })
            :
            await db.collection('sensors').doc(sensor.id).collection('readings').add({
                when: new Date(),
                current: currentR + randomValue
            })
    }
    else {
        console.log('other type of sensor not simulated yet')
    }
}

const simulate = () => {
    sensors.map(simulateReading)
}

const handleStartSimulator = async () => {
    intervalId = setInterval(simulate, delay * 1000)
    await outDoc.set({ status: "Running", delay })
}

const handleStopSimulator = async () => {
    clearInterval(intervalId)
    intervalId = 0
    await outDoc.set({ status: "Stopped", delay })
}

const init = async () => {
    await outDoc.set({ status: "Stopped", delay })
}
init()