import getFirebase from '../../fire'
let firebase = getFirebase()

const addItemToInventory = async() => {
    try{
        await firebase.functions().httpsCallable('addToInventory')({
        itemObject: {name: "Object", cost: "$5"}
        })
        console.log("Object Added")
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
export {
    addItemToInventory,
    removeItemFromInventory,
    getAllItems
    }