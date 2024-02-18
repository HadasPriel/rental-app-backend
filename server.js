import express from 'express'
import cors from 'cors'
import path from 'path'

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { rentalService } from './services/rental.service.js'

const app = express()
app.use(express.static('public'))
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))
}



app.get('/api/rental', async (req, res) => {
    try {
        var rentals = await rentalService.query()
        res.send(rentals)
    } catch (err) {
        console.log('err:', err)
        res.status(400).send('Cannot get rentals')
    }

})

app.post('/api/rental', async (req, res) => {
    try {
        var rental = await rentalService.save(req.body)
        res.send(rental)
    } catch (err) {
        console.log('err:', err)
        res.status(400).send('Cannot save rental')
    }
})

app.delete('/api/rental/:rentalId', async (req, res) => {
    const { rentalId } = req.params
    try {
        await rentalService.remove(rentalId)
        res.send(`Rental ${rentalId} Removed`)
    } catch (err) {
        console.log('err:', err)
        res.status(400).send('Cannot remove rental')
    }
})


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
app.listen(port, () =>
    console.log(`Server listening on port http://127.0.0.1:${port}/`)
)

