import { addDataModel } from "../models/addDataModel.js";

export const addDataController = async (req, res) => {
  const { datosCliente, datosTurno } = req.body;

  if (!datosCliente || !datosTurno) {
    return res.status(400).json({ error: 'Datos de cliente o turno faltantes' });
  }

  try {
    const { cliente, errorCliente, turno, errorTurno } = await addDataModel(datosCliente, datosTurno);

    if (errorCliente || errorTurno) {
      console.error('Error al agregar datos a la base de datos', errorCliente || errorTurno);
      res.status(500).json({ error: 'Error al agregar datos a la base de datos' });
    } else {
      console.log('Datos agregados correctamente', cliente, turno);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Error general', error);
    res.status(500).json({ error: 'Error general' });
  }
};
