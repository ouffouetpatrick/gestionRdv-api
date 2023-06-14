import { IsString, IsInt, IsOptional } from 'class-validator';
// import { ClientDto } from '../client';
// import { EmployeDto } from '../employe';
import { StatutDto } from '../statut/statut.dto';
import VisiteDto from '../visite/visite.dto';

export default class StatutVisiteDto {
  @IsOptional()
  @IsInt()
  readonly id: number;

  @IsInt()
  readonly actif: number;

  @IsOptional()
  @IsInt()
  readonly effectue: number;

  @IsOptional()
  @IsString()
  readonly satisfaction: string;
  
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
  readonly visite: VisiteDto[];

  @IsOptional()
  readonly statut: StatutDto[]; 

}
