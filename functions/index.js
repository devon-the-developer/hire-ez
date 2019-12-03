const functions = require('firebase-functions');
var admin = require("firebase-admin")
const config = functions.config();
admin.initializeApp(config.firebase);
// const gcs = require('@google-cloud/storage')

// const BUCKET_NAME = 'hire-ez.appspot.com';
// const storageRef = firebase.storage().ref();




exports.addToInventory = functions.https.onCall(async (data, context) => {
    let {itemObject} = data
    
    try {
        let newItemRef = await admin.database().ref('/inventory/').push(itemObject)
        let key = await newItemRef.key
        console.log("newItemRef.key: ", newItemRef.key, key)
        return {
            success: true,
            ref: key
        }
    } catch (error) {
        console.log(error)
        throw new Error("ERROR: ", error.message)
    }
})

exports.removeFromInventory = functions.https.onCall(async (data, context) => {
    let {itemKey} = data

    try {
        await admin.database().ref('/inventory/').child(itemKey).remove()
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        throw new Error("Error: ", error.message)
    }
})