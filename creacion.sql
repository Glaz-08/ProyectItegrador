-- Tabla de usuarios
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL
);
-- Tabla de salas
CREATE TABLE sala (
    id_sala SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(200)
);

-- Tabla de asistencias
CREATE TABLE asistencia (
    id_asistencia SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    id_sala INT NOT NULL REFERENCES sala(id_sala) ON DELETE CASCADE,
    Bloque_Entrada TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Bloque_Salida TIMESTAMP
);