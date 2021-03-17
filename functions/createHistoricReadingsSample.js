const functions = require("firebase-functions")
const admin = require('firebase-admin')
const db = admin.firestore()

module.exports = createHistoricReadingsSample = async (data, context) => {
    const reformat = doc => ({ id: doc.id, ...doc.data() })
    const findAll = async collection => (await db.collection(collection).get()).docs.map(reformat)
    const findOneSubAll = async (collection, id, subcollection) => (await db.collection(collection).doc(id).collection(subcollection).get()).docs.map(reformat)
    const removeOneSubOne = async (collection, id, subcollection, subId) => await db.collection(collection).doc(id).collection(subcollection).doc(subId).delete()
    const removeOne = async (collection, id) => await db.collection(collection).doc(id).delete()

    const categories = await findAll('categories')

    const isCategory = (sensor, name) => categories.find(category => category.id === sensor.categoryid).name === name

    const sensors = await findAll('sensors')

    sensors.map(async (sensor) => {
        if (isCategory(sensor, "Temperature")) {
            let today = new Date()
            // 6 months of simulated data, if each sensor reads 50 times a week
            await Promise.all(Array(5).fill(0).map(async () => {
                let randomYearly = 1000 * 60 * Math.floor(Math.random() * 60) * 24 * Math.floor(Math.random() * 30*6)
                db.collection('sensors').doc(sensor.id).collection('readings').add({
                    current: 50 + Math.floor(Math.random() * 20) - 10,
                    when: new Date(today - randomYearly)
                })
            }))
        }
    })

}
