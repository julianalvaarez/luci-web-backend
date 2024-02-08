import express from 'express'
import cors from 'cors'
import routes from './router/routerApp.js';


const port = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(port, () => console.log(`Server on port ${port}`))
//julianalvaarez2611