import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Barrio } from '../models/barrio.entity';
import { Ciudad } from '../models/ciudad.entity';
import { CreatePropiedadDTO } from '../models/create-propiedad.dto';
import { Plataforma } from '../models/plataforma.entity';
import { Propiedad } from '../models/propiedad.entity';
import { TipoNegocio } from '../models/tipo_negocio.entity';
import { TipoPropiedad } from '../models/tipo_propiedad.entity';

@Injectable()
export class PropiedadService {


    constructor(private httpService: HttpService,
        @InjectRepository(Propiedad) private readonly repository: Repository<Propiedad>,
        @InjectRepository(Plataforma) private readonly plataformaRepository: Repository<Plataforma>
    ) { }

    async findOne(id) {
        const response = this.repository.findOneBy({ id: id })
        return response;
    }


    async findAll() {
        const response = this.repository.find()
        return response;
    }

    /*SELECT AVG(propiedad.valor_venta) as mean from propiedad inner join barrio on 
    propiedad.fk_barrio = barrio.id INNER JOIN ciudad ON 
    barrio.fk_ciudad = ciudad.id where ciudad.nombre = "medellin";*/

    async mean(query) {
        let where = ''
        if (query.ciudad != null && query.ciudad != undefined) {
            where = where + `ciudad.nombre = '${query.ciudad}'`
        }
        if (query.estrato != null && query.estrato != undefined) {
            where = where != '' ? `${where} AND propiedad.estrato = '${query.estrato}'` : `propiedad.estrato = '${query.estrato}'`
        }
        if (query.nro_cuartos != null && query.nro_cuartos != undefined) {
            where = where != '' ? `${where} AND propiedad.nro_cuartos = '${query.nro_cuartos}'` : `propiedad.nro_cuartos = '${query.nro_cuartos}'`
        }
        if (query.nro_banos != null && query.nro_banos != undefined) {
            where = where != '' ? `${where} AND propiedad.nro_banos = '${query.nro_banos}'` : `propiedad.nro_banos = '${query.nro_banos}'`
        }
        if (query.nro_garajes != null && query.nro_garajes != undefined) {
            where = where != '' ? `${where} AND propiedad.nro_garajes = '${query.nro_garajes}'` : `propiedad.nro_garajes = '${query.nro_garajes}'`
        }
        if (query.metro_max != null && query.metros_max != undefined) {
            where = where != '' ? `${where} AND propiedad.area >= '${query.metros_max}'` : `propiedad.area >= '${query.metros_max}'`
        }
        if (query.metromin != null && query.metros_min != undefined) {
            where = where != '' ? `${where} AND propiedad.area <= '${query.metros_min}'` : `propiedad.area <= '${query.metros_min}'`
        }
        if (query.arrendo_max != null && query.arrendo_max != undefined) {
            where = where != '' ? `${where} AND propiedad.valor_arrendo >= '${query.arrendo_max}'` : `propiedad.valor_arrendo >= '${query.arrendo_max}'`
        }
        if (query.metromin != null && query.arrendo_min != undefined) {
            where = where != '' ? `${where} AND propiedad.valor_arrendo <= '${query.arrendo_min}'` : `propiedad.valor_arrendo <= '${query.arrendo_min}'`
        }


        const response = await this.repository.createQueryBuilder('propiedad')
            .select("AVG(propiedad.valor_venta)", "costo_promedio")
            .addSelect("AVG(propiedad.area)", "area_promedio")
            .addSelect("AVG(propiedad.valor_venta)/AVG(propiedad.area)", "costo_metro2_promedio")
            .innerJoin("propiedad.barrio", "barrio")
            .innerJoin("barrio.ciudad", "ciudad")
            .where(where).getRawOne()
        return response;
    }

