import { Body, Catch, Controller, Post, UseGuards, UseInterceptors, Get } from '@nestjs/common';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { UtilisateurProfilMetierService } from './utilisateur-profil.service';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('metier/utilisateurProfil')
export class UtilisateurProfilMetierController {
    constructor(
        private readonly utilisateurProfilMetierService: UtilisateurProfilMetierService,
    ) {}


    @Get('recupererListeEmployeAndNbrVisite')
    @Transaction()
    async recupererListeEmployeAndNbrVisite(@TransactionManager() manager: EntityManager) {
        const result = this.utilisateurProfilMetierService.recupererListeEmployeAndNbrVisite(manager);
        return result;
    }

    @Get('recupererListeEmploye')
    @Transaction()
    async recupererListeEmploye(@TransactionManager() manager: EntityManager) {
        const result = this.utilisateurProfilMetierService.recupererListeEmploye(manager);
        return result;
    }

}
