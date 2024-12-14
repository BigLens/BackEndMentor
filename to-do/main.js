const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

app.use(cors());

const PORT = process.env.PORT || 5000

//setting the search route
app.get('/search', async (req,res) => {
    //destructing from query param
    const {query} = req.query;
    //validating query param
    if(!query){
        return res.status(400).send('Query parameter "query" is required');
    }
    try {
        //send a request to the unsplash api
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params:{
                query:query,
                per_page:10,
                orientation:req.query.orientation || 'landscape',
                client_id:process.env.UNSPLASH_ACCESSKEY,
            }
        });
        //sending back a data
        const images = response.data.results.map((items) => ({
            id:items.id,
            description:items.alt_description,
            url:items.urls.small,
            photographer:items.user.name

        }))
        res.json(images);
    } catch (error) {
        if(error.response){
            console.error("Unsplash API Error:", error.response.data);
            return res.status(error.response.status)
        }
        else{
            console.error(error.message);
            return res.status(500).json({msg: 'Error'})
        }

    }
});
app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));
