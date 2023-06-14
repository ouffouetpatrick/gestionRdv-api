import { Body, Catch, Controller, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';

import { ProfilMetierService } from './profil.service';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { ProfilDto } from 'src/database/profil/profil.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('metier/profil')
export class ProfilMetierController {
    constructor(
        private readonly profilMetierService: ProfilMetierService,
    ) {}

    @Post('ajouter')
    @UseGuards(JwtAuthGuard)
    @Transaction()
    async save(@Body(new ValidationPipe()) profilDto: ProfilDto,  @TransactionManager() manager: EntityManager) {
        const result = this.profilMetierService.saveProfil(manager, profilDto);
        
        return result
    }
}
