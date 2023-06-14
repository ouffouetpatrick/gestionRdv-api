import {Body,Catch,Controller,Get,Param,Post,Put,Delete,UseGuards,UseInterceptors,} from '@nestjs/common';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import {Transaction,TransactionManager,EntityManager,getManager,} from 'typeorm';
import { StatutVisiteMetierService } from './statut-visite.service';
import StatutVisiteDto from 'src/database/statut-visite/statut-visite.dto';
import VisiteDto from 'src/database/visite/visite.dto';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('metier/statutVisite')
export class StatutVisiteMetierController {constructor(private readonly statutVisiteMetierService: StatutVisiteMetierService,){

  }

  @Post('validerVisite')@Transaction() async validerVisite(@Body(new ValidationPipe()) statutvisiteDto: StatutVisiteDto, @TransactionManager() manager: EntityManager,){
    const result = this.statutVisiteMetierService.validerVisite(manager, statutvisiteDto);
    return result;
  }

  @Post('marquerEffectuer')@Transaction() async marquerEffectuer(@Body(new ValidationPipe()) statutvisiteDto: any,@TransactionManager() manager: EntityManager,){
    const result = this.statutVisiteMetierService.marquerEffectuer(manager,statutvisiteDto,);
    return result;
  }

  @Post('confirmerVisite')
  @Transaction() async confirmerVisite(@Body(new ValidationPipe()) statutvisiteDto: StatutVisiteDto, @TransactionManager() manager: EntityManager,){
    const result = this.statutVisiteMetierService.confirmerVisite( manager, statutvisiteDto,);
    return result;
  }

  //Recuperer toutes les visites attentes pour pouvoir afficher les statistiques
  //dans le tableau de bord
  @Get('recupererVisiteAttenteAll')
  @Transaction()
  async recupererVisiteAttenteAll(
    @TransactionManager() manager: EntityManager,
  ) {
    const result =
      this.statutVisiteMetierService.recupererVisiteAttenteAll(manager);
    return result;
  }

  //recuperer le total des visites selon leur statut
  @Get('total-visite-par-statut')
  @Transaction() async recupererVisite(@TransactionManager() manager: EntityManager) {
    const result = this.statutVisiteMetierService.recupererTotalVisite(manager);
    return result;
  }

  //recuperer le total des visites selon l'employe auquel elles sont attribuées
  @Get('total-visite-attribue')
  @Transaction() async recupererVisiteEmploye(@TransactionManager() manager: EntityManager) {
    const result = this.statutVisiteMetierService.recupererTotalVisiteEnattenteAttribue(manager,);
    return result;
  }

  //Faire une recherche journalière
  @Post('rechercherByDay')
  @Transaction() async rechercherByDay( @Body(new ValidationPipe()) query: any, @TransactionManager() manager: EntityManager) {
    const result = this.statutVisiteMetierService.rechercherByDay(manager,query);
    return result;
  }

  @Post('rechercherByWeek')
  @Transaction() async rechercherByWeek( @Body(new ValidationPipe()) query: any, @TransactionManager() manager: EntityManager) {
    const result = this.statutVisiteMetierService.rechercherByWeek(manager,query);
    return result;
  }

  //Faire une recherche journalière
  @Post('rechercherByMonth')
  @Transaction() async rechercherByMonth( @Body(new ValidationPipe()) query: any, @TransactionManager() manager: EntityManager) {
    const result = this.statutVisiteMetierService.rechercherByMonth(manager,query);
    return result;
  }

  @Post('rechercherByYear')
  @Transaction()async rechercherByYear( @Body(new ValidationPipe()) query: any, @TransactionManager() manager: EntityManager) {
    const result = this.statutVisiteMetierService.rechercherByYear(manager,query);
    return result;
  }

}