import {createClient} from '@supabase/supabase-js';


const supabaseUrl = 'https://snpzufisarbliaevsggm.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const addDataModel = async (datosCliente, datosTurno) => {
    // Agregar datos a la tabla de clientes
    const { data, error } = await supabase
    .from('clients')
    .upsert([datosCliente]);

    console.log(data);

    // Agregar datos a la tabla de turnos
    const shiftData = {
        date: datosTurno.fecha,
        start_hour: datosTurno.horaInicio,
        end_hour: datosTurno.horaFin
    }
    const { data: turno, error: errorTurno } = await supabase
    .from('shifts')
    .upsert([shiftData]);

    return {
        cliente: data, errorCliente: error, turno, errorTurno
    }
}