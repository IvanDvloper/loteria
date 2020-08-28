var express = require('express');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3100;

const index = express();
index.use(bodyParser.urlencoded({extended: false}));
index.use(bodyParser.json());
index.get('/random/:numero', (req, res) =>
{
    if (req.params.numero)
    {

        var num = req.params.numero;
        var numInt = parseInt(num);
        if (!isNaN(numInt))
        {
            if (randomNum > 100)
                randomNum = 100;

            var randomNum = Math.floor(Math.random() * (num - 1 + 1)) + 1;

            return res.status(200).json({status:"ok",data: randomNum});
        }
        else
        {

            {
                return res.status(400).send({status:"error",data: "is not a number"});
            }
        }
    }
    else
    {
        return res.send({status:"error",data: "error on the request"});
    }


});
index.get('/', (req, res) =>
{
    return res.status(200).send("Bienvenido");
})
index.listen(port, () =>
{
    console.log("Servidor arriba");
});

module.exports = index;