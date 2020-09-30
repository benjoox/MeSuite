const headers = (token) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
})

async function handleApiReponse(response: Promise<any>) {
    if (response.status !== 200) {
        const { error, message } = await response.json()
        if (error) {
            throw Error(message)
        } else {
            throw Error('Saving failed and it did not tell us why')
        }
    }
    const { content } = await response.json()
    return content
}

export async function fetchEntity(token, entity) {
    const response = await fetch(`${process.env.API_URL}/${entity}`, {
        method: 'GET',
        headers: headers(token),
    })
    return handleApiReponse(response)
}

export async function save(account, token, entity) {
    const response = await fetch(`${process.env.API_URL}/${entity}`, {
        method: 'POST',
        headers: headers(token),
        body: JSON.stringify(account),
    })
    return handleApiReponse(response)
}

export async function deleteEntity(id, token, entity) {
    const response = await fetch(`${process.env.API_URL}/${entity}`, {
        method: 'DELETE',
        headers: headers(token),
        body: JSON.stringify(id),
    })
    return handleApiReponse(response)
}

export async function update(params, token, entity) {
    const response = await fetch(`${process.env.API_URL}/${entity}`, {
        method: 'PUT',
        headers: headers(token),
        body: JSON.stringify(params),
    })
    return handleApiReponse(response)
}
