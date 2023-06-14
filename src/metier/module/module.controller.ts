import { Body, Catch, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';

import { ModuleDroitMetierService } from './module.service';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { ModuleDroitDto } from '../../database/module-droit/module-droit.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('metier/module')
export class ModuleDroitMetierController {
  constructor(
    private readonly moduleDroitMetierService: ModuleDroitMetierService,
  ) {}

  @Post('add-module')
  @UseGuards(JwtAuthGuard)
  @Transaction()
  async save(
    @Body(new ValidationPipe()) moduleDroitDto: ModuleDroitDto[],
    @TransactionManager() manager: EntityManager,
  ) {
    const result = await this.moduleDroitMetierService.saveModule(
      manager,
      moduleDroitDto,
    );
    return result;
  }
}
