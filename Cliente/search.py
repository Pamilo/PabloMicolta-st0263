
from __future__ import print_function

import logging

import grpc
import search_pb2
import search_pb2_grpc
import json
import requests
from http.server import BaseHTTPRequestHandler, HTTPServer

class Search:
    def __init__(self):
        self.nombre_archivo = ""

    def run(self):
        with open('../network.json') as network:
            networkData = json.load(network)
        with open('../self.json') as me:
            meData = json.load(me)
        for node in networkData:
            print(node["ip"]+"\n")
            with grpc.insecure_channel(node["ip"]+ ":50051") as channel:
                #nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la terminacion(jpg, mp3,txt,etc)): ")
                stub = search_pb2_grpc.SearchStub(channel)
                print(self.nombre_archivo)
                response = stub.startSearch(search_pb2.searchRequest(name=self.nombre_archivo ,ip=meData["ip"],port=meData["portBusqueda"]
                                                                    , exchange = meData["rabiMQExchange"],key = meData["rabitMQKey"],que=meData["rabitMQQue"]))
            print(response.ip)
            return response.ip
    def set_nombre_archivo(self,nombre_nuevo):
        self.nombre_archivo = nombre_nuevo
