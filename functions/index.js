// must use older 'require' syntax for import
const fetch = require("node-fetch")
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

//Omar
const createSampleCenters = require('./createSampleCenters')
const createHistoricReadingsSample = require('./createHistoricReadingsSample');

exports.createSampleCenters = functions.https.onCall(createSampleCenters)
exports.createHistoricReadingsSample = functions.https.onCall(createHistoricReadingsSample)

//

exports.findAuthUser = functions.https.onCall(
  async (uid, context) => {
    // functions.logger.info("uid", { uid })

    const authUser = await admin.auth().getUser(uid)
    // functions.logger.info("authUser", { authUser })

    return authUser
  }
)

const db = admin.firestore()

//this function will be different for every different sensor because there will be separate fields
exports.addSensor = functions.https.onCall(
  async ({ location, user, categoryid, min, max, alert, price, manufacturer, category, install, quantity }, context) => {
    for (let k = 0; k < quantity; k++) {
      await db.collection('sensors').add({ location, userid: user.id, categoryid, min, max, alert, price, manufacturer, install })
      await db.collection('users').doc(user.id).set({ points: user.points + 150 }, { merge: true })
    }
  }
)

const reformat = doc => ({ id: doc.id, ...doc.data() })
const findAll = async collection => (await db.collection(collection).get()).docs.map(reformat)
const findOneSubAll = async (collection, id, subcollection) => (await db.collection(collection).doc(id).collection(subcollection).get()).docs.map(reformat)
const removeOneSubOne = async (collection, id, subcollection, subId) => await db.collection(collection).doc(id).collection(subcollection).doc(subId).delete()
const removeOne = async (collection, id) => await db.collection(collection).doc(id).delete()
const newNotification = async (userid, message, screen, extra) => await db.collection('users').doc(userid).collection('notifications').add({ message, status: false, screen, when: new Date(), extra: extra ? extra : {} })


