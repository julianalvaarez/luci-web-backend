import { resend } from '../libs/resend.js';
import { supabase } from '../libs/supabase.js';


export const addShift = async (shiftData, patientData, paymentMethod) => {
    // Agregar datos a la tabla de clientes
    const { data, error } = await supabase.from('clients').upsert([patientData]);

    // Agregar datos a la tabla de turnos
    const newShiftData = {
        date: shiftData.fecha,
        start_hour: shiftData.hora_inicio,
        end_hour: shiftData.hora_fin,
    }

    const { data: turno, error: errorTurno } = await supabase.from('shifts').upsert([newShiftData]);

    if (paymentMethod === 'MERCADOPAGO') {
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["julialva2008@gmail.com", patientData.email,],
            subject: `Turno Nutricional Confirmado`,
            html: `<p>Nombre Completo: ${patientData.name} ${patientData.surname}</p></br><p>Numero de Telefono: ${patientData.tel}</p></br><p>Fecha Programada: ${newShiftData.date}</p></br><p>Horario Programado: ${newShiftData.start_hour} - ${newShiftData.end_hour} (Hora Argentina)</p></br><p>Monto Total: 8000ARS</p></br><p>Ante cualquier duda, consulte al <strong>+54 9 11 6536-8186</strong>.</p>`,
        });

    } else {
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["julialva2008@gmail.com", patientData.email,],
            subject: `Turno Nutricional Confirmado`,
            html: `<p>Nombre Completo: ${patientData.name} ${patientData.surname}</p></br><p>Numero de Telefono: ${patientData.tel}</p></br><p>Fecha Programada: ${newShiftData.date}</p></br><p>Horario Programado: ${newShiftData.start_hour} - ${newShiftData.end_hour} (Hora Argentina)</p></br><p>Monto Total: 10USD</p></br><p>Ante cualquier duda, consulte al <strong>+54 9 11 6536-8186</strong>.</p>`,
        });
    }

    return {
        data, turno
    }
}