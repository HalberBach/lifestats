const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
// Routing configuration goes here.
app.use(cors())
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello World' })
});