const amqp = require('amqplib');

async function connectRabbitMQ() {
  try {
    const username = 'your_username';
    const password = 'your_password';
    const hostname = 'your_rabbitmq_hostname';
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
