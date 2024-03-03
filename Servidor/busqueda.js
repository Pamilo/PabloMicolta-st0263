const fs = require('fs');
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
    }
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
