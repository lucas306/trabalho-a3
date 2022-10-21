const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const axios = require("axios");
const port = 4000;

senhas = {};
contadorId = 0;

app.get('/senhas',(req, res) => {
    res.send(senhas);
});

app.post('/senhas', async (req, res) => {
    contadorId++;
    let numeroSenha1 = 0;
    let numeroSenha2 = 0;
    let numeroSenha3 = 0;
    
    const {especialidade} = req.body;
        switch(especialidade){

            case 1:
                numeroSenha1++;
                const med1 = "CG";   //Clinico Geral
                senhas[contadorId] = {
                    numeroSenha1, med1 
                };

                await axios.post("http://localhost:10000/eventos",{
                    tipo: 'SenhaGerada',
                    especialidade,
                    med1,
                    numeroSenha1,
                    contadorId
                });
                console.log(senhas);
            break;

            case 2:
                numeroSenha2++;
                const med2 = "CO";   //Clinico Ortopedista
                senhas[contadorId] = {
                    numeroSenha2, med2 
                };

                await axios.post("http://localhost:10000/eventos",{
                    tipo: 'SenhaGerada',
                    dados:{
                        especialidade,
                        med2,
                        numeroSenha2,
                        contadorId
                    }
                });
                console.log(senhas);
            break;

            case 3:
                numeroSenha3++;
                const med3 = "CP";   //Clinico Pediatra
                senhas[contadorId] = {
                    numeroSenha3, med3 
                };

                await axios.post("http://localhost:10000/eventos",{
                    tipo: 'SenhaGerada',
                    dados:{
                        especialidade,
                        med3,
                        numeroSenha3,
                        contadorId
                    }
                });
                console.log(senhas);
            break;
        };
        res.status(201).send(senhas[contadorId]);
});

app.post('/eventos', (req, res) =>{
    console.log(req.body);
    res.status(200).send({msg:"ok"});
});

app.listen(port, () => {
    console.log('Porta 4000');
});
