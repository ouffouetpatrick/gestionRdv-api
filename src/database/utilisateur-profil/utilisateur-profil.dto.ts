import { ProfilDto } from './../profil/profil.dto';
import { UtilisateurDto } from '../utilisateur/utilisateur.dto';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UtilisateurProfilDto {

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
    readonly profil : ProfilDto;
}