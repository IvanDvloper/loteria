var express = require('express');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3100;
const PushNotifications = require('@pusher/push-notifications-server');
const index = express();
index.use(bodyParser.urlencoded({extended: false}));
index.use(bodyParser.json());
index.get('/random/:numero', (req, res) => {
    if (req.params.numero) {

        var num = req.params.numero;
        var numInt = parseInt(num);
        if (!isNaN(numInt)) {
            if (randomNum > 100)
                randomNum = 100;

            var randomNum = Math.floor(Math.random() * (num - 1 + 1)) + 1;

            return res.status(200).json({status: "ok", data: randomNum});
        } else {

            {
                return res.status(400).send({status: "error", data: "is not a number"});
            }
        }
    } else {
        return res.send({status: "error", data: "error on the request"});
    }


});

index.get('/', (req, res) => {
    return res.status(200).send("Bienvenido");
})
index.get('/push', (req, res) => {
    let beamsClient = new PushNotifications({
        instanceId: '8db07c92-87d8-4bfc-a5e0-dc85589eb233',
        secretKey: 'F57032DCB05C8614021E16C5237A88F294BC7F3FD95C4B004072887E102D7B20'
    });
    beamsClient.publishToInterests(['debug-hello'], {
        apns: {
            aps: {
                alert: 'Hello!'
            }
        },
        web: {
            notification: {
                title: "Alerta",
                body: "Hubo un numero mayor a 80!"
            }
        },
        fcm: {
            notification: {
                title: 'Hola',
                body: 'Hola esta es una alerta de pusher!'
            }
        },

    }).then((publishResponse) => {
        console.log('Alerta:', publishResponse.publishId);

        return res.send("Alertrta "+publishResponse.publishId);

    }).catch((error) => {
        return res.send("error en la alerta ");
        console.error('Error:', error);

    });

});
index.listen(port, () => {
    console.log("Servidor arriba");
});

module.exports = index;