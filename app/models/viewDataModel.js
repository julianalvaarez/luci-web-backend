import {createClient} from '@supabase/supabase-js';


const supabaseUrl = 'https://snpzufisarbliaevsggm.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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