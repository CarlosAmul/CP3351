import firebase from './fb'
import fetch from 'node-fetch'
const db = firebase.firestore()

// const a = async () => {
//     const response = await fetch('https://10.0.2.2:8080',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//     )
//     console.log(response.ok)
// }
// a()

// all database functionality here
class DB {

    constructor(collection) {
        this.collection = collection
    }

    reformat(doc) {
        console.log('reformat', doc.id)
        return { id: doc.id, ...doc.data() }
    }

    findAll = async () => {
        const data = await db.collection(this.collection).get()
        return data.docs.map(this.reformat)
    }

    listenAll = set =>
        db.collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    findOne = async id => {
        const doc = await db.collection(this.collection).doc(id).get()
        return doc.exists ? this.reformat(doc) : undefined
    }

    listenOne = (set, id) => {
        console.log('received id ', id)
        id === ""
            ?
            set(null)
            :
            db.collection(this.collection).doc(id).onSnapshot(snap => set(this.reformat(snap)))
    }

    // item has no id
    create = async item => {
        const { id, ...rest } = item
        return await db.collection(this.collection).add(rest)
    }

    // item has id
    update = async item => {
        const { id, ...rest } = item
        await db.collection(this.collection).doc(id).set(rest)
    }

    remove = async id => {
        await db.collection(this.collection).doc(id).delete()
    }
}


class Sensors extends DB {

    constructor() {
        super('sensors')
        this.Readings = new Readings(this.collection)
    }

    listenByCategory = (set, categoryid) =>
        db.collection(this.collection).where("categoryid", "==", categoryid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenByUser = (set, userid) =>
        db.collection(this.collection).where("userid", "==", userid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenByUserAndCategory = (set, userid, categoryid) =>
        db.collection(this.collection).where("userid", "==", userid).where("categoryid", "==", categoryid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    toggleMotionDetected = sensor =>
        db.collection(this.collection).doc(sensor.id).set({ motiondetected: !sensor.motiondetected }, { merge: true })

    setMotionDetected = (sensor, motiondetected) =>
        db.collection(this.collection).doc(sensor.id).set({ motiondetected }, { merge: true })

    toggleAlert = sensor =>
        db.collection(this.collection).doc(sensor.id).set({ alert: !sensor.alert }, { merge: true })
}

class Readings extends DB {

    constructor(containing) {
        super('readings')
        this.containing = containing
    }

    createReading = (sensorId, reading) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).add(reading)

    listen2OrderByWhen = (set, sensorId) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).orderBy("when", "desc").limit(2).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenLatestOne = (set, sensorId) =>
        db.collection(this.containing).doc(sensorId).collection(this.collection).orderBy("when", "desc").limit(1).onSnapshot(snap => set(snap.docs.map(this.reformat)[0]))

}

class SupportCenters extends DB {

    constructor() {
        super('supportcenters')
    }
}


class Users extends DB {
    constructor() {
        super('users')
        this.Notifications = new Notifications(this.collection)
    }

    listenToUsersByRole = (set, role) =>
        db.collection(this.collection).where("role", "==", role).onSnapshot(snap => set(snap.docs.map(this.reformat)))

}

class Notifications extends DB {
    constructor(containing) {
        super('notifications')
        this.containing = containing
    }

    unreadCount(uid, set) {
        return db.collection(this.containing).doc(uid).collection(this.collection).orderBy("when", "desc").where('status', '==', false).onSnapshot(snap => set(snap.size))
    }

    listenByUserAll(uid, set) {
        return db.collection(this.containing).doc(uid).collection(this.collection).orderBy("when", "desc").onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }

    listenByUserUnread(uid, set) {
        return db.collection(this.containing).doc(uid).collection(this.collection).orderBy("when", "desc").where('status', '==', false).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }

    markRead(uid, nid) {
        db.collection(this.containing).doc(uid).collection(this.collection).doc(nid).set({ status: true }, { merge: true })
    }

    newNotification = async (userid, message, screen, extra) => await db.collection('users').doc(userid).collection('notifications').add({ message, status: false, screen, when: new Date(), extra: extra ? extra : {} })

}

class Categories extends DB {

    constructor() {
        super('categories')
        this.Favorites = new Favorites(this.collection)
    }

    // max 10
    listenInIds = (set, ids) =>
        db.collection(this.collection).where(db.FieldPath.documentId(), "in", ids).onSnapshot(snap => set(snap.docs.map(this.reformat)))

}

class FAQs extends DB {

    constructor() {
        super('faqs')
    }

    listenAllAnswered = (set) => {
        return db.collection(this.collection).where('answer', '!=', '').onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }
}

class Favorites extends DB {
    constructor(containing) {
        super('favorites')
        this.containing = containing
    }

    reformatFav(doc) {
        return { id: doc.id, parentId: doc.ref.parent.parent.id, ...doc.data(), when: doc.data().when.toDate() }    
    }

    listenToCategoryFavs = (set, catId) => 
        db.collection(this.containing).doc(catId).collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformatFav)))

    listenToCatgoryFavsByUser = (set, catId, userId) =>
        db.collection(this.containing).doc(catId).collection(this.collection).where('userid', '==', userId).onSnapshot(snap => set(snap.docs.map(this.reformatFav)))

    addFav = async (catId, like) => 
        await db.collection(this.containing).doc(catId).collection(this.collection).add(like)

    removeFavs = async (catId, likeId) =>
        await db.collection(this.containing).doc(catId).collection(this.collection).doc(likeId).delete()
    
    listenToFavsByUser = (set, userid) =>
        db.collectionGroup(this.collection).where('userid', '==', userid).onSnapshot(snap => set(snap.docs.map(this.reformatFav)))
    
    listenToAllFavs = (set) => 
        db.collectionGroup(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformatFav)))

    findAllFavsWithCategories = async (set) => {
        const categoriesdata = await db.collection('categories').get()
        const categories = categoriesdata.docs.map(doc => (this.reformat(doc)))
        const caetgoriesFavs = []
        const favoritesdata = await db.collectionGroup(this.collection).get()
        const favorites = favoritesdata.docs.map(doc => (this.reformatFav(doc)))

        categories.map(c => {
            if(favorites.length > 0) { 
                caetgoriesFavs.push({category: c, favs: favorites.filter(f => f.parentId === c.id).length})
            }
        })

        set(caetgoriesFavs)
    }
}

class Manufacturers extends DB {
    constructor() {
        super('manufacturers')
    }
}

class FitnessTips extends DB {
    constructor() {
        super('fitnesstips')
    }
    listenToUserFitnessTips = (set, userid) =>
        db.collection(this.collection).where('userid', '==', userid).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    listenToApprovedTips = (set) =>
        db.collection(this.collection).where('approved', '==', true).onSnapshot(snap => set(snap.docs.map(this.reformat)))
}

class Simulator extends DB {
    
    constructor() {
        super('simulator')
    }

}

export default {
    Categories: new Categories(),
    Sensors: new Sensors(),
    Users: new Users(),
    FAQs: new FAQs(),
    Manufacturers: new Manufacturers(),
    SupportCenters: new SupportCenters(),
    FitnessTips: new FitnessTips(),
    Simulator: new Simulator()
}