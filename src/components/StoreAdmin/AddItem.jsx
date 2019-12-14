import React, { Fragment, useState } from 'react'
import { addItemToInventory } from '../../logic/database/DBHandler'
 
const AddItem = (props) => {
    let [name, setName] = useState(null)
    let [type, setType] = useState(null)
    let [image, setImage] = useState(null)
    let [error, setError] = useState(null)

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        console.log({name, type, image})
        try {
            await addItemToInventory(name, type, image)
            props.onFinish()
        } catch (err) {
            setError(err)
            console.log(err)
        }
    }

    return (
      <div className="optionsBox">
        {error ? (
          <p>{error.message}</p>
        ) : (
          <form>
            <label>
              <strong>Name: </strong>
              <input
                type="text"
                onChange={e => setName(e.target.value)}
              ></input>
            </label>
            <br />
            <label>
              <strong>Type: </strong>
              <input
                type="text"
                onChange={e => setType(e.target.value)}
              ></input>
            </label>
            <br />
            <label>
              <strong>Image: </strong>
              <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
              ></input>
            </label>
            <br />
            <br />
            <button disabled={!name || !type} onClick={handleSubmitForm}>
              Add This Object
            </button>
          </form>
        )}
      </div>
    );
}

export default AddItem