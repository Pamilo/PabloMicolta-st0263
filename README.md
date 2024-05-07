# Configuracion reto 3
## general
Se crean 4 maquinas ubuntu 22.04 con los minimos requeriminetos en la cuales se correran los siguientes comandos para instalar docker 
```bash
sudo apt update
sudo apt install docker.io -y
sudo apt install docker-compose -y
```
y se crea otra maquina ubuntu 20.04 en la cual nos ubicaremos para el siguiente punto

## NFS
En la maquina de ubuntu 20.04 realizar los sigueintes comandos
```bash
sudo apt update
sudo apt install nfs-kernel-server
sudo mkdir -p /srv/nfs4/www
```
los 2 primeros realizan la instalacion de el servicio de NFS y el ultimo va a ser la carpeta que va a compartirse atraves de este mismo con este fin se realizara lo siguiente
Primero montar la carpeta en el servicio de NFS atraves del comando 
```bash
sudo mount --bind /var/www /srv/nfs4/www
```
y realizar los siguientes cambios en **etc/fstab** para que este mount sea permanente
```
/var/www     /srv/nfs4/www      none   bind   0   0
```