exports.createSampleData = functions.https.onCall(
  async (data, context) => {

    const sensors = await findAll('sensors')
    await Promise.all(
      sensors.map(
        async sensor => {
          const readings = await findOneSubAll('sensors', sensor.id, 'readings')
          await Promise.all(
            readings.map(
              async reading =>
                await removeOneSubOne('sensors', sensor.id, 'readings', reading.id))
          )
          await removeOne('sensors', sensor.id)
        }
      )
    )

    const faqs = await findAll('faqs')
    await Promise.all(
      faqs.map(
        async faq =>
          await removeOne('faqs', faq.id)
      )
    )

    const categories = await findAll('categories')
    await Promise.all(
      categories.map(
        async category =>
          await removeOne('categories', category.id)
      )
    )

    const manufacturers = await findAll('manufacturers')
    await Promise.all(
      manufacturers.map(
        async manufacturer =>
          await removeOne('manufacturers', manufacturer.id)
      )
    )

    const users = await findAll('users')
    await Promise.all(
      users.map(
        async user => {
          const notifications = await findOneSubAll('users', user.id, 'notifications')
          await Promise.all(
            notifications.map(
              async notification =>
                await removeOneSubOne('users', user.id, 'notifications', notification.id))
          )
          await removeOne('users', user.id)
        }

      )
    )

    const ads = await findAll('ads')
    await Promise.all(
      ads.map(
        async ad =>
          await removeOne('ads', ad.id)
      )
    )


    const authUsers = (await admin.auth().listUsers()).users
    await Promise.all(
      authUsers.map(
        async user => await admin.auth().deleteUser(user.uid)
      )
    )

    const userTrackings = await findAll('usertrackings')
    await Promise.all(
      userTrackings.map(
        async tracking =>
          await removeOne('usertrackings', tracking.id)
      )
    )
    
    let centers = await findAll("supportcenters")

    let alKhor = centers.find((c) => c.name.indexOf("Al Khor") !== -1)
    let doha = centers.find((c) => c.name.indexOf("Doha") !== -1)


    // auth and db should be completely empty now

    const { uid: authId1 } = await admin.auth().createUser({ email: "joe@joe.com", password: "joejoe" })
    // functions.logger.info("authId1", { authId1 })

    await db.collection('faqs').add({ question: 'Test Question', answer: "Test Answer", userid: authId1, status: 'answered' })

    const { uid: authId2 } = await admin.auth().createUser({ email: "ann@ann.com", password: "annann" })
    // functions.logger.info("authId2", { authId2 })

    await db.collection('faqs').add({ question: 'Another Test Question', answer: "Another Test Answer", userid: authId2, status: 'answered' })

    const { uid: authId3 } = await admin.auth().createUser({ email: "admin@admin.com", password: "adminadmin" })
    // functions.logger.info("authId3", { authId3 })

    const { uid: authId4 } = await admin.auth().createUser({ email: "fred@fred.com", password: "fredfred" })
    // functions.logger.info("authId4", { authId4 })

    const { uid: authId5 } = await admin.auth().createUser({ email: "khalil@khalil.com", password: "khalilkhalil" })
    // functions.logger.info("authId5", { authId5 })

    const { uid: authId6 } = await admin.auth().createUser({ email: "kareem@kareem.com", password: "kareemkareem" })
    // functions.logger.info("authId6", { authId6 })

    const { uid: authId7 } = await admin.auth().createUser({ email: "bita@bita.com", password: "bitabita" })
    functions.logger.info("authId5", { authId7 })

    const result1 = await db.collection('users').doc(authId1).set({ name: "Joe", role: "Customer", points: 0 })
    // functions.logger.info("result1", { result1 })

    const result2 = await db.collection('users').doc(authId2).set({ name: "Ann", role: "Customer", points: 0, address: [25.213983211544196,51.30470898002386]})
    // functions.logger.info("result2", { result2 })

    const result3 = await db.collection('users').doc(authId3).set({ name: "Admin", role: "Admin" })
    // functions.logger.info("result3", { result3 })

    const result4 = await db.collection('users').doc(authId4).set({ name: "Fred", role: "Support" })
    // functions.logger.info("result4", { result4 })

    const result5 = await db.collection('users').doc(authId5).set({ name: "Khalil", role: "Service", centerid: doha.id })
    // functions.logger.info("result5", { result5 })

    const result6 = await db.collection('users').doc(authId6).set({ name: "Kareem", role: "Service", centerid: alKhor.id })
    // functions.logger.info("result6", { result6 })

    const { id: fitnesstip1 } = await db.collection('fitnesstips').add({ title: 'Daily Monitoring', description: 'Use the heart rate monitor to daily monitor your heart rate whenever you do workout', tags: ['heart', 'workout', 'monitoring', 'heart rate sensor'], userid: authId1, approved: true, approvedby: authId4 })
    const { id: fitnesstip2 } = await db.collection('fitnesstips').add({ title: 'Measuring body heat', description: 'Use the skin/body temperature sensorto daily monitor your skin/body temperature whenever you do workout', tags: ['body', 'workout', 'monitoring', 'body temperature sensor'], userid: authId2, approved: false, approvedby: authId4 })

    const { id: reward1 } = await db.collection('rewards').add({ title: 'Get 20% Off', description: 'Get 20% Off on your next purchase', points: 2000, type: "Discount", discount: 20, image: 'https://thumbs.dreamstime.com/b/discount-pink-brush-new-vector-watercolor-background-colorful-abstract-texture-design-elements-vintage-splash-card-110234831.jpg' })
    const { id: reward2 } = await db.collection('rewards').add({ title: 'Voucher from Adidas', description: 'Get the voucher from adidas and buy your favorite things', points: 1500, type: "Voucher", image: 'https://giftcardcorner.net/wp-content/uploads/2019/09/Free-Adidas-Promo-Code-Adias-Coupon-Code-AND-Voucer-Free-Adidas-Shoes.jpg' })

    const result7 = await db.collection('users').doc(authId5).set({ name: "Bita", role: "Marketing" })
    functions.logger.info("result5", { result7 })

    const { id: manufacturer1 } = await db.collection('manufacturers').add({ name: "Amaze Fit", price: 0, url: 'https://gizchina.it/wp-content/uploads/2020/07/Amazfit-logo.jpg' })
    const { id: manufacturer2 } = await db.collection('manufacturers').add({ name: "Fitbit", price: 200, url: 'https://i.pinimg.com/originals/70/37/80/703780894a96e0786fe57b9a03087626.jpg' })

    const { id: categoryId1 } = await db.collection('categories').add({ name: "Motion", description: "All Motion sensors here", price: 500, url: "https://is5-ssl.mzstatic.com/image/thumb/Purple30/v4/cf/b9/cf/cfb9cfdb-0258-d8c0-245d-18d644205b8d/source/512x512bb.jpg", manufacturers: [manufacturer1, manufacturer2] })
    // functions.logger.info("categoryId1", { categoryId1 })

    const { id: categoryId2 } = await db.collection('categories').add({ name: "Temperature", description: "All Temperature sensors here", price: 400, url: "https://cdn0.iconfinder.com/data/icons/flaturici-set-3/512/thermometer-512.png", manufacturers: [manufacturer1] })
    // functions.logger.info("categoryId2", { categoryId2 })

    await db.collection('categories').doc(categoryId1).collection('safetyinstructions').add({ title: 'Wipe Front Screen', description: 'Atfer long use, it is recommended to wipe the screen to prevent unhygienic conditions. ', image: 'https://www.dtv-installations.com/sites/default/files/styles/original_image/public/functions_nest_thermostat.jpg' })
    await db.collection('categories').doc(categoryId2).collection('safetyinstructions').add({ title: 'Adjust the valve', description: 'Make sure the valve which is located on the back side is adjusted properly. ', image: 'https://cdn3.vectorstock.com/i/thumb-large/26/02/pressure-sensor-manometer-isolated-vector-10502602.jpg' })

    const { id: sensorId1 } = await db.collection('sensors').add({ userid: authId1, categoryid: categoryId1, location: "front door", motiondetected: false, price: 500 })
    // functions.logger.info("sensorId1", { sensorId1 })

    const { id: sensorId2 } = await db.collection('sensors').add({ userid: authId2, categoryid: categoryId2, location: "lab", min: 0, max: 100, alert: false, install:"no", request: "no", price: 400 })

    const { id: sensorId3 } = await db.collection('sensors').add({ userid: authId2, categoryid: categoryId2, location: "bedroom", min: 0, max: 40, alert: false, install:"yes", request: "no", price: 400 })
    // functions.logger.info("sensorId2", { sensorId2 })

    const { id: adId1 } = await db.collection('ads').add({
      title: 'New motion sensor',
      image: 'https://www.ikea.com/qa/en/images/products/tradfri-wireless-motion-sensor-white__0725849_pe735071_s5.jpg',
      description: 'There is new sensor by company click to see',
      screen: 'PublicHome',
      startDate: new Date(),
      endDate: new Date('2021-04-19T12:00:00-06:30')
    })

    // await db.collection('sensors').doc(sensorId2).collection('readings').add({ current: 103, when: new Date() })
  }
)

