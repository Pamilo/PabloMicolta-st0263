import upload as upload
import download
from search import Search
import searchResult
def main():
    entrada = input("Ingrese el comando que desea ejecutar: ")
    while entrada != "salir":
        if  entrada == "cargar":
            nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la misma terminacion que el oroginal (jpg, mp3,txt,etc)): ")
            upload.cargar(nombreArchivo)
        elif entrada == "descargar":
            nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la terminacion(jpg, mp3,txt,etc)): ")
            searchResult.set_o_s_file(nombreArchivo)
            download.sendInfoRequest()
        else:
            print("metodo no existente")

        entrada = input("Ingrese el comando que desea ejecutar ")
if __name__=="__main__":
    main()