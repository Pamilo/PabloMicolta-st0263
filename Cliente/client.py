import Cliente.upload as upload

def main():
    entrada = input("Ingrese el comando que desea ejecutar: ")
    while entrada != "salir":
        nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la misma terminacion que el oroginal (jpg, mp3,txt,etc)): ")
        if  entrada == "cargar":
            nombreArchivo = input("Entre el nombre del archivo (notar que debe tener la misma terminacion que el oroginal (jpg, mp3,txt,etc)): ")
            fuente = input("Entre el path del archivo: ")
            upload.cargar(fuente, nombreArchivo)
        else:
            return entrada, nombreArchivo

        entrada = input("Ingrese el comando que desea ejecutar ")
if __name__=="__main__":
    main()