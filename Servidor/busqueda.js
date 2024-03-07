var messages = require('./search_pb');
var services = require('./search_grpc_pb');
const fs = require('fs');
const path = require('path');
var grpc = require('@grpc/grpc-js');
const jsonSelf = require('../self.json');
const download = require('./descarga.js');

async function searchFile(fileName) {
  const dir = '../files';
  console.log('Searching for file:', fileName);

  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    console.log('Checking file:', filePath);

    const fileStat = await fs.promises.stat(filePath);

    if (fileStat.isDirectory()) {
      console.log('Descending into directory:', filePath);
      const found = await searchFile(filePath, fileName);
      if (found) return true;
    } else if (file.endsWith(fileName)) {
      console.log('File found:', filePath);
      return true;
    }
  }

  console.log('File not found:', fileName);
  return false;
}



async function startSearch (call, callback) {
  try {
    
    const found = await searchFile(call.request.getName());
    const reply = new messages.searchReply();
    console.log(found);
    if (found === true) {
      reply.setMessage('encontrado');
      reply.setIp(jsonSelf.ip);
      download.sendMessage(call.request.getIp(),call.request.getExchange(),call.request.getKey(),call.request.getQue())
    } else {
      reply.setMessage('no encontrado');
    }
    callback(null, reply);
  } catch (error) {
    console.error('Error:', error);
    callback(error);
  }
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