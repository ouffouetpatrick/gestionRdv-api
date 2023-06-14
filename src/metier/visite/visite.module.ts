import { DatabaseModule } from '../../database/database.module';
import { Module } from '@nestjs/common';
import { VisiteMetierController } from './visite.controller';
import { VisiteMetierService } from './visite.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [
        DatabaseModule,
        MailModule
    ],
    controllers: [VisiteMetierController],
    providers: [VisiteMetierService],
    exports: [],
})
export class VisiteMetierModule { }
