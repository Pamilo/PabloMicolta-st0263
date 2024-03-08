# info de la materia: ST0263-241
# Estudiante(s): Pablo Micolta Lopez, pmicoltal@eafit.edu.co
# Profesor: Juan Carlos Montoya Mendoza, jcmontoy@eafit.edu.co
# Reto 1 - 2 (Mi sufrimiento)
## 1. breve descripción de la actividad
### 1.1. Que aspectos cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)
Se cumplio con una buena parte de los requisitos del trabajo, se logro la comunicacion gRCP y el envio de mensajes MOM a la plataforma rabbtMQ la busqueda y la busqueda de archivos
### 1.2. Que aspectos NO cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)
no se cumplio con la concurrencia del sistema ni con la capacidad de que la red se actualice de forma autosuficiente, necesitando hacerlo a mano o atravez de github ademas de que hubo un error en la recepcion de mensajes MOM
## 2. información general de diseño de alto nivel, arquitectura, patrones, mejores prácticas utilizadas.
Se utilizo una arquitectura de 2 tiers similar a cliente servidor donde una de las tiers se encargaba de lo que veia el cliente, recibiendo y enviando mensajes a y de los servidores de otros peer se intento en la medida de las limitaciones de tiempo apegarse a una arquitectura orientada a servicios pero por su simpolicidad se fue decantando a una monolitica, en cuanto a las buenas practica se intento mantener algunas pero nuevamente por falta de tiempo y por la presion que yo como individuo sentia por este proyecto no se pudo apegar a esto en todo momento

## 3. Descripción del ambiente de desarrollo y técnico: lenguaje de programación, librerias, paquetes, etc, con sus numeros de versiones.
se usar los lenguajes python(3.10.12), con las libresias pika(1.3.2), grpcio(1.62.0) y grpcio tools(1.62.0), 
javascript con nodeJS(v12.22.9) con los modulos grpcio(1.10.1, grpc),  @grpc/proto-loader(0.7.10), grpc-tools(1.12.4),  google-protobuf(3.21.2) y amqplib(0.10.3)

### como se compila y ejecuta.
por la naturaleza de los lenguajes este codigo no compila, para ejecutar se necesitar 3 terminales 1 para correr Cliente/searchResult.py que provee el servidor http, otra para Servidor/busqueda.js que provee el servidor RCP y finalmente la principal que corre Cliente/client.py todos estos deben correrse desde el repositorio de orden mas bajo en el que estan (ejemplo Cliente/client se debe correr desde la carpeta client no desde la root del proyecto)

### descripción y como se configura los parámetros del proyecto (ej: ip, puertos, conexión a bases de datos, variables de ambiente, parámetros, etc)
Todos los paramentros de la maquina que puedan ser cambiados estan en el archivo network.json para la configuracion de la red y self.json para los parametros internos de la maquina, actualmente hay un template en los archivos que sirve de ejemplo

## 4. Descripción del ambiente de EJECUCIÓN (en producción) lenguaje de programación, librerias, paquetes, etc, con sus numeros de versiones.
en cuanto a versiones son las mismas mencionadas arriba ademas de docker en su version 25.0.3 y rabbitMQ en su version 3.13.0
### IP o nombres de dominio en nube o en la máquina servidor.
Se usaron las IPs elasticas 52.73.174.215 y 52.73.174.215  
### descripción y como se configura los parámetros del proyecto (ej: ip, puertos, conexión a bases de datos, variables de ambiente, parámetros, etc)
como se dijo actualmente la configuracion debe acerce manual (obligatoriamente para los parametros locales) o por github (para los parametros de red)
### como se lanza el servidor.
se explico en la seccion de ejecucion
### una mini guia de como un usuario utilizaría el software o la aplicación
asumiendo que se desplego el servidor lo unico que habria que hacer es ingresar a  /Cliente y ejecutar python3 client.py 
opcionalmente - si quiere mostrar resultados o pantallazos

## referencias:
Se uso de base los talleres presentados por el profesor

sitio1-https://stackoverflow.com/questions/34534178/rabbitmq-how-to-send-python-dictionary-between-python-producer-and-consumer

sitio2-https://medium.com/@fullstacktips/how-to-search-for-a-specific-file-recursively-using-node-js-a6318d31f2fc

sitio3-https://grpc.io/docs/languages/node/basics/

sitio4-https://github.com/grpc/grpc-node/tree/master/examples/helloworld/static_codegen

sitio5-https://grpc.io/docs/languages/python/basics/

sitio6-https://www.youtube.com/watch?v=JysDK44Xtjg

----------------------------------------------Link Video----------------------------------------------------------
https://youtu.be/yG-Oo-oItZA

 
