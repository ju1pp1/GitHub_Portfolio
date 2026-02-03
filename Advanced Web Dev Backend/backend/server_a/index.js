const WebSocket = require('ws');
const { Kafka } = require('kafkajs');

// Kafka configuration
const kafka = new Kafka({
  clientId: 'server-a',
  brokers: ['kafka:9092'],
});

const topic = 'aggregated-emote-data';
const consumer = kafka.consumer({ groupId: 'server-a-group' });

// Create WebSocket server listening on port 3000
const wss = new WebSocket.Server({ port: 3000 });

const startServer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic });

  // Process messages received from Kafka
  consumer.run({
    eachMessage: async ({ message }) => {
      const data = message.value.toString();
      console.log(data);

      // Send message to connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    },
  });
};

// Handle websocket client connections
wss.on('connection', (ws) => {
  ws.send('Connected to WebSockets');
});

// Start the server
startServer().catch(console.error);
