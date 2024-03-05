
from __future__ import print_function

import logging

import grpc
import search_pb2
import search_pb2_grpc
import json
import requests

def run():
    #data = {'method': 'download'}
    #response = requests.post('http://localhost:3000/api/data', json=data)
    with open('../network.json') as network:
        networkData = json.load(network)
    with open('../self.json') as me:
        meData = json.load(me)
    for node in networkData:
        print(node["ip"]+"\n")
        with grpc.insecure_channel(node["ip"]+ + ":50051") as channel:
            nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la terminacion(jpg, mp3,txt,etc)): ")
            stub = search_pb2_grpc.SearchStub(channel)
            response = stub.startSearch(search_pb2.searchRequest(name=nombreArchivo,ip=meData["ip"],port=meData["portBusqueda"]))
        print(response.message)


if __name__ == "__main__":
    logging.basicConfig()
    run()