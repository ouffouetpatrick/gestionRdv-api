import { Body, Catch, Controller, Get, Param, Post, Put, Delete, UseInterceptors, UseGuards} from '@nestjs/common';
import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';

import { TemplateProfilService } from './template-profil.service';
import { TemplateProfilDto } from './template-profil.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('templateProfil')
export class TemplateProfilController {
    constructor(
        private readonly templateProfilService: TemplateProfilService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async save(@Body(new ValidationPipe()) templateProfilDto: TemplateProfilDto) {
        const result = await this.templateProfilService.save(templateProfilDto);
        return result;
    }
	
	@Put(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async update (@Body(new ValidationPipe()) templateProfilDto: TemplateProfilDto, @Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.templateProfilService.update(templateProfilDto,primaryKey);
        return result;
    }
    
    @Delete(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async delete (@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.templateProfilService.delete(primaryKey);
        return result;
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find() {
        const result = await this.templateProfilService.find({});
        return result;
    }

    @Get('query/:findOption')
    @UseGuards(JwtAuthGuard)
    async findQuery(@Param('findOption',  new ParseJsonObjectPipe()) findOption) {
        const result = await this.templateProfilService.find(findOption);
        return result;
    }

    @Get(':primaryKey')
    @UseGuards(JwtAuthGuard)
    async findById(@Param('primaryKey',  new ParseJsonPipe()) primaryKey) {
        const result = await this.templateProfilService.findById(primaryKey);
        return result;
    }
}
