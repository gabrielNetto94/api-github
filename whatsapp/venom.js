const venom = require('venom-bot');
const config = require('../config.json');
venom.create().then((client) => start(client));

async function start(client) {

    /*
    const groups = await client.getAllGroups();
    console.table(groups[0].groupMetadata.participants);
    */
    client.onMessage((message) => {

        //mensagem de grupo
        if (message.isGroupMsg === true) {
            //console.log(message);
            console.log('Nome do grupo: ' + message.chat.name + ' / Nome contato: ' + message.sender.pushname + ' / Mensagem: ' + message.body);
        }
        // mensagem privada
        else {    
            console.log('Nome contato: ' + message.sender.pushname + ' / Mensagem: ' + message.body);

            if (message.from === config.AMANDA_PHONE + '@c.us') {
                console.log('Privado: ' + message.sender.pushname + ': ' + message.body);
                client.sendText(message.from, 'Olá ' + message.sender.pushname + ' assim que possível irei responder');
            }
        }
    });
}