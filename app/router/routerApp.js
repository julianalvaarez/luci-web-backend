import { Router } from "express";
import { mercadoPagoController } from "../controllers/mercadopagoController.js";
import { viewDataController } from "../controllers/viewDataController.js";
import { webhookController } from "../controllers/webhookController.js";
import { sendMessagesController } from "../controllers/sendMessagesController.js";


const router = Router(); // Sirve para exportar las rutas al router principal

router.post("/create_preference", mercadoPagoController);

router.get("/busy-shifts", viewDataController);

router.post("/send-message", sendMessagesController);

router.post('/webhook', webhookController);

export default router;
