-- tabla_estudiantes.sql

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS gestion_estudiantes;

-- Conectar a la base de datos gestion_estudiantes
\c gestion_estudiantes;

-- Crear la tabla estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rut VARCHAR(20) UNIQUE NOT NULL,
    curso VARCHAR(50) NOT NULL,
    nivel INTEGER NOT NULL
);
