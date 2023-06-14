import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatutVisiteEntity } from './statut-visite.entity';
import { StatutVisiteService } from './statut-visite.service';
import { StatutVisiteController } from './statut-visite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StatutVisiteEntity])],
  controllers: [StatutVisiteController],
  providers: [StatutVisiteService],
  exports: [StatutVisiteService],
})
export class StatutVisiteModule {}