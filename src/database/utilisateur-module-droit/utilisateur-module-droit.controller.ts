import { Body, Catch, Controller, Get, Param, Post, Put, Delete, UseInterceptors, UseGuards} from '@nestjs/common';
import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';

import { UtilisateurModuleDroitService } from './utilisateur-module-droit.service';
import { UtilisateurModuleDroitDto } from './utilisateur-module-droit.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('utilisateurModuleDroit')
export class UtilisateurModuleDroitController {
    constructor(
        private readonly utilisateurModuleDroitService: UtilisateurModuleDroitService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async save(@Body(new ValidationPipe()) utilisateurModuleDroitDto: UtilisateurModuleDroitDto) {
        const result = await this.utilisateurModuleDroitService.save(utilisateurModuleDroitDto);
        return result;
    }
	
	@Put(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async update (@Body(new ValidationPipe()) utilisateurModuleDroitDto: UtilisateurModuleDroitDto, @Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurModuleDroitService.update(utilisateurModuleDroitDto,primaryKey);
        return result;
    }
    
    @Delete(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async delete (@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurModuleDroitService.delete(primaryKey);
        return result;
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find() {
        const result = await this.utilisateurModuleDroitService.find({});
        return result;
    }

    @Get('query/:findOption')
    @UseGuards(JwtAuthGuard)
    async findQuery(@Param('findOption',  new ParseJsonObjectPipe()) findOption) {
        const result = await this.utilisateurModuleDroitService.find(findOption);
        return result;
    }

    @Get(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.utilisateurModuleDroitService.findById(primaryKey);
        return result;
    }
}
