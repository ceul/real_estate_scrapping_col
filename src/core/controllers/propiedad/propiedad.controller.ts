import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { PropiedadService } from '../../business/propiedad-service';
import { CreatePropiedadDTO } from '../../models/create-propiedad.dto';

@Controller('/propiedad')
export class PropiedadController {

    constructor(private propiedadService: PropiedadService) { }

    @Get()
    findOne(@Query('id') id) {
        return this.propiedadService.findOne(id)
    }

    @Get()
    findAll() {
        return this.propiedadService.findAll()
    }

    @Get('mean')
    mean(@Query() params) {
        return this.propiedadService.mean(params)
    }

    @Get()
    median() {
        return this.propiedadService.findAll()
    }

    @Get()
    mode() {
        return this.propiedadService.findAll()
    }
}
