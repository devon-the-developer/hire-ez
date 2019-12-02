const functions = require('firebase-functions');
var admin = require("firebase-admin")
const config = functions.config();
admin.initializeApp(config.firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.testEmail = functions.https.onCall(async (data, context) => {

exports.addToInventory = functions.https.onCall(async (data, context) => {
    let {itemObject} = data
    
    try {
        await admin.database().ref('/inventory/').push(itemObject)
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        throw new Error("ERROR: ", error.message)
    }
})