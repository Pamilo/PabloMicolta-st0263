
from __future__ import print_function

import logging

import grpc
import download_pb2
import download_pb2_grpc


def run():
    print("Will try to greet world ...")
    with grpc.insecure_channel("0.0.0.0:50051") as channel:
        nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la terminacion(jpg, mp3,txt,etc)): ")
        stub = download_pb2_grpc.Stub(channel)
        response = stub.startDownload(download_pb2.downloadRequest(name=nombreArchivo))
    print(response.message)


if __name__ == "__main__":
    logging.basicConfig()
    run()