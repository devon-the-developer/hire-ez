const functions = require('firebase-functions');
var admin = require("firebase-admin")
const config = functions.config();
admin.initializeApp(config.firebase);

exports.addToInventory = functions.https.onCall(async (data, context) => {
    let {itemObject} = data
    
    try {
        let newItemRef = await admin.database().ref('/inventory/').push(itemObject)
        let key = await newItemRef.key
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
        console.log(err)
        throw new Error("Error adding ImageUrl of " + imageUrl + " To ", itemKey + " : ", err)
    }
})
