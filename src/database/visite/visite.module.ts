import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisiteEntity } from './visite.entity';
import { VisiteService } from './visite.service';
import { VisiteController } from './visite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VisiteEntity])],
  controllers: [VisiteController],
  providers: [VisiteService],
  exports: [VisiteService],
})
export class VisiteModule {}