import Db from './db-pg.js';

export default class CalificacionesRepository {
    constructor() {
        console.log('Estoy en: CalificacionesRepository.constructor()');
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(`CalificacionesRepository.getAllAsync()`);
        const sql = `SELECT c.id as Id, c.id_alumno as IdAlumno, a.nombre as NombreAlumno, a.apellido as ApellidoAlumno, m.id as IdMateria, m.nombre as NombreMateria, c.nota as Nota, c.fecha as Fecha FROM calificaciones c INNER JOIN alumnos a ON c.id_alumno = a.id INNER JOIN materias m ON c.id_materia = m.id;`;
        return await this.db.queryAll(sql);
    }

    getByIdAsync = async (id) => {
        console.log(`CalificacionesRepository.getByIdAsync(${id})`);
        const sql = `SELECT c.id as Id, c.id_alumno as IdAlumno, a.nombre as NombreAlumno, a.apellido as ApellidoAlumno, m.id as IdMateria, m.nombre as NombreMateria, c.nota as Nota, c.fecha as Fecha FROM calificaciones c INNER JOIN alumnos a ON c.id_alumno = a.id INNER JOIN materias m ON c.id_materia = m.id WHERE c.id=$1`;
        return await this.db.queryOne(sql, [id]);
    }

    getByIdAlumnoAsync = async (id) => {
        console.log(`CalificacionesRepository.getByIdAlumnoAsync(${id})`);
        const sql = `SELECT c.id as Id, m.id as IdMateria, m.nombre as NombreMateria, c.nota as Nota, c.fecha as Fecha FROM calificaciones c INNER JOIN alumnos a ON c.id_alumno = a.id INNER JOIN materias m ON c.id_materia = m.id WHERE c.id_alumno=$1`;
        return await this.db.queryAll(sql, [id]);
    }

    createAsync = async (entity) => {
        console.log(`CalificacionesRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `
            INSERT INTO calificaciones (id_alumno, id_materia, nota, fecha) VALUES ($1, $2, $3, $4) RETURNING id`;
        const values = [
            entity?.id_alumno,
            entity?.id_materia,
            entity?.nota,
            entity?.fecha
        ];
        return await this.db.queryReturnId(sql, values);
    }

    updateAsync = async (entity) => {
        console.log(`CalificacionesRepository.updateAsync(${JSON.stringify(entity)})`);
        const sql = `UPDATE calificaciones SET id_alumno = $2, id_materia = $3, nota = $4, fecha = $5 WHERE id = $1`;

        const values = [
            entity.id,
            entity.id_alumno,
            entity.id_materia,
            entity.nota,
            entity.fecha
        ];

        return await this.db.queryRowCount(sql, values);
    }

    deleteByIdAsync = async (id) => {
        console.log(`CalificacionesRepository.deleteByIdAsync(${id})`);
        const sql = `DELETE FROM calificaciones WHERE id=$1`;
        return await this.db.queryRowCount(sql, [id]);
    }
}