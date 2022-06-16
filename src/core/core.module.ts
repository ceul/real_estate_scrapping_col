import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropiedadService } from './business/propiedad-service';
import { PropiedadController } from './controllers/propiedad/propiedad.controller';
import { Propiedad } from './models/propiedad.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Propiedad]),
        HttpModule
    ],
    controllers: [PropiedadController],
    providers: [PropiedadService],


})
export class CoreModule { }
