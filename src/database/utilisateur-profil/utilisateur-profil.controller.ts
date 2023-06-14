import { Body, Catch, Controller, Get, Param, Post, Put, Delete, UseInterceptors, UseGuards} from '@nestjs/common';
import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';

import { UtilisateurProfilService } from './utilisateur-profil.service';
import { UtilisateurProfilDto } from './utilisateur-profil.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('utilisateurProfil')
export class UtilisateurProfilController {
    constructor(
        private readonly utilisateurProfilService: UtilisateurProfilService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async save(@Body(new ValidationPipe()) utilisateurProfilDto: UtilisateurProfilDto) {
        const result = await this.utilisateurProfilService.save(utilisateurProfilDto);
        return result;
    }
	
	@Put(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async update (@Body(new ValidationPipe()) utilisateurProfilDto: UtilisateurProfilDto, @Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurProfilService.update(utilisateurProfilDto,primaryKey);
        return result;
    }
    
    @Delete(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async delete (@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurProfilService.delete(primaryKey);
        return result;
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find() {
        const result = await this.utilisateurProfilService.find({});
        return result;
    }

    @Get('query/:findOption')
    @UseGuards(JwtAuthGuard)
    async findQuery(@Param('findOption',  new ParseJsonObjectPipe()) findOption) {
        const result = await this.utilisateurProfilService.find(findOption);
        return result;
    }

    @Get(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async findById(@Param('primaryKey',  new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurProfilService.findById(primaryKey);
        return result;
    }
}
