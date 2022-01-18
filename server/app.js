const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json())

const vapidKeys = {
    publicKey: 'BOCuH-S3lasC9zS6Auo3YOn8b3wLPdCY90pDGYEwjVYhR6lt_s3AYpgwcksn1gPOVEFzF6Y_rU6aNFzxDJboe74',
    privateKey: 'sGOd01xVQ1g3FCCBlD54UN4vtytc4L3jmJQGPkurP9g'

};

webpush.setVapidDetails(
    'mailto:  ',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
//---------------------- HELPERS - AYUDANTES ----------------------
const handlerResponse = (res, message, status) => {
    res.status(status).json({
        message
    });
}


//----------------------- CONTROLLERS - CONTROLADORES -----------------------

const savePush = (req, res) => {
    const name = Math.floor(Date.now() / 1000);
    let tokenBrowser = req.body.token;
    let tokenFinal = JSON.stringify(tokenBrowser, null, 2);

    fs.writeFile(`./tokens/token-${name}.json`, tokenFinal, (err) => {
        if (err) {
            handlerResponse(res, `Error write`, 500);
        }
        handlerResponse(res, `Guardado`, 200);
    });
}
const sendPush = (req, res) => {

    const payload = {
        "notification": {
            "title": "😄😄 Saludos",
            "body": "Subscribete a mi canal de YOUTUBE",
            "vibrate": [100, 50, 100],
            "image": "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }


    const directoryPath = path.join(__dirname, 'tokens');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            handlerResponse(res, `Error read`, 500);
        }
        files.forEach((file) => {
            const tokenRaw = fs.readFileSync(`${directoryPath}/${file}`);
            const tokenParse = JSON.parse(tokenRaw);

            webpush.sendNotification(
                    tokenParse,
                    JSON.stringify(payload))
                .then(res => {
                    console.log('Enviado !!');
                }).catch(err => {
                    console.log('El usuario no tiene servicios o las llaves son incorrectas', err);
                });
        });
    });
    res.send({ data: 'Se envio subscribete!!' })
};

//---------------------- ROUTES - RUTAS ----------------------

app.route('/save').post(savePush);
//app.route('/send').post(sendPush);
const httpServer = app.listen(9000, () => {
    console.log('Servidor en puerto 9000');
});
