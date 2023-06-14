import { DroitDto } from './../droit/droit.dto';
import { ModuleDto } from './../module/module.dto';
import { ProfilDto } from './../profil/profil.dto';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class TemplateProfilDto {


    @IsOptional()
    @IsInt()
    readonly id: number;

    @IsOptional()
    @IsString()
    readonly empty1 : string;

    @IsOptional()
    @IsString()
    readonly empty2 : string;

    @IsOptional()
    @IsString()
    readonly empty3 : string;

    @IsInt()
    readonly geler : number;

    @IsOptional()
    @IsString()
    readonly dateCreation : string;

    @IsOptional()
    @IsInt()
    readonly idusrcreation : number;

    @IsOptional()
    readonly profil : ProfilDto;

    @IsOptional()
    readonly module : ModuleDto;

    @IsOptional()
    readonly droit : DroitDto;

}