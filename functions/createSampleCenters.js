const functions = require("firebase-functions")
const admin = require('firebase-admin')
const db = admin.firestore()

module.exports = createSampleCenters = async (data, context) => {
    const reformat = doc => ({ id: doc.id, ...doc.data() })
    const findAll = async collection => (await db.collection(collection).get()).docs.map(reformat)
    const findOneSubAll = async (collection, id, subcollection) => (await db.collection(collection).doc(id).collection(subcollection).get()).docs.map(reformat)
    const removeOneSubOne = async (collection, id, subcollection, subId) => await db.collection(collection).doc(id).collection(subcollection).doc(subId).delete()
    const removeOne = async (collection, id) => await db.collection(collection).doc(id).delete()


    let allCenters = await findAll('supportcenters')

    if(allCenters.length > 0) {
        await Promise.all(
            allCenters.map(e => removeOne('supportcenters', e.id))
        )
    }

    await Promise.all([
        await db.collection('supportcenters').add({
            name: "Al Khor FitIot Support Center",
            range: 5,
            techs: 3,
            address: [25.65652281955624, 51.48174101849702]
        }),
        await db.collection('supportcenters').add({
            name: "Al Wakrah FitIot Support Center",
            range: 3,
            techs: 3,
            address: [25.17945613230937, 51.567740666723196]
        }),
        await db.collection('supportcenters').add({
            name: "Ar Rayyan FitIot Support Center",
            range: 4,
            techs: 7,
            address: [25.28625331405168, 51.42407464959876]
        })
    ])

    functions.logger.info("Created support centers")

}
