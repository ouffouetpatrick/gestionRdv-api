import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurModuleDroitEntity } from './utilisateur-module-droit.entity';
import { UtilisateurModuleDroitService } from './utilisateur-module-droit.service';
import { UtilisateurModuleDroitController } from './utilisateur-module-droit.controller';


@Module({
  imports: [TypeOrmModule.forFeature([UtilisateurModuleDroitEntity])],
  controllers: [UtilisateurModuleDroitController],
  providers: [UtilisateurModuleDroitService],
  exports: [UtilisateurModuleDroitService],
})
export class UtilisateurModuleDroitModule {}
