import { IsString, IsInt, IsOptional } from 'class-validator';
import { MotifDto } from '../motif/motif.dto';
// import { ClientDto } from '../client';
// import { EmployeDto } from '../employe';
import StatutVisiteDto from '../statut-visite/statut-visite.dto';
import { UtilisateurDto } from '../utilisateur/utilisateur.dto';

export default class VisiteDto {
  @IsOptional()
  @IsInt()
  readonly id: number;

  @IsString()
  readonly date: string;

  @IsString()
  readonly heure: string;

  @IsString()
  readonly objet: string;

  @IsOptional()
  @IsString()
  readonly empty1: string;

  @IsOptional()
  @IsString()
  readonly empty2: string;

  @IsOptional()
  @IsString()
  readonly empty3: string;

  @IsInt()
  readonly geler: number;

  @IsString()
  readonly dateCreation: string;

  @IsInt()
  readonly idusrcreation: number;

  @IsOptional()
  readonly employe: UtilisateurDto[];

  @IsOptional()
  readonly statutVisite: StatutVisiteDto[];

  @IsOptional()
  readonly motif: MotifDto[];

  // @IsOptional()
  // readonly employe: EmployeDto[];

  // @IsOptional()
  // readonly client: ClientDto[]; 

}
