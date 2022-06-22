import { Injectable } from '@nestjs/common';
import { PropiedadService } from '../../business/propiedad-service';

@Injectable()
export class SchedulerService {

    constructor(private propiedadService: PropiedadService) {
        this.scheduler()
    }

    async scheduler() {
        try {
            this.propiedadService.getFromFincaRaiz()
            await setTimeout( ()=> this.scheduler(),86400000)
        } catch (error) {
            console.log(error)
        }
    }
}
