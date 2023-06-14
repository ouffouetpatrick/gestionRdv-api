import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DroitModule,
  ModuleDroitModule, 
  ModuleModule, 
  MotifModule, 
  ProfilModule, 
  TemplateProfilModule, 
  UtilisateurModule, 
  UtilisateurModuleDroitModule, 
  UtilisateurProfilModule, 
  VisiteModule,
  // ClientModule,
  // EmployeModule,
} from './';
import { CONFIG } from '../app.constant';
import { StatutModule } from './statut';
import { StatutVisiteModule } from './statut-visite/statut-visite.module';

@Module({
  imports: [
    // Config
    TypeOrmModule.forRoot(CONFIG().db),

    // Administration
    VisiteModule,
    StatutModule,
    StatutVisiteModule,
    DroitModule,
    ModuleModule,
    ModuleDroitModule,
    MotifModule,
    ProfilModule,
    TemplateProfilModule,
    UtilisateurModule,
    UtilisateurModuleDroitModule,
    UtilisateurProfilModule
    // Metier

    // Others
  ],
  providers: [],
  controllers: [],
  exports: [
    // Administration
    VisiteModule,
    StatutModule,
    StatutVisiteModule,
    DroitModule,
    ModuleModule,
    ModuleDroitModule,
    MotifModule,
    ProfilModule,
    TemplateProfilModule,
    UtilisateurModule,
    UtilisateurModuleDroitModule,
    UtilisateurProfilModule
    // Metier

    // Others
    
  ],
})
export class DatabaseModule {}
