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
  async ({location, userid, categoryid, min, max, alert, price, manufacturer, install, request, quantity, user, category}, context) => {
      for (let k = 0; k < quantity; k++) {
        if(category.name === "Temperature" || category.name === "Heart Rate Monitor" || category.name === "Body Temperature") {
          await db.collection('sensors').add({location, userid, categoryid, min, max, alert, price, manufacturer, install, request})
        }
        else if(category.name === "Pedometer") {
          await db.collection('sensors').add({location, userid, categoryid, goal, alert, price, manufacturer, install, request})
        }
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

    const authUsers = (await admin.auth().listUsers()).users
    await Promise.all(
      authUsers.map(
        async user => await admin.auth().deleteUser(user.uid)
      )
    )

    let centers = await findAll("supportcenters")

    let alKhor = centers.find((c) => c.name.indexOf("Al Khor") !== -1)
    let doha = centers.find((c) => c.name.indexOf("Doha") !== -1)


    // auth and db should be completely empty now

    const { uid: authId1 } = await admin.auth().createUser({ email: "joe@joe.com", password: "joejoe" })
    // functions.logger.info("authId1", { authId1 })

    await db.collection('faqs').add({ question: 'Test Question', answer: "Test Answer", userid: authId1 })

    const { uid: authId2 } = await admin.auth().createUser({ email: "ann@ann.com", password: "annann" })
    // functions.logger.info("authId2", { authId2 })

    await db.collection('faqs').add({ question: 'Another Test Question', answer: "Another Test Answer", userid: authId2 })

    const { uid: authId3 } = await admin.auth().createUser({ email: "admin@admin.com", password: "adminadmin" })
    // functions.logger.info("authId3", { authId3 })

    const { uid: authId4 } = await admin.auth().createUser({ email: "fred@fred.com", password: "fredfred" })
    // functions.logger.info("authId4", { authId4 })

    const { uid: authId5 } = await admin.auth().createUser({ email: "khalil@khalil.com", password: "khalilkhalil" })
    // functions.logger.info("authId5", { authId5 })

    const { uid: authId6 } = await admin.auth().createUser({ email: "kareem@kareem.com", password: "kareemkareem" })
    // functions.logger.info("authId6", { authId6 })

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

    const { id: manufacturer1 } = await db.collection('manufacturers').add({ name: "Amaze Fit", price: 0, url: 'https://gizchina.it/wp-content/uploads/2020/07/Amazfit-logo.jpg' })
    const { id: manufacturer2 } = await db.collection('manufacturers').add({ name: "Fitbit", price: 200, url: 'https://i.pinimg.com/originals/70/37/80/703780894a96e0786fe57b9a03087626.jpg' })

    const { id: categoryId1 } = await db.collection('categories').add({ name: "Motion", description: "All motion sensors here", price: 500, url: "https://is5-ssl.mzstatic.com/image/thumb/Purple30/v4/cf/b9/cf/cfb9cfdb-0258-d8c0-245d-18d644205b8d/source/512x512bb.jpg", manufacturers: [manufacturer1, manufacturer2] })
    const { id: categoryId2 } = await db.collection('categories').add({ name: "Temperature", description: "All temperature sensors here", price: 400, url: "https://cdn0.iconfinder.com/data/icons/flaturici-set-3/512/thermometer-512.png", manufacturers: [manufacturer1] })
    const { id: categoryId3 } = await db.collection('categories').add({ name: "Heart Rate Monitor", description: "Hear rate monitor analyzes your heart beat and you can continuously check your heart beat at your own comfort", price: 300, url: "https://img1.pnghut.com/t/17/18/1/gcaPjLKyBP/flower-watercolor-silhouette-frame-cartoon.jpg", manufacturers: [manufacturer1, manufacturer2] })
    const { id: categoryId4 } = await db.collection('categories').add({ name: "Pedometer", description: "Count your steps with this amazing sensor. With pedometer, you can count your steps while you do any acitvity in your day. ", price: 350, url: "https://cdn5.vectorstock.com/i/1000x1000/10/34/fitness-app-notification-icon-vector-27151034.jpg", manufacturers: [manufacturer1, manufacturer2]})
    const { id: categoryId5 } = await db.collection('categories').add({ name: "Blood Pressure Monitor", description: "Monitor your blood pressure with our blood pressure monitor aiming to keep you fit!", price: 450, url: "https://thumbs.dreamstime.com/b/blood-pressure-vector-concept-design-heart-blood-pressure-monitor-flat-style-blood-pressure-concept-flat-style-144129158.jpg", manufacturers: [manufacturer1]})
    const { id: categoryId6 } = await db.collection('categories').add({ name: "Body Temperature", description: "Body temperature sensor to measure your temperature of the body. ", price: 400, url: "https://image.freepik.com/free-vector/medical-infrared-thermometer-isometric-projection-digital-body-thermometer-isolated-blue-background_168129-305.jpg", manufacturers: [manufacturer1] })
    const { id: categoryId7 } = await db.collection('categories').add({ name: "Sleep Tracker", description: "Track your sleeping environment with our unique;y designed sleep tracker sensor. ", price: 500, url: "https://pim.beurer.com/images/produkt/uebersicht/se80-flat.jpg", manufacturers: [manufacturer1, manufacturer2] })


    await db.collection('categories').doc(categoryId1).collection('safetyinstructions').add({ title: 'Wipe Front Screen', description: 'Atfer long use, it is recommended to wipe the screen to prevent unhygienic conditions. ', image: 'https://www.dtv-installations.com/sites/default/files/styles/original_image/public/functions_nest_thermostat.jpg' })
    await db.collection('categories').doc(categoryId2).collection('safetyinstructions').add({ title: 'Adjust the valve', description: 'Make sure the valve which is located on the back side is adjusted properly. ', image: 'https://cdn3.vectorstock.com/i/thumb-large/26/02/pressure-sensor-manometer-isolated-vector-10502602.jpg' })

    const { id: vacancy1 } = await db.collection('vacancies').add({ description: 'Support users helps the customers answering to their queries and giving them support', spaces: 2, role: 'Support' })
    const { id: vacancy2 } = await db.collection('vacancies').add({ description: 'Service users deal with the installation and removal of the sensors. Also, service will make sure the user gets the right safety instructions of each of the sensors so they dont have any unconveniences. ', spaces: 1, role: 'Service' })

    const { id: sensorId1 } = await db.collection('sensors').add({ userid: authId1, categoryid: categoryId1, location: "front door", motiondetected: false, price: 500 })
    // functions.logger.info("sensorId1", { sensorId1 })

    const { id: sensorId2 } = await db.collection('sensors').add({ userid: authId2, categoryid: categoryId2, location: "lab", min: 0, max: 100, alert: false, install:"no", request: "no", price: 400 })
    const { id: sensorId3 } = await db.collection('sensors').add({ userid: authId2, categoryid: categoryId2, location: "bedroom", min: 0, max: 40, alert: false, install:"yes", request: "no", price: 400 })
    const { id: sensorId4 } = await db.collection('sensors').add({ userid: authId1, categoryid: categoryId3, location: "with me", min: 40, max: 90, alert: false, install:"no", request: "no", price: 400 })
    const { id: sensorId5 } = await db.collection('sensors').add({ userid: authId2, categoryid: categoryId4, location: "At the gym", goal: 1000, alert: false, install:"no", request: "no", price: 450 })

    // functions.logger.info("sensorId2", { sensorId2 })

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
    } else if (category.name === "Heart Rate Monitor"){
      const isAlert = reading.current > sensor.max || reading.current < sensor.min
      await db.collection('sensors').doc(sensor.id).set({ alert: isAlert }, { merge: true })
      if(isAlert) {
        newNotification(sensor.userid, `Heart rate alert on ${category.name} sensor. Current beat is ${reading.current}`, 'Sensors', { catId: category.id, sensorId: sensor.id })
      }
    }
    else if(category.name === "Pedometer") {
      const isAlert = reading.current % 1000
      await db.collection('sensors').doc(sensor.id).set({ alert: isAlert }, { merge: true })
      if (isAlert) {
        newNotification(sensor.userid, `Alert on your ${category.name} sensor. Current steps reached ${reading.current} 🔥🔥🔥`, 'Sensors', { catId: category.id, sensorId: sensor.id })
      }
    }
    else if(category.name === "Body Temperature") {
      const isAlert = reading.current > sensor.max || reading.current < sensor.min
      await db.collection('sensors').doc(sensor.id).set({ alert: isAlert }, { merge: true })
      if (isAlert) {
        newNotification(sensor.userid, `Alert on your ${category.name} sensor. Current skin temperature reached ${reading.current}`, 'Sensors', { catId: category.id, sensorId: sensor.id })
      }
    }
  })

//this function will be different for every different sensor because there will be separate fields

exports.sendNotifications = functions.firestore.document('users/{userid}').onCreate(
  async (snap, context) => {
    const { userid } = context.params
    const userDoc = await db.collection('users').doc(userid).get()
    const user = { id: userDoc.id, ...userDoc.data() }

    if (user.role == "Customer") {
      const notif = newNotification(userid, 'Welcome to FitIoT!', 'PublicHome')
      functions.logger.info("notification sent", notif)
    }
  })

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
