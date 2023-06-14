import { DroitDto } from './../droit/droit.dto';
import { UtilisateurDto } from '../utilisateur/utilisateur.dto';
import { ModuleDto } from '../module/module.dto';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UtilisateurModuleDroitDto {


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

    @IsString()
    readonly dateCreation : string;

    @IsInt()
    readonly geler : number;

    @IsInt()
    readonly idusrcreation : number;

    @IsOptional()
    readonly utilisateur : UtilisateurDto;

    @IsOptional()
    readonly module : ModuleDto;

    @IsOptional()
    readonly droit : DroitDto;

    @IsOptional()
    readonly templateProfil : number;
}