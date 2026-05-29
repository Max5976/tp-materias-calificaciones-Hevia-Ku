import Db from './db-pg.js';

export default class MateriaRepository {

    getMaterias = async () => {
        console.log(`MateriaRepository.getAllAsync()`);
        const sql = `SELECT * FROM cursos`;
        return await this.db.queryAll(sql);
    }
}

