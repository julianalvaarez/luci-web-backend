import {MercadoPagoConfig, Preference} from 'mercadopago'

const client = new MercadoPagoConfig({ accessToken: 'TEST-6516047868522639-012514-a2fe376e4f4f7ebefd052152d0e93799-1103102307' });

export const mercadoPagoModel = async (body) => {
    const preference = new Preference(client)
    const result = await preference.create({body})

    return {result}
}