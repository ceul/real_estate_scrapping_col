import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './event.controller';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'nest_events',
    entities: [Event],
    synchronize: true
  })],
  controllers: [AppController, EventController],
  providers: [AppService],
})
export class AppModule {}
