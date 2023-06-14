import { DatabaseModule } from '../../database/database.module';
import { Module } from '@nestjs/common';
import { ProfilMetierController } from './profil.controller';
import { ProfilMetierService } from './profil.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [ProfilMetierController],
    providers: [ProfilMetierService],
    exports: [],
})
export class ProfilMetierModule {}
