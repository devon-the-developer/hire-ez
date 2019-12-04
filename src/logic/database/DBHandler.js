import getFirebase from '../../fire'
let firebase = getFirebase()
let storage = firebase.storage()

const isUserStoreManager = async() => {
    try {
        let isStoreManager = await firebase.functions().httpsCallable('isStoreManager')({})
        console.log({isStoreManager})
        return isStoreManager.data
    } catch (error) {
        console.log(error)
    }
}

const addItemToInventory = async(itemName, itemType, itemImage) => {
    try{
        let returned = await firebase.functions().httpsCallable('addToInventory')({
            itemObject: {
                name: itemName, 
                cost: "$5", 
                type: itemType, 
            }
        })
        let {ref} = returned.data 
        console.log("Object Added with Ref", ref)
        console.log("itemImage", itemImage)
        await firebase.storage().ref("/inventory_items/images/" + ref).put(itemImage)
        await addImageToItem(ref)
        console.log("image added")
    } catch (error) {
        console.log("Error: ", error.message)
    }
}

const removeItemFromInventory = async(objectKey) => {
    try {
        await firebase.functions().httpsCallable('removeFromInventory')({
            itemKey: objectKey
        })
        console.log("Object with key " + objectKey + " removed")
    } catch (error) {
        console.log("Error removing " + objectKey + " from inventory: ", error.message);
    }
}
    

const getAllItems = async() => {
    try{
        let ret = [];
        await firebase
          .database()
          .ref("/inventory/")
          .orderByKey()
          .once("value", snapshot => {
            let val = snapshot.val()
            let entries = Object.entries(val)

            entries.forEach((item) => {
                item[1].key = item[0]
                ret.push(item[1])
            })
          });
          return ret;
    } catch (error) {
        console.log("Error in getAllItems: ", error.message)
    }
}


const addImageToItem = async(itemKey) => {
    let downloadUrl = await storage.ref('/inventory_items/images/' + itemKey).getDownloadURL()
    console.log("downloadUrl: ",downloadUrl)

    let imageUrl = downloadUrl.toString()
    await firebase.functions().httpsCallable('addImageUrlToItem')({
        imageUrl, itemKey
    })
}

export {
    addItemToInventory,
    removeItemFromInventory,
    getAllItems,
    isUserStoreManager
}