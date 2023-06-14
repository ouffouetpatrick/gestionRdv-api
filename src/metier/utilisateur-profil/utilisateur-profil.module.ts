import { DatabaseModule } from '../../database/database.module';
import { Module } from '@nestjs/common';
import { UtilisateurProfilMetierController } from './utilisateur-profil.controller';
import { UtilisateurProfilMetierService } from './utilisateur-profil.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [UtilisateurProfilMetierController],
    providers: [UtilisateurProfilMetierService],
    exports: [UtilisateurProfilMetierService],
})
export class UtilisateurProfilMetierModule {}
