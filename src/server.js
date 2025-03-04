import axios from "axios";
import cors from "cors";
import express from "express"

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/fetch/*', async (req, res) => {
    const targetUrl = req.params[0]
    if (!targetUrl) {
        return res.status(400).json({ error: "Missing target URL" })
    }
    try {
        const response = await axios.get(targetUrl, {
            headers: { ...req.headers, host: new URL(targetUrl).host }
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data", details: error.message })
    }
})

app.listen(PORT, () => console.log(`Thing proxy server is running at ${process.env.BACKEND_URL}${process.env.PORT}`))
