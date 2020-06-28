export async function getTransaction(date, ticker) {
    const response = await fetch(`/api/transactions`, {
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