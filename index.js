import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configurar la conexión a PostgreSQL con Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Capturar errores de conexión con el pool
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de PostgreSQL:', err);
});

// Función para agregar un nuevo estudiante
async function agregarEstudiante(nombre, rut, curso, nivel) {
  try {
    const queryText = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)';
    const values = [nombre, rut, curso, nivel];
    const res = await pool.query(queryText, values);
    console.log(`Estudiante ${nombre} agregado con éxito`);
  } catch (err) {
    console.error('Error al agregar estudiante:', err.message);
  }
}

// Función para consultar todos los estudiantes registrados
async function consultarEstudiantes() {
  try {
    const queryText = 'SELECT * FROM estudiantes';
    const res = await pool.query(queryText);
    console.log('Registro actual de estudiantes:', res.rows);
  } catch (err) {
    console.error('Error al consultar estudiantes:', err.message);
  }
}

// Función para consultar un estudiante por su RUT
async function consultarEstudiantePorRut(rut) {
  try {
    const queryText = 'SELECT * FROM estudiantes WHERE rut = $1';
    const values = [rut];
    const res = await pool.query(queryText, values);
    console.log('Estudiante encontrado:', res.rows[0]);
  } catch (err) {
    console.error(`Error al consultar estudiante con RUT ${rut}:`, err.message);
  }
}

// Función para actualizar la información de un estudiante
async function actualizarEstudiante(nombre, rut, curso, nivel) {
  try {
    const queryText = 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4';
    const values = [nombre, curso, nivel, rut];
    const res = await pool.query(queryText, values);
    console.log(`Información de ${nombre} actualizada correctamente`);
  } catch (err) {
    console.error('Error al actualizar estudiante:', err.message);
  }
}

// Función para eliminar el registro de un estudiante por su RUT
async function eliminarEstudiante(rut) {
  try {
    const queryText = 'DELETE FROM estudiantes WHERE rut = $1';
    const values = [rut];
    const res = await pool.query(queryText, values);
    console.log(`Registro del estudiante con RUT ${rut} eliminado correctamente`);
  } catch (err) {
    console.error(`Error al eliminar estudiante con RUT ${rut}:`, err.message);
  }
}

// Procesar los comandos desde la línea de comandos
const [operation, ...args] = process.argv.slice(2);

switch (operation) {
  case 'nuevo':
    agregarEstudiante(args[0], args[1], args[2], args[3]);
    break;
  case 'consulta':
    consultarEstudiantes();
    break;
  case 'rut':
    consultarEstudiantePorRut(args[0]);
    break;
  case 'editar':
    actualizarEstudiante(args[0], args[1], args[2], args[3]);
    break;
  case 'eliminar':
    eliminarEstudiante(args[0]);
    break;
  default:
    console.log('Operación no reconocida');
}

// Comandos de uso desde la línea de comandos:

/*
Comandos para interactuar con la aplicación desde la línea de comandos:

1. Agregar un nuevo estudiante:
   node index.js nuevo 'Nombre Estudiante' '12.345.678-9' 'curso' nivel
   Ejemplo:
   node index.js nuevo 'Brian May' '12.345.678-9' 'guitarra' 7

2. Consultar todos los estudiantes registrados:
   node index.js consulta

3. Consultar un estudiante por RUT:
   node index.js rut '12.345.678-9'

4. Actualizar la información de un estudiante:
   node index.js editar 'Nombre Estudiante' '12.345.678-9' 'curso' nivel
   Ejemplo:
   node index.js editar 'Brian May' '12.345.678-9' 'guitarra' 10

5. Eliminar el registro de un estudiante por RUT:
   node index.js eliminar '12.345.678-9'
*/

// Manejo de errores
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});
