# ejemplo-sensores
Ejercicio de Sensores. 
Utilizando pgAdmin y librería pg en node.js

Como no tenemos front-end nos auxiliamos de Postman 
https://documenter.getpostman.com/view/17127468/UUy7bPrF
https://www.getpostman.com/collections/5347055c206e938feac8

Tenemos dos rutas:
1-sensors
    -Listar todos los sensores activos
    -Insertar un sensor
    -Dado un id actualizar el estado de la columna deleted
2-measures
    -Listar las medidas de un sensor para un id dado
    -Agregar una medida a un sensor para un id dada
    -Listar las medidas de la BD indicando de cada una el sensor al que pertenece

Usamos dotenv para las variables de entorno
Usamos un archivo aparte con la configuración de Pool dentro de la carpeta db
Usamos .gitignore para no subir node_modules y .env

PosgreSQL, pgAdmin, pg, node.js, express
iniciar: npm run start
