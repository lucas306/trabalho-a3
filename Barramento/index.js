const express = require('express')
const app = express();
const axios = require('axios');
app.use(express.json());
const port = 10000;

const eventos  =[];

app.get('/eventos', (req, res) => {
    res.send(eventos);
});

app.post('', (req, res) => {
    const evento = req.body;
    eventos.push(evento);

    axios.post('http://localhost:/eventos')
});

app.listen(port,() => {
    console.log("Barramento de eventos online. Port:10000");
});