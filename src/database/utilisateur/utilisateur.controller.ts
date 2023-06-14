import { Body, Catch, Controller, Get, Param, Post, Put, Delete, UseGuards, UseInterceptors} from '@nestjs/common';
import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';

import { UtilisateurService } from './utilisateur.service';
import { UtilisateurDto } from './utilisateur.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('utilisateur')
export class UtilisateurController {
    constructor(
        private readonly utilisateurService: UtilisateurService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async save(@Body(new ValidationPipe()) utilisateurDto: UtilisateurDto) {
        const result = await this.utilisateurService.save(utilisateurDto);
        return result;
    }
	
	@Put(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async update (@Body(new ValidationPipe()) utilisateurDto: UtilisateurDto, @Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurService.update(utilisateurDto,primaryKey);
        return result;
    }
    
    @Delete(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async delete (@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurService.delete(primaryKey);
        return result;
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find() {
        const result = await this.utilisateurService.find({});
        return result;
    }

    @Get('query/:findOption')
    @UseGuards(JwtAuthGuard)
    async findQuery(@Param('findOption',  new ParseJsonObjectPipe()) findOption) {
        const result = await this.utilisateurService.find(findOption);
        return result;
    }

    @Get(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async findById(@Param('primaryKey',  new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurService.findById(primaryKey);
        return result;
    }
}
