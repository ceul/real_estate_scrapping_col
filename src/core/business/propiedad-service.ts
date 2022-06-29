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
        @InjectRepository(Propiedad) private readonly repository: Repository<Propiedad>
    ) { }

    async findOne(id){
        const response = this.repository.findOneBy({id: id})
        return response;
    }


    async findAll() {
        const response = this.repository.find()
        return response;
    }

    async mean(name: string) {
        console.log('entre  :'+name)
        const response = this.repository.createQueryBuilder('p')
        .select("AVG(p.valor_venta)", "mean")
        .innerJoin("propiedad.barrio", "barrio")
        .innerJoin("barrio.ciudad", "ciudad")
        .where("ciudad.nombre = :nombre", {name})
        .getOne()
        return response;
    }

    async getFromFincaRaiz(ciudad: string) {
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
                createPropiedadDTO.nro_cuartos =  parseInt(response.data.hits.hits[index]['_source']['listing']['rooms']['name'])
                createPropiedadDTO.nro_banos =  parseInt(response.data.hits.hits[index]['_source']['listing']['baths']['name'])
                createPropiedadDTO.nro_garajes =  parseInt(response.data.hits.hits[index]['_source']['listing']['garages']['name'])
                createPropiedadDTO.latitud = '1'
                createPropiedadDTO.longitud = '1'
                createPropiedadDTO.valor_venta = parseInt(response.data.hits.hits[index]['_source']['listing']['price'])
                createPropiedadDTO.valor_arrendo = 0
                createPropiedadDTO.consto_administracion = 0
                createPropiedadDTO.estrato = '3'//response.data.hits.hits[index]['_source']['listing']['stratum']['slug']
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
                barrio.id = 1
                createPropiedadDTO.barrio = barrio
                console.log(createPropiedadDTO)
                this.repository.save(createPropiedadDTO)
            }
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

}
