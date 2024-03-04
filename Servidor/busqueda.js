/*const fs = require('fs');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


// Cargar el proto file
const PROTO_PATH = path.join(__dirname, 'search.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const searchProto = grpc.loadPackageDefinition(packageDefinition).search;
// Path to your local repository directory
const repositoryPath = 'files';
 // Replace with your input file name

// Function to check if a file name matches the input
function checkFileName(fileList, expectedFileName) {
    for (const file of fileList) {
        if (file === expectedFileName) {
            return true;
        }
    }
    return false;
}

const realizarBusqueda=(call,callback)=>{
    fs.readdir(repositoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
    
      // Check if the file exists among the listed files
        if (checkFileName(files, fileName)) {
            callback(null, { message: 'encontrado' + call.request.name, ip:'127.0.0.1'});
        }
        /*proliferar el pedido*/
/*    }
    );
};
// Read the contents of the directory
const server = new grpc.Server();
// Add service and methods to the server
server.addService(searchProto.Search.service, {
    realizarBusqueda: realizarBusqueda,
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
*/
var messages = require('./search_pb');
var services = require('./search_grpc_pb');
const fs = require('fs');
const path = require('path');
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
  server.addService(services.SearchService, {startSearch: startSearch});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) {
      return console.error(err);
    }
    console.log(`gRPC listening on ${port}`)
  });
}

main();