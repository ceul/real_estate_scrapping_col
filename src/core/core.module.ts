import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropiedadService } from './business/propiedad-service';
import { PropiedadController } from './controllers/propiedad/propiedad.controller';
import { Barrio } from './models/barrio.entity';
import { Ciudad } from './models/ciudad.entity';
import { Departamento } from './models/departamento.entity';
import { Plataforma } from './models/plataforma.entity';
import { Propiedad } from './models/propiedad.entity';
import { TipoNegocio } from './models/tipo_negocio.entity';
import { TipoPropiedad } from './models/tipo_propiedad.entity';
import { SchedulerService } from './services/scheduler/scheduler.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Barrio,Ciudad,Departamento,Plataforma,TipoNegocio,TipoPropiedad, Propiedad]),
        HttpModule
    ],
    controllers: [PropiedadController],
    providers: [PropiedadService, SchedulerService]
})
export class CoreModule { }
