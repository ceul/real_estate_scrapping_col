import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDTO } from "./create-event.dto";
import { UpdateEventDTO } from "./update-event.dto";

@Controller('/event')
export class EventController{

    @Get(':id')
    findOne(@Param('id') id){}

    @Get()
    findAll(){}
    
    @Post()
    create(@Body() input: CreateEventDTO){
        return input
    }
    
    @Patch(':id')
    update(@Param('id') id, @Body() input: UpdateEventDTO){

    }
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id){}
}