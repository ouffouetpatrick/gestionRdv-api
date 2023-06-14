import { DatabaseModule } from '../../database/database.module';
import { Module } from '@nestjs/common';
import { StatutVisiteMetierController } from './statut-visite.controller';
import { StatutVisiteMetierService } from './statut-visite.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [
        DatabaseModule,
        MailModule
    ],
    controllers: [StatutVisiteMetierController],
    providers: [StatutVisiteMetierService],
    exports: [],
})
export class StatutVisiteMetierModule { }
