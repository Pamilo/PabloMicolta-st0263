import shutil
import os
def cargar(fileName):
    destino = 'files/'+fileName
    with open(fileName, 'w') as fp:
        pass
    fuente = fileName
    try:
        shutil.copyfile(fuente, destino)
    except FileNotFoundError:
        print("Source file not found.")
    except PermissionError:
        print("Permission denied while copying the file.")
    except Exception as e:
        print("An error occurred:", e)
    
    os.remove(fuente) 




