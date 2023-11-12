import React from "react"

const TransactionInfoPage =({transactionHash})=>{



    return (
        <a target="_blank" href={`https://bscscan.com/tx/${transactionHash}`}>
            {transactionHash}
        </a>
    )
}


export default TransactionInfoPage
