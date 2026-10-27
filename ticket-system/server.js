
import express from 'express'

import ticketRoutes from './router/ticketRoutes.js'



const app = express()

app.use(express.json())


app.use('/tickets', ticketRoutes)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})