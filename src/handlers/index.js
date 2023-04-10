const amqp = require('amqplib');
let fs = require('fs');
/**
 * A Lambda function that logs the payload received from SQS.
 */

exports.main = async (event, context) => {
  
var opts = {
  cert: fs.readFileSync('../Certificate.pem'),
  key: fs.readFileSync('../7e643d70e00b236c63c5926699f9c57c7ec86b48.key'),
  // cert and key or
  // pfx: fs.readFileSync('../etc/client/keycert.p12'),
  //passphrase: 'MySecretPassword',
  ca: [fs.readFileSync('../viniciusleite.desenvolvedor@gmail.com.crt')]
};

// Options for just confidentiality. This requires RabbitMQ's SSL
// configuration to include the items
//
//     {verify, verify_none},
//     {fail_if_no_peer_cert,false}
//
// var opts = {  ca: [fs.readFileSync('../etc/testca/cacert.pem')] };

// Option to use the SSL client certificate for authentication
// opts.credentials = amqp.credentials.external();

var open = amqp.connect('amqps://b-796ab016-9539-4244-9dd2-6133e2fe7866.mq.us-east-1.amazonaws.com:5671', opts);

open.then(function(conn) {
  process.on('SIGINT', conn.close.bind(conn));
  return conn.createChannel().then(function(ch) {
    ch.sendToQueue('foo', Buffer.from('Hello World!'));
  });
}).then(null, console.warn);




  // try {
  //   const connection = await amqp.connect('amqps://b-796ab016-9539-4244-9dd2-6133e2fe7866.mq.us-east-1.amazonaws.com:5672');
  //   const channel = await connection.createChannel();
  //   console.log("conexao criada");


  //   const mensagem = {
  //     "codigoPedido": 1001,
  //     "codigoCliente":1,
  //     "itens": [{
  //       "produto": "lápis",
  //       "quantidade": 100,
  //       "preco": 1.10
  //     },
  //     {
  //       "produto": "caderno",
  //       "quantidade": 10,
  //       "preco": 1.00
  //     }
  //     ]
  //   }

  //   await channel.assertQueue('pedidos_queue');
  //   await channel.sendToQueue('pedidos_queue', Buffer.from(mensagem));
  //   console.log(`Mensagem "${mensagem}" enviada para a fila.`);

  //   await channel.close();
  //   await connection.close();
  // } catch (error) {
  //   console.error(error);
  // }
};
