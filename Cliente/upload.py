import shutil

def cargar(fuente, fileName):
    destino = 'files/'+fileName
    try:
        shutil.copyfile(fuente, destino)
        print("File copied successfully!")
    except FileNotFoundError:
        print("Source file not found.")
    except PermissionError:
        print("Permission denied while copying the file.")
    except Exception as e:
        print("An error occurred:", e)
    

import os

def list_files():
    files = []
    for root, _, filenames in os.walk('files'):
        for filename in filenames:
            files.append(filename)
    return files

files = list_files()
