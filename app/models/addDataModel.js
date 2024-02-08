import {createClient} from '@supabase/supabase-js';


const supabaseUrl = 'https://snpzufisarbliaevsggm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucHp1ZmlzYXJibGlhZXZzZ2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MjUyMzUsImV4cCI6MjAyMjQwMTIzNX0.D_8pSrHV-LTygg5upvGNTIK2FGj2amPrgz0AR7Zi860';
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