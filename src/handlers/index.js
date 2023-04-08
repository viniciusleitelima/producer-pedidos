
/**
 * A Lambda function that logs the payload received from SQS.
 */

exports.main = async (event, context) => {
  const amqp = require('amqp')

  const conn = amqp.createConnection({
    host: 'b-796ab016-9539-4244-9dd2-6133e2fe7866.mq.us-east-1.amazonaws.com',
    port: 5671,
    login: 'user_dev',
    password: 'Kell1#172395',
    connectionTimeout: 10000
  })

  conn.on('ready', () => {
    let count = 1
    let message = `TEST ${count}`
    conn.publish('pedidos_queue', message)
    console.log(`SENT ${count} - ${message}`)

  })



  // try {
  //   const connection = await amqp.connect('amqps://user_dev:Kell1#172395@b-796ab016-9539-4244-9dd2-6133e2fe7866.mq.us-east-1.amazonaws.com:5671');
  //   const channel = await connection.createChannel();


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
