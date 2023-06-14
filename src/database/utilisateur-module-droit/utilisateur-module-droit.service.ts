import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilisateurModuleDroitEntity } from './utilisateur-module-droit.entity';
import { isDefined } from 'class-validator';
import { Response } from '../../core/shared/classes/response.class';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';

@Injectable()
export class UtilisateurModuleDroitService {
    constructor(
        @InjectRepository(UtilisateurModuleDroitEntity) private readonly utilisateurModuleDroitRepository: Repository<UtilisateurModuleDroitEntity>,
    ){}

    async save(utilisateurModuleDroit: object): Promise<Response>{
        const result = await this.utilisateurModuleDroitRepository.save( utilisateurModuleDroit as UtilisateurModuleDroitEntity);
        return result;
    }
    
    async update(utilisateurModuleDroit: object, primaryKey: object): Promise<Response>{
        const response: any = await this.findById(primaryKey);
        const result = await this.utilisateurModuleDroitRepository.save({ ...response.data, ...utilisateurModuleDroit });
        return result;
    }
    
    async delete(primaryKey: object): Promise<Response>{
        const response: any = await this.findById(primaryKey);
        const result: any = await this.utilisateurModuleDroitRepository.delete(primaryKey);
        return response;
    }

    async find(query: object): Promise<Response> {
        const result = await this.utilisateurModuleDroitRepository.find(TypeOrmHttpParamQuery(query));
        return result;
    }

    async findById(primaryKey: object): Promise<Response> {
        const result = await this.utilisateurModuleDroitRepository.findOne(primaryKey);
        if (!isDefined(result)){
            throw (new HttpException({status : { code: HttpStatus.NOT_FOUND, error: `Aucun utilisateurModuleDroit trouvé `} }, HttpStatus.NOT_FOUND));
        }
        return result;
    }
}
