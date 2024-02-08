import {createClient} from '@supabase/supabase-js';


const supabaseUrl = 'https://snpzufisarbliaevsggm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucHp1ZmlzYXJibGlhZXZzZ2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MjUyMzUsImV4cCI6MjAyMjQwMTIzNX0.D_8pSrHV-LTygg5upvGNTIK2FGj2amPrgz0AR7Zi860';
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