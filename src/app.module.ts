import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { Propiedad } from './core/models/propiedad.entity';
import { Barrio } from './core/models/barrio.entity';
import { Ciudad } from './core/models/ciudad.entity';
import { Departamento } from './core/models/departamento.entity';
import { Plataforma } from './core/models/plataforma.entity';
import { TipoNegocio } from './core/models/tipo_negocio.entity';
import { TipoPropiedad } from './core/models/tipo_propiedad.entity';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        entities: [Barrio, Ciudad, Departamento, Plataforma, TipoNegocio, TipoPropiedad, Propiedad],
        synchronize: false,
        ssl: true
      }),
      inject: [ConfigService],
    }),
    CoreModule
  ],
  providers: [AppService],
})
export class AppModule { }
