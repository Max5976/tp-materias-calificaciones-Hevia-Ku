import Db from './db-pg.js';

export default class MateriaRepository {

    getMaterias = async () => {
        console.log(`MateriaRepository.getAllAsync()`);
        const sql = `SELECT * FROM materia`;
        return await this.db.queryAll(sql);
    }
    
    getByIdAsync = async (id) => {
        console.log(`MateriaRepository.getByIdAsync(${id})`);
        let returnEntity = null;
        try {
            const sql = `SELECT * FROM materia WHERE id=$1`;
            const values = [id];
            const resultPg = await this.getDBPool().query(sql, values);
            if (resultPg.rows.length > 0){
                returnEntity = resultPg.rows[0];
            }
        } catch (error) {
            LogHelper.logError(error);
        }
        return returnEntity;
    }
     
    createAsync = async (entity) => {
        console.log(`MateriasRepository.createAsync(${JSON.stringify(entity)})`);
        let newId = 0;
        try {
            const sql = `INSERT INTO materia (nombre) VALUES ($1) RETURNING id`;
            const values = [entity?.nombre ?? ''];
            const resultPg = await this.getDBPool().query(sql, values);
            newId = resultPg.rows[0].id;
        } catch (error) {
            LogHelper.logError(error);
        }
        return newId;
    }

    updateAsync = async (entity) => {
        console.log(`MateriasRepository.updateAsync(${JSON.stringify(entity)})`);
        let rowsAffected = 0;
        let id = entity.id;
    
        try {
            const sql = `UPDATE materia SET nombre = $2 WHERE id = $1`;
            const values = [id, entity?.nombre ?? ''];
            const resultPg = await this.getDBPool().query(sql, values);
            rowsAffected = resultPg.rowCount;
        } catch (error) {
            LogHelper.logError(error);
        }
        return rowsAffected;
    }
}

