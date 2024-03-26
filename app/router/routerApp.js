import { Router } from "express";
import { mercadoPagoController } from "../controllers/mercadopagoController.js";
import { viewDataController } from "../controllers/viewDataController.js";
import { webhookController } from "../controllers/webhookController.js";
import { sendMessagesController } from "../controllers/sendMessagesController.js";
import paypal from '@paypal/checkout-server-sdk';
import { addShift } from "../helpers/addShift.js";

const clientId = 'AfD5_J5oF-QwPo9jm2SaLmeluYJGdRgRV0bn_KB6bJ2xKgX6BMejeu5u8MVj-bOc0bpckirEclmLQRIK'
const clientSecret = process.env.PAYPAL_SECRET_KEY

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
const client = new paypal.core.PayPalHttpClient(environment)

const router = Router(); // Sirve para exportar las rutas al router principal

router.post("/create_preference", mercadoPagoController);

router.get("/busy-shifts", viewDataController);

router.post("/send-message", sendMessagesController);

router.post('/webhook', webhookController);

router.post('/confirmate-paypal-payment', async (req, res) => {
    const { patientData, shiftData } = req.body
    await addShift(shiftData, patientData, 'PAYPAL')
    res.status(200)
})

router.post('/paypal-payment', async (req, res) => {

    const request = new paypal.orders.OrdersCreateRequest()

    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: "10.00",
                    breakdown: {
                        currency_code: 'USD',
                        value: '10.00'
                    },
                },
                description: 'Turno Nutricional'

            }
        ]
    })

    const response = await client.execute(request)

    console.log(response)

    res.json({
        id: response.result.id
    })
})

export default router;
