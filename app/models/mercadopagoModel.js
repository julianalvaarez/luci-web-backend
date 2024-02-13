import {MercadoPagoConfig, Preference} from 'mercadopago'

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export const mercadoPagoModel = async (body) => {
    const preference = new Preference(client)
    const result = await preference.create({body})

    return {result}
}