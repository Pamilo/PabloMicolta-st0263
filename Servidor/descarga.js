const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
/*
// Load the proto file
const PROTO_PATH = path.join(__dirname, 'search.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const searchProto = grpc.loadPackageDefinition(packageDefinition).search;

// Implement the startSearch RPC method
function startSearch (call, callback) {
    const filename = call.request.name;
    const ip = call.request.ip;
    const port = call.request.port;

    // Implement your search logic here
    // For demonstration purposes, we'll just return a sample message
    const message = `Searching for ${filename} on ${ip}:${port}`;
    
    // Respond with searchReply
    callback(null, { message: message, ip: ip });
};

// Create a gRPC server
const server = new grpc.Server();

// Add service and methods to the server
server.addService(searchProto.Search.service, {
    startSearch: (call, callback)=> {
      const filename = call.request.name;
      const ip = call.request.ip;
      const port = call.request.port;
  
      // Implement your search logic here
      // For demonstration purposes, we'll just return a sample message
      const message = `Searching for ${filename} on ${ip}:${port}`;
      
      // Respond with searchReply
      callback(null, { message: message, ip: ip });
  },
});

// Start the server
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Failed to start server.', err);
    } else {
        console.log('Server started successfully, listening on port ' + port);
        server.start();
    }
});*/

var messages = require('./search_pb');
var services = require('./search_grpc_pb');

var grpc = require('@grpc/grpc-js');

function startSearch (call, callback) {
  /*const filename = call.request.name;
  const ip = call.request.ip;
  const port = call.request.port;

  // Implement your search logic here
  // For demonstration purposes, we'll just return a sample message
  const message = `Searching for ${filename} on ${ip}:${port}`;
  
  // Respond with searchReply
  callback(null, { message: message, ip: ip });*/
  var reply = new messages.searchReply();
  reply.setMessage('buscando en ' + call.request.getIp());
  callback(null, reply);
};


function main() {
  var server = new grpc.Server();
  server.addService(services.GreeterService, {startSearch: startSearch});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`)
  });
}

main();