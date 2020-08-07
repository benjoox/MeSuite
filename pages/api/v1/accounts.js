import { getAccounts } from '../models/accounts/index.js'

export default async (req, res) => {
    const { method } = req
    let response = null
    switch(method) {
        case 'GET': 
            try {
                console.log('The GET method in accounts is called with headers')
                const accountsMap = await getAccounts()
                res.json({
                    success: true, 
                    content: accountsMap
                })
            } catch(err) {
                console.log('Error in getting accounts in the api level ', err.message)
                if(err.message === 'invalid signature') {
                    res.status(401).send({
                        error: 'Unauthorized',
                        message: 'The user is not verfied. Try logging out and in'    
                    })
                }
            } 
            
            break;

        case 'PUT':
            
            break;
        case 'POST': 
           
            break;
        default:
            console.log('The HTTP method requesed is not valid')
    }
}