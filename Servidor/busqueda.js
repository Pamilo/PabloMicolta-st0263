var messages = require('./search_pb');
var services = require('./search_grpc_pb');
const fs = require('fs');
const path = require('path');
var grpc = require('@grpc/grpc-js');
const jsonSelf = require('../self.json');

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
  reply.setMessage('buscando en ' + jsonSelf.ip);
  callback(null, reply);
};


function main() {
  var server = new grpc.Server();
  server.addService(services.SearchService, {startSearch: startSearch});
  server.bindAsync(jsonSelf.ip+':50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`)
  });
}

main();