import { IsString, IsInt, IsOptional } from 'class-validator';
import { UtilisateurDto } from '../utilisateur';

export class ProfilDto {

    @IsOptional()
    @IsInt()
    readonly id: number;

    @IsString()
    readonly libelle : string;

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
    @IsInt()
    readonly idusrcreation : number;

    @IsOptional()
    @IsString()
    readonly dateCreation : string;

    @IsOptional()
    readonly utilisateur : UtilisateurDto[];

}