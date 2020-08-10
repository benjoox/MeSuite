export async function fetchAccounts(token) {
    try {
        const response = await fetch(process.env.API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const { content } = await response.json()
        return content
    } catch(err) {
        console.error('Error from the server ', err)
        throw err
    }
}

export async function saveAccountTransaction(account, token) {
    try {
        return await fetch(process.env.API_URL, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(account)
        })
    } 
    catch(err) {
        console.error('Error from the server ', err)
        throw err
    }
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
        throw err
    }
}

export async function updateAccountTransaction(params, token) {
    try {
        const response = await fetch(process.env.API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(params)
        })
        const { content } = await response.json()
        if(!content) return  
    } catch(err) {
        console.error('Error from the server ', err)
        throw err
    }
}