exports.onNewReading = functions.firestore.document('sensors/{sensorid}/readings/{readingid}').onCreate(

  async (snap, context) => {
    const reading = snap.data();
    // functions.logger.info("reading", { reading })

    const { sensorid, readingid } = context.params
    // functions.logger.info("sensorid", { sensorid })
    // functions.logger.info("readingid", { readingid })

    const sensorDoc = await db.collection('sensors').doc(sensorid).get()
    const sensor = { id: sensorDoc.id, ...sensorDoc.data() }

    // functions.logger.info("sensor object", { sensor })
    const categoryDoc = await db.collection('categories').doc(sensor.categoryid).get()
    const category = { id: categoryDoc.id, ...categoryDoc.data() }
    // functions.logger.info("category", { category })

    if (category.name === "Motion") {
      const readingData = await db.collection('sensors').doc(sensor.id).collection('readings').orderBy("when", "desc").limit(2).get()
      const readings = readingData.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      // functions.logger.info("readings.length", { readingslength: readings.length })
      // functions.logger.info("readings", { readings })

      if (readings.length >= 2) {
        const latestImageURL = readings[0].url
        const previousImageURL = readings[1].url

        // 1 -- get the blobs from fb storage
        //   -- change the blobs to base64 strings
        // 2 -- compare the strings
        // 3 -- update db with true/false (motiondetected field)
        
        // functions.logger.info("checkMotion", { sensor, previousImageURL, latestImageURL })

        const response1 = await fetch(latestImageURL)
        const buffer1 = await response1.buffer()
        const base64_1 = buffer1.toString('base64')

        const response2 = await fetch(previousImageURL)
        const buffer2 = await response2.buffer()
        const base64_2 = buffer2.toString('base64')

        const isDetected = base64_1 != base64_2
        functions.logger.info("motion detected", { sensor, motiondetected: isDetected });

        await db.collection('sensors').doc(sensor.id).set({ motiondetected: isDetected }, { merge: true })

        if (isDetected) {
          newNotification(sensor.userid, `Motion detected by ${category.name} sensor in location "${sensor.location}"`, 'Sensors', { catId: category.id, sensorId: sensor.id })
        }
      }
    }
    else if (category.name = "Temperature") {
      const isAlert = reading.current > sensor.max || reading.current < sensor.min

      await db.collection('sensors').doc(sensor.id).set({ alert: isAlert }, { merge: true })
      if (isAlert) {
        newNotification(sensor.userid, `Alert on ${category.name} sensor in location "${sensor.location}". Current temperature is ${reading.current}`, 'Sensors', { catId: category.id, sensorId: sensor.id })
      }
      // functions.logger.info("temp alert update", { alert: isAlert });
    } else {
      // functions.logger.info("No such category", { category });
    }
  })

