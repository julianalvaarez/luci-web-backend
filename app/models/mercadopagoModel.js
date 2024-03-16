import { Preference } from 'mercadopago'
import { client } from '../libs/mercadopago.js';


export const mercadoPagoModel = async (body) => {
    const preference = new Preference(client)
    const result = await preference.create({ body })
    return { result }
}