    async getFromFincaRaiz(ciudad: string, id: number) {
        try {
            console.log("getFromFincRaiz Starts : " + ciudad)
            let fincaRaizRequest = {

                "filter": {
                    "offer": { "slug": ["sell"] },
                    "property_type": { "slug": ["apartment", "studio", "house", "cabin", "country-house", "house-lot", "farm", "room", "lot", "warehouse", "consulting-room", "commercial", "office", "parking", "building"] },
                    "location_path": ciudad
                },
                "fields": {
                    "exclude": [], "include": ["area", "stratum.slug", "age.slug", "baths.id", "baths.name", "client.client_type", "client.company_name", "client.first_name", "client.last_name", "garages.name", "is_new", "locations.cities.name", "locations.cities.slug", "locations.countries.name", "locations.countries.slug", "locations.groups.name", "locations.groups.slug", "locations.groups.subgroups.name", "locations.groups.subgroups.slug", "locations.location_point", "locations.neighbourhoods.name", "locations.neighbourhoods.slug", "locations.states.name", "locations.states.slug", "locations.view_map.slug", "media.floor_plans.count", "media.photos.list.id", "media.photos.list.image.full_size", "media.photos.list.is_main", "media.videos.count", "min_area", "min_price", "price", "products.configuration.tag_name", "products.label", "products.name", "products.slug", "property_id", "fr_property_id", "rooms.name", "title", "property_type.name", "offer.name", "fr_parent_property_id"], "limit": 100,
                    "offset": 0,
                    "ordering": [],
                    "platform": 40,
                    "with_algorithm": false
                }

            }
            const response = await this.httpService.post('https://api.fincaraiz.com.co/document/api/1.0/listing/search', fincaRaizRequest).toPromise();
            for (let index = 0; index < response.data.hits.hits.length; index++) {
                let createPropiedadDTO = new Propiedad();
                createPropiedadDTO.id_plataforma = response.data.hits.hits[index]['_id']
                createPropiedadDTO.area = response.data.hits.hits[index]['_source']['listing']['area']
                createPropiedadDTO.nro_cuartos = (response.data.hits.hits[index]['_source']['listing']['rooms']['name'])
                createPropiedadDTO.nro_banos = (response.data.hits.hits[index]['_source']['listing']['baths']['name'])
                createPropiedadDTO.nro_garajes = (response.data.hits.hits[index]['_source']['listing']['garages']['name'])
                createPropiedadDTO.latitud = '1'
                createPropiedadDTO.longitud = '1'
                createPropiedadDTO.valor_venta = parseInt(response.data.hits.hits[index]['_source']['listing']['price'])
                createPropiedadDTO.valor_arrendo = 0
                createPropiedadDTO.consto_administracion = 0
                createPropiedadDTO.estrato = response.data.hits.hits[index]['_source']['listing']['stratum']['slug']
                let tipo_negocio = new TipoNegocio()
                tipo_negocio.id = 1
                createPropiedadDTO.tipo_negocio = tipo_negocio
                let tipo_propiedad = new TipoPropiedad()
                tipo_propiedad.id = 1
                createPropiedadDTO.tipo_propiedad = tipo_propiedad
                let plataforma = new Plataforma()
                plataforma.id = 1
                createPropiedadDTO.plataforma = plataforma
                let barrio = new Barrio()
                barrio.id = id
                createPropiedadDTO.barrio = barrio
                console.log(createPropiedadDTO)
                await this.repository.save(createPropiedadDTO)
            }
            return response.data;
        } catch (error) {
            console.log(`An error ocurred in getFromFincaRaiz: ${error}`)
        }
    }

    async getFromMetroCuadrado(ciudad: string, id: number, pagination: number = 0, steps: number = 100) {
        try {

            console.log("getFromMetroCuadrado Starts : " + ciudad)
            //let platformUrl = await this.plataformaRepository.findBy({nombre: "metrocuadrado"})
            let plataformaUrl = `https://www.metrocuadrado.com/rest-search/search?realEstateBusinessList=venta&realEstateTypeList=casa,edificio-de-apartamentos,edificio-de-oficinas,consultorio,finca,lote,bodega,local,oficina,apartamento&from=${pagination}&size=${steps}`
            let url = plataformaUrl + `&city=${ciudad}`
            const headersRequest = {
                'x-api-key': `P1MfFHfQMOtL16Zpg36NcntJYCLFm8FqFfudnavl`,
            };
            const response = await this.httpService.get(url, { headers: headersRequest }).toPromise();
            for (let index = 0; index < response.data.results.length; index++) {
                try {
                    let createPropiedadDTO = new Propiedad();
                    createPropiedadDTO.id_plataforma = response.data.results[index]['midinmueble']
                    createPropiedadDTO.area = response.data.results[index]['marea']
                    createPropiedadDTO.nro_cuartos = (response.data.results[index]['mnrocuartos'])
                    createPropiedadDTO.nro_banos = (response.data.results[index]['mnrobanos'])
                    createPropiedadDTO.nro_garajes = (response.data.results[index]['mnrogarajes'])
                    createPropiedadDTO.latitud = '1'
                    createPropiedadDTO.longitud = '1'
                    createPropiedadDTO.valor_venta = parseInt(response.data.results[index]['mvalorventa'])
                    createPropiedadDTO.valor_arrendo = parseInt(response.data.results[index]['mvalorarriendo'])
                    createPropiedadDTO.consto_administracion = parseInt(response.data.results[index]['data']['mvaloradministracion'])
                    createPropiedadDTO.estrato = 'STRATUM_3'
                    let tipo_negocio = new TipoNegocio()
                    tipo_negocio.id = 1
                    createPropiedadDTO.tipo_negocio = tipo_negocio
                    let tipo_propiedad = new TipoPropiedad()
                    tipo_propiedad.id = 1
                    createPropiedadDTO.tipo_propiedad = tipo_propiedad
                    let plataforma = new Plataforma()
                    plataforma.id = 1
                    createPropiedadDTO.plataforma = plataforma
                    let barrio = new Barrio()
                    barrio.id = id
                    createPropiedadDTO.barrio = barrio
                    console.log(createPropiedadDTO)
                    await this.repository.save(createPropiedadDTO)
                } catch (error) {
                    console.log(`An error ocurred in saving a property in getFromMetroCuadrado: ${error}`)
                }
            }
            if (pagination + steps < response.data.totalEntries) {
                this.getFromMetroCuadrado(ciudad, id, pagination + steps)
            } else {
                if (pagination < response.data.totalEntries) {
                    this.getFromMetroCuadrado(ciudad, id, pagination + steps, response.data.totalEntries - pagination)
                }
            }
            return response.data;
        } catch (error) {
            console.log(`An error ocurred in getFromMetroCuadrado: ${error}`)
        }
    }

}