exports.newRegistration = functions.firestore.document('users/{userid}').onCreate(
  async (snap, context) => {
    const { userid } = context.params
    const userDoc = await db.collection('users').doc(userid).get()
    const user = { id: userDoc.id, ...userDoc.data() }
    const tracking = db.collection('usertrackings').add({ operation: 'register', when: new Date(), userid: userid })
    console.log('registration tracked', tracking)

    if (user.role == "Customer") {
      const notif = newNotification(userid, 'Welcome to FitIoT!', 'PublicHome')
      functions.logger.info("notification sent", notif)
    }
  })

exports.sendFAQNotification = functions.firestore.document('faqs/{faqid}').onCreate(
  async (snap, context) => {
    functions.logger.info("Sending notification to supports")
    const supportsDoc = await db.collection('users').where('role', '==', 'Support').get()
    functions.logger.info(supportsDoc, 'doc')
    supportsDoc.docs.map(doc => {
      newNotification(doc.id, 'An FAQ has been submitted', 'PendingQuestions')
    })
  }
)

//this function will be different for every different sensor because there will be separate fields
exports.addSensor = functions.https.onCall(
  async ({ location, userid, categoryid, min, max, alert, price, manufacturer }, context) => {
    functions.logger.info("Done with it!!!!!!!")
    await db.collection('sensors').add({ location, userid, categoryid, min, max, alert, price, manufacturer })
exports.sendFitnessNotificationsToSupport = functions.firestore.document('fitnesstips/{tipid}').onCreate(
  async (snap, context) => {
    const { tipid } = context.params
    const supportUsersData = await db.collection('users').where('role', '==', 'Support').get()
    const supportUsers = supportUsersData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    const tipDoc = await db.collection('fitnesstips').doc(tipid).get()
    const tip = reformat(tipDoc)
    const tipUserDoc = await db.collection('users').doc(tip.userid).get()
    const tipUser = reformat(tipUserDoc)
    await Promise.all(
      supportUsers.map(async user => {
        await newNotification(user.id, `${tipUser.name} has submitted a fitness tip`, 'FitnessTips')
      })
    )
  })

exports.sendTipStatusNotificationToUser = functions.firestore.document('fitnesstips/{tipid}').onUpdate(
  async (snap, context) => {
    const { tipid } = context.params
    const tipDoc = await db.collection('fitnesstips').doc(tipid).get()
    const tip = reformat(tipDoc)
    await newNotification(tip.userid, !tip.approved ? "Your fitness tip was disapproved as it didn't follow guidelines" : "Your fitness tip was approved to be posted", 'FitnessTips')
  })

exports.notifyAdminForApplication = functions.https.onCall(
  async ({ username }, context) => {
    const adminUsersData = await db.collection('users').where('role', '==', 'Admin').get()
    const adminUsers = adminUsersData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    await Promise.all(
      adminUsers.map(async user => {
        await newNotification(user.id, `${username} has submitted an application`, 'Applications')
      })
    )
  }
)

exports.notifyUserForApplication = functions.https.onCall(
  async ({ userid, status, vacancy }, context) => {
    if(status === "rejected") {
      await newNotification(userid, `Sorry, your application for ${vacancy.role} was rejected. Apply again next time`, 'VacancyScreen')
    } else {
      await newNotification(userid, `Congratulations! You have been hired!`, 'Settings')
      await db.collection('users').doc(userid).set({role: vacancy.role, centerid: null}, {merge: true})
      await db.collection('vacancies').doc(vacancy.id).set({spaces: vacancy.spaces - 1}, {merge: true})
    }
  }
)

exports.newPurchase = functions.firestore.document('sensors/{sensorid}').onCreate(
  async (snap, context) => {
    const { sensorid } = context.params
    const sensorDoc = await db.collection('sensors').doc(sensorid).get()
    const sensor = { id: sensorDoc.id, ...sensorDoc.data() }
    const categoryDoc = await db.collection('categories').doc(sensor.categoryid).get()
    const category = { id: categoryDoc.id, ...categoryDoc.data() }
    functions.logger.info("category", { category })
    const tracking = await db.collection('usertrackings').add({ operation: 'buy', when: new Date(), userid: sensor.userid })
    console.log('purchase tracked', tracking)

    const notif = newNotification(sensor.userid, 'Thank you for your purchase! Click here to view your new sensor', 'Sensors', { catId: category.id, sensorId: sensor.id })
    functions.logger.info("notification sent", notif)

  })
})
