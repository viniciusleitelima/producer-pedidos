const amqp = require('amqplib');
/**
 * A Lambda function that logs the payload received from SQS.
 */
 exports.main = async (event, context) => {
    
  try {
    //const connection = await amqp.connect('amqp://user:senha@localhost:5672/nome-da-fila');
    //const channel = await connection.createChannel();
    
    const mensagem = 'Hello, World!';

    //await channel.assertQueue('nome-da-fila');
    //await channel.sendToQueue('nome-da-fila', Buffer.from(mensagem));
    console.log(`Mensagem "${mensagem}" enviada para a fila.`);

    //await channel.close();
    //await connection.close();
  } catch (error) {
    console.error(error);
  }
};