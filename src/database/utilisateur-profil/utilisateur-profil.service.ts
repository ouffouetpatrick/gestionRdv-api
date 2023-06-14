import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilisateurProfilEntity } from './utilisateur-profil.entity';
import { isDefined } from 'class-validator';
import { Response } from '../../core/shared/classes/response.class';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';

@Injectable()
export class UtilisateurProfilService {
    constructor(
        @InjectRepository(UtilisateurProfilEntity) private readonly utilisateurProfilRepository: Repository<UtilisateurProfilEntity>,
    ){}

    async save(utilisateurProfil: object): Promise<Response>{
        const result = await this.utilisateurProfilRepository.save( utilisateurProfil as UtilisateurProfilEntity);
        return result;
    }
    
    async update(utilisateurProfil: object, primaryKey: object): Promise<Response>{
        const response: any = await this.findById(primaryKey);
        const result = await this.utilisateurProfilRepository.save({ ...response.data, ...utilisateurProfil });
        return result;
    }
    
    async delete(primaryKey: object): Promise<Response>{
        const response: any = await this.findById(primaryKey);
        const result: any = await this.utilisateurProfilRepository.delete(primaryKey);
        return response;
    }

    async find(query: object): Promise<Response> {
        const result = await this.utilisateurProfilRepository.find(TypeOrmHttpParamQuery(query));
        return result;
    }

    async findById(primaryKey: object): Promise<Response> {
        const result = await this.utilisateurProfilRepository.findOne(primaryKey);
        if (!isDefined(result)){
            throw (new HttpException({status : { code: HttpStatus.NOT_FOUND, error: `Aucun utilisateurProfil trouvé `} }, HttpStatus.NOT_FOUND));
        }
        return result;
    }
}
