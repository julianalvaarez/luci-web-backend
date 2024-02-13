import { Router } from "express";
import { mercadoPagoController } from "../controllers/mercadopago.js";
import { addDataController } from "../controllers/addDataController.js";
import { viewDataController } from "../controllers/viewDataController.js";
import { Resend } from "resend";

const router = Router(); // Sirve para exportar las rutas al router principal
const resend = new Resend(process.env.RESEND_KEY);

router.post("/create_preference", mercadoPagoController);

// Endpoint para confirmar turno
router.post("/confirmar-turno", addDataController);

router.get("/turnos-ocupados", viewDataController);

router.post("/send-message", async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ["julialva2008@gmail.com"],
      subject: `${subject}: ${name} - ${email}`,
      html: message,
    });

    if (error) {
      res.status(500).json({
          error
      })
    }
    res.status(200).json({
        msg: "Mensaje enviado",
        data
    })
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
});

router.post("/shift-confirmated", async (req, res) => {
  const { name, surname, email, fecha, horaInicio, horaFin } = req.body;
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["julialva2008@gmail.com", email],
      subject: `Turno Confirmado: ${name} ${surname}`,
      html: `<p>Nombre Completo: ${name} ${surname}</p></br><p>Fecha Programada: ${fecha}</p></br><p>Horario Programado: ${horaInicio} - ${horaFin}</p></br><p>Monto Total: 5000ARS</p></br><p>Ante cualquier duda, consulte al +54 9 11 6536-8186.</p>`,    
    });

    if (error) {
      res.status(500).json({
          error
      })
    }
    res.status(200).json({
        msg: "Mensaje enviado",
        data
    })
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
});

export default router;
