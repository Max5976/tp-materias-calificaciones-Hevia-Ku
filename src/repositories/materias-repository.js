import Db from './db-pg.js';

export default class MateriasRepository {
    constructor() {
        console.log('Estoy en: MateriasRepository.constructor()');
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(`MateriasRepository.getAllAsync()`);
        const sql = `SELECT * FROM materias`;
        return await this.db.queryAll(sql);
    }
    
    getByIdAsync = async (id) => {
        console.log(`MateriasRepository.getByIdAsync(${id})`);
        const sql = `SELECT * FROM materias WHERE id=$1`;
        return await this.db.queryOne(sql, [id]);
    }
     
    createAsync = async (entity) => {
        console.log(`MateriasRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `INSERT INTO materias (nombre) VALUES ($1) RETURNING id`;
        return await this.db.queryReturnId(sql, [entity?.nombre ?? '']);
    }

    updateAsync = async (entity) => {
        console.log(`MateriasRepository.updateAsync(${JSON.stringify(entity)})`);
        let rowsAffected = 0;
        let id = entity.id;
    
        const sql = `UPDATE materias SET nombre = $2 WHERE id = $1`;
        return await this.db.queryRowCount(sql, [id, entity?.nombre ?? '']);
    }
    
    deleteByIdAsync = async (id) => {
        console.log(`MateriasRepository.deleteByIdAsync(${id})`);
        const sql = `DELETE FROM materias WHERE id=$1`;
        return await this.db.queryRowCount(sql, [id]);
    }
}

