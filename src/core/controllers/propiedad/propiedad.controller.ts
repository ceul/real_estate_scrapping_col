import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PropiedadService } from '../../business/propiedad-service';

@Controller('/propiedad')
export class PropiedadController {

    constructor(private propiedadService: PropiedadService) {}

    @Get(':id')
    findOne(@Param('id') id){}

    @Get()
    findAll(){
        return this.propiedadService.getFromFincaRaiz()

    }
    
    /*@Post()
    create(@Body() input: CreateEventDTO){
        return input
    }
    
    @Patch(':id')
    update(@Param('id') id, @Body() input: UpdateEventDTO){

    }*/
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id){}
}
