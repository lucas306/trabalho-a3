const express = require('express')
const app = express();
const axios = require('axios');
app.use(express.json());

const port = 10000;
const eventos  =[];

app.get('/eventos', (req, res) => {
    res.send(eventos);
});

app.post('/eventos', async (req, res) => {
    const evento = req.body;
    eventos.push(evento);

    axios.post('http://localhost:4000/eventos', evento)
        .catch((err) =>{
            console.log("microservice off-line " + err);
        });

    axios.post('http://localhost:5000/eventos', evento)
        .catch((err) =>{
            console.log("microservice off-line " + err);
        });   

    res.status(200).send({msg:'ok'});
});

app.listen(port,() => {
    console.log("Barramento de eventos online. Port:10000");
});
