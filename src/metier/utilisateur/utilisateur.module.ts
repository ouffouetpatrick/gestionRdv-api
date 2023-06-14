import { DatabaseModule } from '../../database/database.module';
import { Module } from '@nestjs/common';
import { UtilisateurMetierController } from './utilisateur.controller';
import { UtilisateurMetierService } from './utilisateur.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [UtilisateurMetierController],
    providers: [UtilisateurMetierService],
    exports: [UtilisateurMetierService],
})
export class UtilisateurMetierModule {}
