# ProyectItegrador
# paso 1, ver si el contenedor esta corriendo: docker ps
# Para levantar el docker (y hacerlo correr): docker-compose up -d 

hacer correr la conexion:

# crear entidades
nest generate resource nombre

npm run start:dev
# levantar los servicios de la abse de datos y el docker
paso 1 (con el docker desptok corriendo)
docker-compose up --build

paso 2: 
cd backend
npm run start:dev
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

## API REST Endpoints (Documentación completa)

### Módulo de Usuarios
- **POST** `/user/crear_usuario` - Crear un nuevo usuario
- **GET** `/user/obtener-usuarios` - Obtener todos los usuarios
- **GET** `/user/obtener-usuarios/:rut` - Buscar un usuario por rut
- **PATCH** `/user/:id` - Actualizar un usuario
- **DELETE** `/user/:id` - Eliminar un usuario

### Módulo de Salas
- **POST** `/salas/crear_sala` - Crear una nueva sala
- **GET** `/salas/obtener_salas` - Obtener todas las salas
- **GET** `/salas/obtener_sala/:id` - Obtener detalles de una sala específica
- **PATCH** `/salas/actualizar_sala/:id` - Actualizar información de una sala
- **DELETE** `/salas/eliminar_sala/:id` - Eliminar una sala
- **PATCH** `/salas/marcar-disponible/:id` - Marcar una sala como disponible
- **PATCH** `/salas/marcar-ocupada/:id` - Marcar una sala como ocupada
- **GET** `/salas/disponibles` - Listar todas las salas disponibles
- **GET** `/salas/ocupadas` - Listar todas las salas ocupadas

### Módulo de Asistencia
- **POST** `/asistencia/registrar` - Registrar una nueva asistencia
- **GET** `/asistencia/listar` - Obtener todas las asistencias
- **GET** `/asistencia/detalle/:id` - Obtener detalles de una asistencia
- **PATCH** `/asistencia/actualizar/:id` - Actualizar una asistencia
- **DELETE** `/asistencia/eliminar/:id` - Eliminar una asistencia
- **GET** `/asistencia/por-usuario/:userId` - Obtener asistencias de un usuario específico
- **GET** `/asistencia/por-sala/:salaId` - Obtener asistencias de una sala específica