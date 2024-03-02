
from __future__ import print_function

import logging

import grpc
import download_pb2
import download_pb2_grpc


def run():
    # NOTE(gRPC Python Team): .close() is possible on a channel and should be
    # used in circumstances in which the with statement does not fit the needs
    # of the code.
    print("Will try to greet world ...")
    with grpc.insecure_channel("localhost:50051") as channel:
        nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la terminacion(jpg, mp3,txt,etc)): ")
        stub = download_pb2_grpc.Stub(channel)
        response = stub.startDownload(download_pb2.downloadRequest(name=nombreArchivo))
    print("Greeter client received: " + response.message)


if __name__ == "__main__":
    logging.basicConfig()
    run()