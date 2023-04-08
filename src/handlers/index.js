const amqp = require('amqplib');
/**
 * A Lambda function that logs the payload received from SQS.
 */
 exports.main = async (event, context) => {
    
  try {
    const connection = await amqp.connect('amqps://user_prod:H&du[-uyxxf@b-2d594eec-5b9b-43fe-adb0-9f9f500152a1.mq.us-east-1.amazonaws.com:5671');
    const channel = await connection.createChannel();
    
    const mensagem = 'Hello, World!';

    await channel.assertQueue('nome-da-fila');
    await channel.sendToQueue('nome-da-fila', Buffer.from(mensagem));
    console.log(`Mensagem "${mensagem}" enviada para a fila.`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
};