import upload as upload

def main():
    entrada = input("Ingrese el comando que desea ejecutar: ")
    while entrada != "salir":
        if  entrada == "cargar":
            nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la misma terminacion que el oroginal (jpg, mp3,txt,etc)): ")
            upload.cargar(nombreArchivo)
        else:
            return entrada, nombreArchivo

        entrada = input("Ingrese el comando que desea ejecutar ")
if __name__=="__main__":
    main()