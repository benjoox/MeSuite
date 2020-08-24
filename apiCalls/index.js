const headers = token => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
})
export async function fetchEntity(token, entity) {
    try {
        const response = await fetch(`${process.env.API_URL}/${entity}`, {
            method: 'GET',
            headers: headers(token)
        })
        const { content } = await response.json()
        return content
    } catch(err) {
        console.error('Error from the server ', err)
        throw err
    }
}

export async function save(account, token, entity) {
    try {
        return await fetch(`${process.env.API_URL}/${entity}`, {  
            method: 'POST',
            headers: headers(token),
            body: JSON.stringify(account)
        })
    } 
    catch(err) {
        console.error('Error from the server ', err)
        throw err
    }
}

export async function deleteEntity(id, token, entity) {
    try {
        const response = await fetch(`${process.env.API_URL}/${entity}`, {
            method: 'DELETE',
            headers: headers(token),
            body: JSON.stringify(id)
        })
        const { content } = await response.json()
        if(!content) return  
    } catch(err) {
        console.error('Error from the server ', err)
        throw err
    }
}

export async function update(params, token, entity) {
    try {
        const response = await fetch(`${process.env.API_URL}/${entity}`, {
            method: 'PUT',
            headers: headers(token),
            body: JSON.stringify(params)
        })
        const { content } = await response.json()
        if(!content) return  
    } catch(err) {
        console.error('Error from the server ', err)
        throw err
    }
}