const express = require('express')
const app = express();
const axios = require('axios');
app.use(express.json());

const {v4 : uuidv4} = require('uuid');
const port = 5000;
const chamadaDeSenhas = {};

app.get('', async (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post('/senhas/:id/', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;

    const chamadaDeSenha = chamadaDeSenhas[req.params.id] || [];
    chamadaDeSenha.push({id: idObs, texto});
    chamadaDeSenhas[req.params.id] = chamadaDeSenha;

    axios.post('http://localhost:10000/eventos', {
        tipo: "SenhaChamada",
        dados:{
            id: idObs,
            texto,
            lembreteId: req.params.id
        }
    });

    res.status(200).send(chamadaDeSenhas)
});

app.post('/eventos', (req, res) => {
    try{
      funcoes[req.body.tipo](req.body.dados);  
    }
    catch (ex){
      console.log(ex)
      console.log(req.body)
    }
    res.status(200).send({msg: 'ok'})
});

app.listen(port, () =>{
    console.log("");
})
