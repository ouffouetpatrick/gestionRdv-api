import { Injectable } from '@nestjs/common';
import { Like, Between } from 'typeorm';
import { Transaction, TransactionManager, EntityManager, getManager,} from 'typeorm';
import { VisiteEntity } from 'src/database/visite/visite.entity';
import { StatutVisiteEntity } from 'src/database/statut-visite/statut-visite.entity';
import { MailService } from 'src/mail/mail.service';
import { UtilisateurEntity } from 'src/database/utilisateur/utilisateur.entity';
import { UtilisateurProfilEntity } from 'src/database/utilisateur-profil/utilisateur-profil.entity';

@Injectable()
export class VisiteMetierService {
  constructor(
    private mailservice : MailService
  ) {}

  //Fonction demande visite
  //créer une nouvelle visite et lui attribuer le statut 1(en attente) par defaut.
  async demandeVisite(manager: EntityManager, visite: any, user:UtilisateurEntity) {
    
    let visiteEntity = new VisiteEntity({
      ...visite,
    });

    visiteEntity = await manager.save(visiteEntity);

    if (visiteEntity) {
      let statutVisiteEntity = new StatutVisiteEntity({
        empty1: null,
        empty2: null,
        empty3: null,
        geler: 0,
        dateCreation: new Date().toDateString(),
        idusrcreation: visiteEntity.idusrcreation,
        visite: visiteEntity.id,
        statut: 1,
        actif: 0,
      });
      statutVisiteEntity = await manager.save(statutVisiteEntity);
    }

    //Etape d'envoie d'email aux admin après ajout de visites
    //Recuperer les email des admin (utilisateur profil = 1) 
    const emailtab = [];
    const emailAdmin: any = await manager.createQueryBuilder(UtilisateurProfilEntity, 'user')
        .select([
          "user.id",
          "utilisateur.email",
          "profil.id"
      ])
      .leftJoin("user.utilisateur", "utilisateur")
      .leftJoin("user.profil", "profil")
      .where("user.profil=1")
      .getMany()

      // Ajouter le resultat au tableau emailtab
      // Le tableau sera utilisé comme adresse de destinataire dans le mailservice, ex:(to : [data.resultemail])
      for (let i = 0; i < emailAdmin.length; i++) {
        const element = emailAdmin[i];
        emailtab.push(element.utilisateur.email)
      }
      const resultemail = emailtab

      //Les variables crée dans le data sont utilisé dans le mailRequest.hbs du dossier templates
    const data = {
        salutation: "Bonjour cher administrateur",
        title: "Demande de rendez-vous",
        content: "M./Mm "+user.nom+" "+user.prenom+" a fait une demande de rendez-vous",
        consigne: "Veuillez l'assigner à qui de droit",
        thank: "Merci",
        signature: "L’équipe ORTISSAI",
        resultemail
      };

    const result = await this.mailservice.sendDemandeVisite(user, visite, data);
    if(result){
      return {
        etat: "succes",
        data: {
          visite
        }
      }
    }

    return visiteEntity;
  }

  //Fonction Modifier visite
  async updateVisite(manager: EntityManager, visite: any) {
    let visiteEntity = new VisiteEntity({
      ...visite,
    });

    visiteEntity = await manager.save(visiteEntity);
    return visiteEntity;
  }

  //Fonction attribuer visite
  async attribuerVisite(manager: EntityManager, visite: any) {
    
    const visiteEntity = new VisiteEntity({
      ...visite,
    });
    
    const visites = await manager.save(visiteEntity);
    
    let statutVisiteEntity = new StatutVisiteEntity({
      empty1: null,
      empty2: null,
      empty3: null,
      geler: 0,
      dateCreation: new Date().toDateString(),
      idusrcreation: 1,
      visite: visiteEntity.id,
      statut: 1,
      actif: 0,
    });

    const visiteStatutZero = await manager.find(StatutVisiteEntity, {
      where: {
        visite: visiteEntity.id,
        actif: 0,
      },
    });

    if (visiteStatutZero.length > 0) {
      for (let i = 0; i < visiteStatutZero.length; i++) {
        const statut = visiteStatutZero[i];
        statut.actif = 1;
        await manager.save(statut);
      }
    }

    statutVisiteEntity = await manager.save(statutVisiteEntity);

    const destinataire: any = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select([
        "visite.id",
        "employe.id",
        "employe.email",
        "employe.nom",
        "employe.prenom",
        "utilisateur.id",
        "utilisateur.nom",
        "utilisateur.prenom",
      ])
      .leftJoin("visite.employe", "employe")
      .leftJoin("visite.utilisateur", "utilisateur")
      .where('visite.employe=:employe', { employe: visiteEntity.employe })
      .getMany()
      
      for (let i = 0; i < destinataire.length; i++) {
        const element = destinataire[i];
        const data = {
          salutation: "Bonjour M./Mm  "+element.employe.nom+" "+element.employe.prenom+"",
          content: "Vous avez reçu une demande de rendez-vous de la part de",
          demandeur: "M./Mm "+element.utilisateur.nom+" "+element.utilisateur.prenom+"",
          consigne: "Veuillez la traiter",
          thank: "Merci",
          signature: "L’équipe ORTISSAI",
          email: element.employe.email
        };
    
        const result = await this.mailservice.sendTraitementVisite(visite, data);
        if(result){
          return {
            etat: "succes",
            data: {
              visite
            }
          }
        }

      }

    return visites;
  }

  //Fonction Annuler visite
  async rejeterVisite(manager: EntityManager, visite: any, user: any) {
    
    const visiteEntity = new VisiteEntity({
      ...visite
    });
    
    const visites = await manager.save(visiteEntity);

    let statutVisiteEntity = new StatutVisiteEntity({
      empty1: null,
      empty2: null,
      empty3: null,
      geler: 0,
      dateCreation: new Date().toDateString(),
      idusrcreation: 1,
      visite: visiteEntity.id,
      statut: 3,
      actif: 0,
    });

    const visiteStatutZero = await manager.find(StatutVisiteEntity, {
      where: {
        visite: visiteEntity.id,
        actif: 0,
      },
    });

    if (visiteStatutZero.length > 0) {
      for (let i = 0; i < visiteStatutZero.length; i++) {
        const statut = visiteStatutZero[i];
        statut.actif = 1;
        await manager.save(statut);
      }
    }

    statutVisiteEntity = await manager.save(statutVisiteEntity);

    const destinataire: any = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select([
        "visite.id",
        "visite.motif",
        "utilisateur.id",
        "utilisateur.email",
        "utilisateur.nom",
        "utilisateur.prenom",
      ])
      .leftJoin("visite.utilisateur", "utilisateur")
      .where('visite.utilisateur=:utilisateur', { utilisateur: visiteEntity.idusrcreation })
      .getMany()
      
      for (let i = 0; i < destinataire.length; i++) {
        const element = destinataire[i];
        const data = {
          salutation: "Bonjour M./Mm  "+element.utilisateur.nom+" "+element.utilisateur.prenom+"",
          content: "Votre rendez-vous a été rejeté, nous sommes désolés de ne pas pouvoir vous recevoir à la date que vous avez demandée",
          motif_rejet: "Motif du rejet : "+visite.motif.libelle+"",
          consigne: "Veuillez reprendre un nouveau rendez-vous",
          thank: "Merci pour votre comprehension",
          signature: "L’équipe ORTISSAI",
          email: element.utilisateur.email
        };
    
        const result = await this.mailservice.sendRejeterVisite(visite, data);
        if(result){
          return {
            etat: "succes",
            data: {
              visite
            }
          }
        }

      }

    return visites;
  }

}
