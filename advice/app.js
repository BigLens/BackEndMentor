const express = require('express')
const app = express();
const axios = require('axios');

app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 5000;

app.get('/api/advice', async (req,res) => {
    try {
        const response = await axios.get('https://api.adviceslip.com/advice')
        const advice = response.data.slip.advice;
        res.render('index', {advice})
    } catch (error) {
        res.render('index', {message: 'Could not fetch advice'})
    }
})


app.listen(PORT, console.log(`Server is listening on port ${PORT}`))