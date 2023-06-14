import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotifEntity } from './motif.entity';
import { MotifService } from './motif.service';
import { MotifController } from './motif.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MotifEntity])],
  controllers: [MotifController],
  providers: [MotifService],
  exports: [MotifService],
})
export class MotifModule {}
