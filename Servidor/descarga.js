const amqp = require('amqplib');
const jsonSelf = require('../self.json');

async function connectRabbitMQ() {
  try {
    const username = jsonSelf.rabitMQUser;
    const password = jsonSelf.rabitMQPassword;
    const hostname = jsonSelf.rabiMQExchange;
    const connectionURL = `amqp://${username}:${password}@${hostname}`;

    const connection = await amqp.connect(connectionURL);
    const channel = await connection.createChannel();

    // Do something with the channel, such as publishing or consuming messages

    await connection.close(); // Close the connection when done
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

connectRabbitMQ();
