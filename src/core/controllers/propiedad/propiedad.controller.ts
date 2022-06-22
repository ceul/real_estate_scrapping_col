import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PropiedadService } from 'src/core/business/propiedad-service';
import { CreatePropiedadDTO } from 'src/core/models/create-propiedad.dto';

@Controller('/propiedad')
export class PropiedadController {

    constructor(private propiedadService: PropiedadService) {}

    @Get(':id')
    findOne(@Param('id') id){}

    @Get()
    findAll(){
        return this.propiedadService.getFromFincaRaiz()

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
