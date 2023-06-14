import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurProfilEntity } from './utilisateur-profil.entity';
import { UtilisateurProfilService } from './utilisateur-profil.service';
import { UtilisateurProfilController } from './utilisateur-profil.controller';


@Module({
  imports: [TypeOrmModule.forFeature([UtilisateurProfilEntity])],
  controllers: [UtilisateurProfilController],
  providers: [UtilisateurProfilService],
  exports: [UtilisateurProfilService],
})
export class UtilisateurProfilModule {}
