import { webhookModel } from "../models/webhookModel.js"

export const webhookController = async (req, res) => {
    const query = req.query
    const id = query['data.id']

    try {
        const { response } = webhookModel(id)

        if (response.ok) {
            const { status, status_detail, metadata } = await response.json()
            if (status === 'approved' && status_detail === 'accredited') {
                await addShift(metadata.shift_data, metadata.patient_data)
            }
        }

        res.sendStatus(200)
    } catch (error) {
        console.error('Error', error);
        res.sendStatus(500)
    }
}