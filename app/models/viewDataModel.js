import { supabase } from "../libs/supabase.js";


export const viewDataModel = async () => {
  try {
    const { data: busyShifts, error } = await supabase
      .from('shifts')
      .select('*'); // Puedes ajustar este '*' según las columnas que necesites

    if (error) {
      console.error('Error al obtener los turnos ocupados', error);
      return { error: 'Error al obtener los turnos ocupados' };
    }

    return { busyShifts };
  } catch (error) {
    console.error('Error general', error);
    return { error: 'Error general' };
  }
}