export async function getTransaction(date, ticker) {
    console.log('Sending the request to get Transactions ')
    const response = await fetch(`/api/v1/transactions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, ticker })
    })
    return response.json()
}

export async function getAllTransactions() {
    console.log('Sending the request to get Transactions ')
    
    const response = await fetch(`/api/v1/transactions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, ticker })
    })
    return response.json()
}
export async function addTransaction(params) {
    const response = await fetch(`/api/transactions`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    return response.json()
}

export async function getLastDBPrice(date, ticker) {
    const response = await fetch(`/api/prices?date="${date}"&ticker=${ticker}`)
   return response.json()
}