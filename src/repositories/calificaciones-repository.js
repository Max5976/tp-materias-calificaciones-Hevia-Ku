import Db from './db-pg.js';

export default class CalificacionesRepository {
    constructor() {
        console.log('Estoy en: MateriasRepository.constructor()');
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(`CalificacionesRepository.getAllAsync()`);
        const sql = `SELECT * FROM calificaciones c INNER JOIN alumnos a ON c.id_alumno = a.id INNER JOIN materias m ON c.id_materia = m.id;`;
        return await this.db.queryAll(sql);
    }
}