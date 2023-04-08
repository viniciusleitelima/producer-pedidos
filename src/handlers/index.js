const amqp = require('amqplib');
/**
 * A Lambda function that logs the payload received from SQS.
 */
 exports.main = async (event, context) => {
    
  try {
    const connection = await amqp.connect('amqps://user_dev:Kell1@172395@b-d7539191-61ac-440e-b007-6e3d19a8d2c6.mq.us-east-1.amazonaws.com:5671/pedidos_queue');
    const channel = await connection.createChannel();

    const mensagem = {
      "codigoPedido": 1001,
      "codigoCliente":1,
      "itens": [{
        "produto": "lápis",
        "quantidade": 100,
        "preco": 1.10
      },
      {
        "produto": "caderno",
        "quantidade": 10,
        "preco": 1.00
      }
     ]
    }

    await channel.assertQueue('pedidos_queue');
    await channel.sendToQueue('pedidos_queue', Buffer.from(mensagem));
    console.log(`Mensagem "${mensagem}" enviada para a fila.`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
};