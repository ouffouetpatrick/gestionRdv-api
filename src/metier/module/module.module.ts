import { DatabaseModule } from '../../database/database.module';
import { Module } from '@nestjs/common';
import { ModuleDroitMetierController } from './module.controller';
import { ModuleDroitMetierService } from './module.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [ModuleDroitMetierController],
    providers: [ModuleDroitMetierService],
    exports: [],
})
export class ModuleDroitMetierModule {}
