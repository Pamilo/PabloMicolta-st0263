/*const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const path = require('path');

// Load the Protocol Buffer definition from the .proto file
const PROTO_PATH = path.join(__dirname, './download.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const downloadProto = grpc.loadPackageDefinition(packageDefinition).example;


const Server = new downloadProto.OtherServer('other_server_address:50052', grpc.credentials.createInsecure());
const Server2 = new exampleProto.Greeter('server2_address:50052', grpc.credentials.createInsecure());

/*const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});*/

/*const client = new productService(REMOTE_HOST,grpc.credentials.createInsecure());

// Aqui van las Funcionesc
const continueDownload = (call,callback)=>{
  callback(null,{message: 'Se logro encontrar el archivo' + call.request.name});
}

const server = new grpc.Server();

// Add service and methods to the server
server.addService(exampleProto.Greeter.service, {
  finishDownload: sayHello,
  continueDownload: continueDownload,
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

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Cargar el proto file
const PROTO_PATH = path.join(__dirname, 'download.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const exampleProto = grpc.loadPackageDefinition(packageDefinition).example;

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