import MateriasRepository from '../repositories/materias-repository.js';

export default class MateriasService {
    getAllAsync = async () => {
        console.log(`MateriasService.getAllAsync()`);
        const returnArray = await this.MateriaRepository.getAllAsync();
        return returnArray;
    }
    getByIdAsync = async (id) => {
        console.log(`MateriasService.getByIdAsync(${id})`);
        const returnEntity = await this.MateriaRepository.getByIdAsync(id);
        return returnEntity;
    }
    createAsync = async (entity) => {
        console.log(`MateriasService.createAsync(${JSON.stringify(entity)})`);
        const rowsAffected = await this.MateriaRepository.createAsync(entity);
        return rowsAffected;
    }
    updateAsync = async (entity) => {
        console.log(`MateriasService.updateAsync(${JSON.stringify(entity)})`);
        const rowsAffected = await this.MateriaRepository.updateAsync(entity);
        return rowsAffected;
    }
        deleteByIdAsync = async (id) => {
        console.log(`MateriasService.deleteByIdAsync(${id})`);
        const rowsAffected = await this.MateriaRepository.deleteByIdAsync(id);
        return rowsAffected;
    }
}