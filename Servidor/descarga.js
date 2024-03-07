const amqp = require('amqplib');
const jsonSelf = require('../self.json');


module.exports = {
  sendMessage:sendMessage
}
async function sendMessage(ip,key,exchange,que) {
  const connection = await amqp.connect('amqp://user:password@'+ip+':5672');
  const channel = await connection.createChannel();

  const exchangeName = exchange;
  const routingKey = key;
  const message = 'Enviando archivo pedido';

  await channel.assertExchange(exchangeName, 'direct', { durable: true });
  channel.publish(exchangeName, routingKey, Buffer.from(message));
  console.log("Running Producer Application...");

  setTimeout(() => {
      connection.close();
  }, 500); // Cerrar la conexión después de 500 ms (ajusta según tu necesidad)
}

