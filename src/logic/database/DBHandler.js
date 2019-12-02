// const getFirebase = require("../../fire")
import getFirebase from '../../fire'
let firebase = getFirebase()
// const firebase = getFirebase();

const addItemToInventory = async() => {
        try{
            await firebase.functions().httpsCallable('addToInventory')({
            itemObject: {name: "Object", cost: "$5"}
            })
        } catch (error) {
            console.log("Error: ", error.message)
        }
    }
    
export {addItemToInventory}