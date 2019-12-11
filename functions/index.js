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

const createHireReceipt = async(itemKeys, userUid) => {
    if (!itemKeys) {
        return new Error ("No items selected for hire")
    }
    let hireReceipt = {
        hireToUser: userUid,
        itemsHired: itemKeys
    }
    try {
        let newReceiptRef = await admin.database().ref('/hire_receipts/').push(hireReceipt)
        let newReceiptKey = newReceiptRef.key
        return newReceiptKey
    } catch (err) {
        return new Error ('Error Creating Hire Receipt: ', err)
    }

}

const addReceiptToItem = (itemKey, receiptUid) => {
    return admin.database().ref('/inventory/').child(itemKey).update({"hireReceipt": receiptUid})
}

exports.hireItemsToUser = functions.https.onCall(async (data, context) => {
    let { itemKeys } = data
    let currentUserUid = context.auth.uid
    
    try {
        let hireReceiptUid = await createHireReceipt(itemKeys, currentUserUid)

        await itemKeys.forEach(itemKey => addReceiptToItem(itemKey, hireReceiptUid))

        return {
            success: true
        }
    } catch (err) {
        console.log("Error Hiring items: ", err);
        return { error: "Error In: HireItems" };
    }
})