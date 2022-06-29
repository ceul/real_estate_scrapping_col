import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PropiedadService } from '../../business/propiedad-service';
import { CreatePropiedadDTO } from '../../models/create-propiedad.dto';

@Controller('/propiedad')
export class PropiedadController {

    constructor(private propiedadService: PropiedadService) {}

    @Get(':id')
    findOne(@Param('id') id){
        return this.propiedadService.findOne(id)
    }

    @Get()
    findAll(){
        return this.propiedadService.findAll()
    }

    @Get('mean/:ciudad')
    mean(@Param('ciudad') ciudad){
        return this.propiedadService.mean(ciudad)
    }

    @Get()
    median(){
        return this.propiedadService.findAll()
    }

    @Get()
    mode(){
        return this.propiedadService.findAll()
    }
    
    @Post()
    create(@Body() input: CreatePropiedadDTO){
        return input
    }
    
    @Patch(':id')
    update(@Param('id') id){

    }
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id){}
}
