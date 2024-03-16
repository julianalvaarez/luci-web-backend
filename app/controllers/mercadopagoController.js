import { mercadoPagoModel } from "../models/mercadopagoModel.js"


export const mercadoPagoController = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: 'ARS',

                }
            ],
            back_urls: {
                success: 'https://lucianacresia.netlify.app/realizatedPage',
                failure: 'https://lucianacresia.netlify.app',
                pending: 'https://lucianacresia.netlify.app'
            },
            auto_return: "approved",
            notification_url: "https://luci-web-backend-production.up.railway.app/webhook",
            metadata: {
                patientData: req.body.patientData,
                shiftData: req.body.shiftData
            },

        }

        const { result } = await mercadoPagoModel(body)

        res.json({
            id: result.id,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Error al crear la preferencia'
        })
    }
}