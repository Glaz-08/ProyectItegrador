# ProyectItegrador
# paso 1, ver si el contenedor esta corriendo: docker ps
# Para levantar el docker (y hacerlo correr): docker-compose up -d 

hacer correr la conexion:

# crear entidades
nest generate resource nombre

npm run start:dev
# levantar los servicios de la abse de datos y el docker
docker-compose up --build
# ocupar type ORM

# Para hacer los cambios
(esto tiene que ser en la carpeta principal del proyecto)

git add .

git commit -m "mensaje"

git push


# api rest
post http:localhost:3000/user/crear_usuario (para crear datos en la base de datos ingresar datos)
get http:localhost:3000/user/obtener-usuarios (obtener datos)
putch patch (ediatar datos o valores) (la api rest le das el PK o atributo diferenciador y este lo convierte en un JSON)
delete (eliminar)
get http:localhost:3000/user/obtener-usuarios/202121837 (ete ejemplo busca un usuario por rut, tiene que tener el metodo obtener-usuario)