import { Router } from "express";
import { mercadoPagoController } from "../controllers/mercadopago.js";
import { addDataController } from "../controllers/addDataController.js";
import { viewDataController } from "../controllers/viewDataController.js";
import { Resend } from "resend";

const router = Router(); // Sirve para exportar las rutas al router principal
const resend = new Resend("re_2ZnRBvju_zf7xtCwFt9uq6DpdUJhv9SJX");

router.post("/create_preference", mercadoPagoController);

// Endpoint para confirmar turno
router.post("/confirmar-turno", addDataController);

router.get("/turnos-ocupados", viewDataController);

router.post("/send-message", async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const { data, error } = await resend.emails.send({
      from: email,
      to: "julialva2008@gmail.com",
      subject: `${subject}: ${name}`,
      html: message,
    });

    if (error) {
      res.status(500).json({
          error
      })
    }
    res.status(200).json({
        data
    })
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
});

export default router;
