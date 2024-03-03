
from __future__ import print_function

import logging

import grpc
import download_pb2
import download_pb2_grpc

import requests


def run():
    #data = {'method': 'download'}
    #response = requests.post('http://localhost:3000/api/data', json=data)
    with grpc.insecure_channel(response.ip + ":50051") as channel:
        nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la terminacion(jpg, mp3,txt,etc)): ")
        stub = download_pb2_grpc.Stub(channel)
        response = stub.startDownload(download_pb2.downloadRequest(name=nombreArchivo))
    print(response.message)


if __name__ == "__main__":
    logging.basicConfig()
    run()