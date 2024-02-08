import express from 'express';

const app = express();
app.use(express.json());

const supabaseUrl = 'https://snpzufisarbliaevsggm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucHp1ZmlzYXJibGlhZXZzZ2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MjUyMzUsImV4cCI6MjAyMjQwMTIzNX0.D_8pSrHV-LTygg5upvGNTIK2FGj2amPrgz0AR7Zi860';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Endpoint para confirmar turno
app.post('/confirmar-turno', async (req, res) => {
  const datosCliente = req.body;
  console.log(datosCliente);

if (!datosCliente) {
  return res.status(400).json({ error: 'Datos de cliente o turno faltantes' });
}

  try {
    const datosCliente = req.body;

    // Agregar datos a la tabla de clientes
    const { data: cliente, error: errorCliente } = await supabase
      .from('clients')
      .insert([datosCliente]);

    // Agregar datos a la tabla de turnos
    // const { data: turno, error: errorTurno } = await supabase
    //   .from('turnos')
    //   .insert([datosTurno]);
    

    if (errorCliente) {
      console.error('Error al agregar datos a la base de datos');
      res.status(500).json({ error: 'Error al agregar datos a la base de datos' });
    } else {
      console.log('Datos agregados correctamente', cliente, turno);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Error general', error);
    res.status(500).json({ error: 'Error general' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
