// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var search_pb = require('./search_pb.js');

function serialize_search_searchReply(arg) {
  if (!(arg instanceof search_pb.searchReply)) {
    throw new Error('Expected argument of type search.searchReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_search_searchReply(buffer_arg) {
  return search_pb.searchReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_search_searchRequest(arg) {
  if (!(arg instanceof search_pb.searchRequest)) {
    throw new Error('Expected argument of type search.searchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_search_searchRequest(buffer_arg) {
  return search_pb.searchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var SearchService = exports.SearchService = {
  startSearch: {
    path: '/search.Search/startSearch',
    requestStream: false,
    responseStream: false,
    requestType: search_pb.searchRequest,
    responseType: search_pb.searchReply,
    requestSerialize: serialize_search_searchRequest,
    requestDeserialize: deserialize_search_searchRequest,
    responseSerialize: serialize_search_searchReply,
    responseDeserialize: deserialize_search_searchReply,
  },
};

exports.SearchClient = grpc.makeGenericClientConstructor(SearchService);
