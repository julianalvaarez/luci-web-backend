import { sendMessagesModel } from "../models/sendMessagesModel.js";

export const sendMessagesController = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const { data, error } = sendMessagesModel(name, email, subject, message)

        if (error) {
            res.status(500).json({ error })
        }
        res.status(200).json({
            msg: "Mensaje enviado",
            data
        })
        console.log({ data });
    } catch (error) {
        console.log(error);
    }
}