const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Cargar el proto file
const PROTO_PATH = path.join(__dirname, 'download.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const Proto = grpc.loadPackageDefinition(packageDefinition).download;

// crear el cliente para serv al cual se va a cuentionar

const finishDownload = (call, callback) => {
  // Implement logic for finishDownload method

  callback(null, { message: 'Descargado ' + call.request.name + ' desde ' /*+  aqui va la ip del equipo*/});
};

// Create a gRPC server
const server = new grpc.Server();

// Add service and methods to the server
server.addService(exampleProto.Download.service, {
  finishDownload: finishDownload,
});

// Start the server
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to start server.', err);
  } else {
    console.log('Server started successfully, listening on port ' + port);
    server.start();
  }
});