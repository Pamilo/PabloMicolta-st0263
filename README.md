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
los 2 primeros realizan la instalacion de el servicio de NFS y el ultimo va a ser la carpeta que va a compartirse atraves de este mismo (en este caso se usara /srv/nfs4/www como ejemplo) con este fin se realizara lo siguiente
Primero montar la carpeta en el servicio de NFS atraves del comando 
```bash
sudo mount --bind /var/www /srv/nfs4/www
```
luego realizar los siguientes cambios en **etc/fstab** para que este mount sea permanente
```
/var/www     /srv/nfs4/www      none   bind   0   0
```
fianlmente para poder exportar esta carpeta se realizara el siguiente cambio al archivo **/etc/export**
```
/srv/nfs4        *(rw,sync,no_subtree_check,crossmnt,fsid=0,no_root_squash)
/srv/nfs4/www    *(rw,sync,no_subtree_check,no_root_squash)
```
el campo *no_root_squash* es simplemente para que no se nos den problemas a la hora de usar el usuario root de las otras maquinas pues de otra forma se nos generaria un error y esa primera linea simplemente resulta en que a la hora de referirse a este NFS no es necesario referirse a la ruta completa de la carpeta sino que */srv/nfs4* se trata como la carpeta principal

## Wordpress

En 2 de las instancias de ubunto 22.04 realizar el siguiente comando para poder instalar el cliente de nfs y crear la carpeta donde se almacenara la informacion del NFS 
```bash
sudo apt install nfs-common
sudo mkdir -p /srv/www
```
ahora para sincronisar la carpeta destinada con la que esta siendo exportada por el NFS 
```bash
sudo apt install nfs-common
sudo mount -t nfs -o vers=4 <NFS public IP>:/www /srv/www
```
ahora para crear el docker de wordpress se va a utilizar la imagen prehecha del mismo 
```bash
sudo docker run --name wp --network=host --mount type=bind,source="/srv/www",target="/var/www/html"  -d wordpress
```
ahi el flag mount funciona para dejar expuesta la carpeta de contenido de wordpress en la carpeta asignada para ser compartida por el NFS

## Database
Para crear la base de datos se usara la imagen por defecto de mysql en este caso con la contraseña "password" en una de las maquinas ubuntu 22.04
```bash
sudo docker run -d --name wordpress-db -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 mysql:latest
```
para la configuracion de la base de datos se "entrara" al contenedor para posteriormente acceder a la consola de mysql
```bash
sudo docker exec -it <Docker ID> /bin/bash
```
```bash
mysql -u root -p
```
caundo te pida entrar la contraseña entra la que configuraste en el docker
fianlemente se creara la tabla wordpress
```sql
CREATE DATABASE wordpress;
```
para la conexion con la instancia de wordpress accede a la una de las instancias de Wordpress atraves de tu navegador y ahi encontraras uan configuracion para la base de datos, entra las especificaciones de la maquina y la base de datos previamente creada y esta se configurara automaticamente
## NGINX
### Certificado SSL
En la ultima maquina ubuntu 22.04 se realizaran las sigueintes instalaciones para poder obtener el certifgicado de seguridad atraves de letsencrypt
``` bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt install letsencrypt -y
sudo apt install nginx -y
```
A continuacion realizar los siguientes proocedimientos 
``` bash
sudo mkdir -p /var/www/letsencrypt
sudo certbot --server https://acme-v02.api.letsencrypt.org/directory -d *.<tu dominio> --manual --preferred-challenges dns-01 certonly
```
Esto generara una serie de autenticaciones las cuales seran detenidas cuando se te da un enlace y un codigo, estos deben ser copiados en un registro TXT de tu DNS como se muestra a continuacion
![image](https://github.com/Pamilo/PabloMicolta-st0263/assets/81716232/5bb5c554-8729-44ff-8507-b0360043f3d8)

### Configuracion de NGINX
Ya con el certificado vamos a entrar en "modo administrador" atraves del comando 
``` bash
sudo su
```
esto con el fin de no tener que escribir "sudo" antes de cada uno de los siguiente comandos
crearemos 2 carpetas 1 llamada NGINX y dotra dentro de la primera llamada SSL
``` bash
mkdir loadbalancer
mkdir loadbalancer/ssl
```
ahora se copiaran los contenidos del certificado de seguridad en la carpeta SSL
```bash
cp /etc/letsencrypt/live/<tu dominio>/* /home/ubuntu/nginx/ssl
```
en la carpeta NGINX se crearan 2 archivos 1 llamado **nginx.conf** y otro llamado **ssl.conf** con el siguiente contenido respectivamente
```NGINX/nginx.conf
   worker_processes auto;
   error_log /var/log/nginx/error.log;
   pid /run/nginx.pid;

   events {
      worker_connections 1024;  ## Default: 1024
   }

   http {
      upstream backend {
         server <IP wordpress 1>;
         server <IP wordpress 2>;
      }

      server {
         listen 80;
         listen [::]:80;
         server_name <tu dominio con subdominio incluido>;
         rewrite ^ https://$host$request_uri permanent;
      }

      server {
         listen 443 ssl http2 default_server;
         listen [::]:443 ssl http2 default_server;
         server_name <tu dominio con subdominio incluido>;

         # enable subfolder method reverse proxy confs
         #include /config/NGINX/proxy-confs/*.subfolder.conf;

         # all ssl related config moved to ssl.conf
         include /etc/NGINX/ssl.conf;

         client_max_body_size 0;

         location / {
               proxy_pass http://backend;
               proxy_redirect off;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Host $host;
               proxy_set_header X-Forwarded-Server $host;
               proxy_set_header X-Forwarded-Proto $scheme;
         }
      }
   }

```
```NGINX/ssl.conf                                                                                            
   ssl_session_timeout 1d;
   ssl_session_cache shared:SSL:50m;
   ssl_session_tickets off;

   ssl_certificate /etc/nginx/ssl/fullchain.pem;
   ssl_certificate_key /etc/nginx/ssl/privkey.pem;
  
   ssl_protocols TLSv1.1 TLSv1.2;
   ssl_prefer_server_ciphers on;
   ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128->
   
   add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

   ssl_stapling on;
   ssl_stapling_verify on;
```
finalmente se creara en esa mismo carpeta un **docker-compose.yml** con el siguiente conteniendo
```NGINX/docker-compose.yml                                                                                            
   version: "3.1"
   services:
   nginx:
     container_name: nginx
     restart: always
     image: nginx
     volumes:
       - ./nginx.conf:/etc/nginx/nginx.conf:ro
       - ./ssl:/etc/nginx/ssl
       - ./ssl.conf:/etc/nginx/ssl.conf
     ports:
       - 80:80
       - 443:443
```
y se deshabilitara el NGINX instalado en la maquina atraves de los siguientes comando 
```bash
   ps ax | grep nginx
   netstat -an | grep 80

   sudo systemctl disable nginx
   sudo systemctl stop nginx
```
para desplegar suimplemente salir del "modo administrador" 
```bash
  exit
```
entrar a la carpeta NGINX y ejecutar el docker compose de la siguiente manera
```bash
  cd NGINX
  sudo docker-compose up -d
```


# Enlaces de interes
## Fuentes
Tutorial acerca de la instalacion de NFS: https://linuxize.com/post/how-to-install-and-configure-an-nfs-server-on-ubuntu-20-04/ 

Video mostrando el funcionamiento de la aplicacion: https://eafit.sharepoint.com/sites/yo901/Documentos%20compartidos/General/Recordings/video-20240507_095730-Grabaci%C3%B3n%20de%20la%20reuni%C3%B3n.mp4?web=1 
