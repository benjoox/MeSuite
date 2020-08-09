export async function fetchAccounts(token) {
    const response = await fetch(process.env.API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const { content } = await response.json()
    return content 
}

export async function saveAccountTransaction(account, token) {
    await fetch(process.env.API_URL, {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(account)
    })
    return await fetchAccounts()
}

export async function deleteAccountTransaction(id, token) {
    try {
        const response = await fetch(process.env.API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(id)
        })
        const { content } = await response.json()
        if(!content) return  
    } catch(err) {
        console.error('Error from the server ', err)
    }
}