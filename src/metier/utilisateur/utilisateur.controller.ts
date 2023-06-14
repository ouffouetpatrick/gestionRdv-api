import { Body, Catch, Controller, Post, UseGuards, UseInterceptors, Get } from '@nestjs/common';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';

import { UtilisateurMetierService } from './utilisateur.service';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { UtilisateurDto } from 'src/database/utilisateur/utilisateur.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UtilisateurEntity } from 'src/database/utilisateur/utilisateur.entity';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('metier/utilisateur')
export class UtilisateurMetierController {
    constructor(
        private readonly utilisateurMetierService: UtilisateurMetierService,
    ) {}

    @Get('navigation')
    @UseGuards(JwtAuthGuard)
    @Transaction()
    async navigation(@CurrentUser() user: UtilisateurEntity, @TransactionManager() manager: EntityManager) {
        const result = this.utilisateurMetierService.navigation(manager, user);
        return result
    }
    @Post('ajouter')
    @UseGuards(JwtAuthGuard)
    @Transaction()
    async save(@Body(new ValidationPipe()) utilisateurDto: UtilisateurDto,  @TransactionManager() manager: EntityManager) {
        const result = this.utilisateurMetierService.saveUtilisateur(manager, utilisateurDto);
        
        return result
    }

    @Post('update')
    @UseGuards(JwtAuthGuard)
    @Transaction()
    async update(@Body(new ValidationPipe()) utilisateurDto: UtilisateurDto,  @TransactionManager() manager: EntityManager) {
        const result = this.utilisateurMetierService.updateUtilisateur(manager, utilisateurDto);
        
        return result
    }

    // retourne les derniers utilisateurs enregistré
    @Get('last')
    @UseGuards(JwtAuthGuard)
    @Transaction()
    async getLastUtilisateur(@TransactionManager() manager: EntityManager) {
        const result = this.utilisateurMetierService.getLastUtilisateur(manager);
        
        return result
    }
}
