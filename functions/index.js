const functions = require('firebase-functions');
var admin = require("firebase-admin")
const config = functions.config();
admin.initializeApp(config.firebase);

exports.isStoreManager = functions.https.onCall(async (data, context) => {
    let currentUserUid = context.auth.uid
    console.log({currentUserUid})

    try {

        let storeManagerSnap = await admin.database().ref('/store_managers/' + currentUserUid).once("value")

        let storeManager = storeManagerSnap.val()

        console.log({storeManager})
        let ret = storeManagerSnap.exists()

        return ret

    } catch (err) {
        console.log(
          "Error checking if user " + currentUserUid + "is a storeManager: ", err
        );
        return { error: "Error In: isStoreManager" };
    }
})

exports.addToInventory = functions.https.onCall(async (data, context) => {
    let {itemObject} = data
    
    try {
        let newItemRef = await admin.database().ref('/inventory/').push(itemObject)
        let key = await newItemRef.key
        return {
            success: true,
            ref: key
        }
    } catch (err) {
        console.log("Error adding Item: " + itemObject + " to database: ", err)
        return { error: "Error In: addToInventory" }
    }
})

exports.removeFromInventory = functions.https.onCall(async (data, context) => {
    let {itemKey} = data

    try {
        await admin.database().ref('/inventory/').child(itemKey).remove()
        return {
            success: true
        }
    } catch (err) {
        console.log("Error removing Item: " + itemKey + " from database: ", err);
        return { error: "Error In: removeFromInventory"}
    }
})

exports.addImageUrlToItem = functions.https.onCall(async (data, context) => {
    let { imageUrl, itemKey } = data

    try {
        await admin.database().ref('/inventory/').child(itemKey).update({
            imageUrl
        })
        return {
            success: true
        }
    } catch (err) {
        console.log("Error adding ImageUrl of " + imageUrl + " To " + itemKey + " : ", err);
        return { error: "Error In: addImageUrlToItem"}
    }
})
