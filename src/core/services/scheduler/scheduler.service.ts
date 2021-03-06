import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from '../../models/ciudad.entity';
import { Repository } from 'typeorm';
import { PropiedadService } from '../../business/propiedad-service';

@Injectable()
export class SchedulerService {

    constructor(private propiedadService: PropiedadService,
        @InjectRepository(Ciudad) private readonly ciudadRepsitory: Repository<Ciudad>
    ) {
        this.scheduler()
    }

    async scheduler() {
        try {
            console.log('scheduler arranco')
            let ciudades = await this.ciudadRepsitory.find({
                select: {
                    id: true,
                    nombre: true,
                }
            })
            console.log(ciudades)
            for (let index = 0; index < ciudades.length; index++) {
                this.propiedadService.getFromFincaRaiz(ciudades[index].nombre, ciudades[index].id )
                this.propiedadService.getFromMetroCuadrado(ciudades[index].nombre, ciudades[index].id )
            }
            await setTimeout(() => this.scheduler(), 86400000)
        } catch (error) {
            console.log(error)
        }
    }

}
