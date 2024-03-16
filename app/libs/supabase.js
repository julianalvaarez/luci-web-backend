import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://snpzufisarbliaevsggm.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY ?? '1';
export const supabase = createClient(supabaseUrl, supabaseKey);