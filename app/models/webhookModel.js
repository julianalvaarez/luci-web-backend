import { client } from "../libs/mercadopago.js"


export const webhookModel = async (id) => {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.accessToken}`
        }
    })
    return {
        response
    }
}