import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateProfilService } from './template-profil.service';
import { TemplateProfilController } from './template-profil.controller';
import { TemplateProfilEntity } from './template-profil.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TemplateProfilEntity])],
  controllers: [TemplateProfilController],
  providers: [TemplateProfilService],
  exports: [TemplateProfilService],
})
export class TemplateProfilModule {}
