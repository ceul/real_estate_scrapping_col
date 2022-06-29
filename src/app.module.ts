import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { CoreModule } from './core/core.module';
import { Propiedad } from './core/models/propiedad.entity';
import { Barrio } from './core/models/barrio.entity';
import { Ciudad } from './core/models/ciudad.entity';
import { Departamento } from './core/models/departamento.entity';
import { Plataforma } from './core/models/plataforma.entity';
import { TipoNegocio } from './core/models/tipo_negocio.entity';
import { TipoPropiedad } from './core/models/tipo_propiedad.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'real_state',
    autoLoadEntities: true,
    entities: [Barrio,Ciudad,Departamento,Plataforma,TipoNegocio,TipoPropiedad, Propiedad],
    synchronize: true
  }),
  CoreModule
],
  controllers: [AppController, EventController],
  providers: [AppService],
})
export class AppModule {}
