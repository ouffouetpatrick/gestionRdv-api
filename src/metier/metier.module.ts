import { EventsModule } from './gateways/events.module';
import { Module } from '@nestjs/common';
import { FilesModule } from './../files/files.module';
// import { ClientMetierModule } from './client/client.module';
import { VisiteMetierModule } from './visite/visite.module';
import { StatutVisiteMetierModule } from './statut-visite/statut-visite.module';
import { ModuleDroitMetierModule } from './module/module.module';
import { ProfilMetierModule } from './profil/profil.module';
import { UtilisateurMetierModule } from './utilisateur/utilisateur.module';
import { UtilisateurProfilMetierModule } from './utilisateur-profil/utilisateur-profil.module';


@Module({
    imports: [
        // Config
        EventsModule,
        FilesModule,

        // Administration
        
        // Metier
        // ClientMetierModule,

        //Visite
        VisiteMetierModule,

        //StatutVisite
        StatutVisiteMetierModule,

        //ModuleDroit
        ModuleDroitMetierModule,

        //ProfilMetier
        ProfilMetierModule,

        //Utilisateur
        UtilisateurMetierModule,

        //Utilisateur Profil
        UtilisateurProfilMetierModule
        
        // Others

    ],
    providers: [],
    controllers: [],
    exports: [],
})
export class MetierModule {}
