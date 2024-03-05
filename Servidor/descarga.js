const amqp = require('amqplib');
const jsonSelf = require('../self.json');



async function startServer() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'my_exchange';
    const queueName = 'my_queue';

    // Declare exchange
    await channel.assertExchange(exchangeName, 'direct');

    // Declare queue
    await channel.assertQueue(queueName);

    // Bind queue to exchange
    await channel.bindQueue(queueName, exchangeName, '');

    console.log('MOM server started. Waiting for messages...');

    // Consume messages
    await channel.consume(queueName, (msg) => {
      if (msg !== null) {
        console.log('Received message:', msg.content.toString());
        // Process the message here

        // Acknowledge the message
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

startServer();
