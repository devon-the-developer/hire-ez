import React, { useState, useEffect } from 'react'
import { getReceiptList } from '../../logic/database/DBHandler'

const CurrentReceipts = () => {
    let [loading, setLoading] = useState(true)
    let [receiptsList, setReceiptsList] = useState([])
    
    useEffect(() => {
        let isSubscribed = true
        const loadCurrentReceipts = async() => {
            let allReceipts = await getReceiptList()
            if (isSubscribed) {
                setReceiptsList(allReceipts)
                setLoading(false)
            }
        }

        loadCurrentReceipts()

        console.log({receiptsList})

        return () => isSubscribed = false
    }, [loading])

    return (
        <div className="inventory">
            Current Receipts
            {/* {receiptsList.forEach((receipt, index) => {
                console.log(receipt)
            })} */}
        </div>
    )
}

export default CurrentReceipts
