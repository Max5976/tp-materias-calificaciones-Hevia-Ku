import CalificacionesRepository from '../repositories/calificaciones-repository.js';
import AlumnosService from './alumnos.service.js';
import MateriasService from './materia.service.js';

export default class CalificacionesService {
    constructor() {
        console.log('Estoy en: CalificacionesService.constructor()');
        this.CalificacionesRepository = new CalificacionesRepository();
    }

    getAllAsync = async () => {
        console.log(`CalificacionesService.getAllAsync()`);
        const returnArray = await this.CalificacionesRepository.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        console.log(`CalificacionesService.getByIdAsync(${id})`);
        const returnEntity = await this.CalificacionesRepository.getByIdAsync(id);
        return returnEntity;
    }

    getByIdAlumnoAsync = async (id) => {
        console.log(`CalificacionesService.getByIdAlumnoAsync(${id})`);
        const returnEntity = await this.CalificacionesRepository.getByIdAlumnoAsync(id);
        return returnEntity;
    }

    createAsync = async (entity) => {
        console.log(`CalificacionesService.createAsync(${JSON.stringify(entity)})`);
        
        if (entity.nota < 0 || entity.nota > 10) {
            throw new Error('La nota debe ser entre 0 y 10');
        }
        
        const alumno = await this.AlumnosService.getByIdAsync(entity.id_alumno);
        const materia = await this.MateriasService.getByIdAsync(entity.id_materia);

        if (!alumno) {
            throw new Error ('El alumno no existe')
        }
        else if (!materia) {
            throw new Error ('La materia no existe')
        }

        const rowsAffected = await this.CalificacionesRepository.createAsync(entity);
        return rowsAffected;
    }

    updateAsync = async (entity) => {
        console.log(`CalificacionesService.updateAsync(${JSON.stringify(entity)})`);
        const rowsAffected = await this.CalificacionesRepository.updateAsync(entity);
        return rowsAffected;
    }

    deleteByIdAsync = async (id) => {
        console.log(`CalificacionesService.deleteByIdAsync(${id})`);
        const rowsAffected = await this.CalificacionesRepository.deleteByIdAsync(id);
        return rowsAffected;
    }
}
