import { Injectable } from '@nestjs/common';
import { Like, Between } from 'typeorm';
import {Transaction,TransactionManager,EntityManager,getManager,} from 'typeorm';
import { StatutVisiteEntity } from 'src/database/statut-visite/statut-visite.entity';
import { VisiteEntity } from 'src/database/visite/visite.entity';
import { UtilisateurProfilEntity } from 'src/database/utilisateur-profil/utilisateur-profil.entity';
import { MailService } from 'src/mail/mail.service';
import { UtilisateurEntity } from 'src/database';

@Injectable()
export class StatutVisiteMetierService {
  constructor(
    private mailservice : MailService
  ) {}

  //Fonction changer statut
  async validerVisite(manager: EntityManager, statutVisite: any) {
    //recuperer les informations de la table statutVisite pour pouvoir effectuer
    //les actions dessus.
    //le nouveau etat de statut qui sera créer aura pour actif:0
    let statutVisiteEntity = new StatutVisiteEntity({
      ...statutVisite,
      statut: 2,
    });
    console.log(statutVisiteEntity, 'statutVisiteEntity');
    
    //recuperer les informations de la table visite partant de l'id de la visite
    //qui se trouve dans la table statutVisite.
    //On recupere les visites dont l'actif = 0
    const listeVisite = await manager.find(StatutVisiteEntity, {
      where: {
        visite: statutVisite.visite,
        actif: 0,
      },
    });
    //Changer l'actif à 1 pour desactiver ce statut afin de lui attribuer un nouveau
    //qui va être enregistrer par la suite
    if (listeVisite.length > 0) {
      for (let i = 0; i < listeVisite.length; i++) {
        const statut = listeVisite[i];
        statut.actif = 1;
        await manager.save(statut);
      }
    }
    //Enregistrer les nouvelles données
    statutVisiteEntity = await manager.save(statutVisiteEntity);
    
    const destinataire: any = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select([
        "visite.id",
        "utilisateur.id",
        "utilisateur.email",
        "utilisateur.nom",
        "utilisateur.prenom",
      ])
      .leftJoin("visite.utilisateur", "utilisateur")
      .where('visite.utilisateur=:utilisateur', { utilisateur: statutVisiteEntity.idusrcreation })
      .getMany()
      
      for (let i = 0; i < destinataire.length; i++) {
        const element = destinataire[i];
        const data = {
          salutation: "Bonjour M./Mm  "+element.utilisateur.nom+" "+element.utilisateur.prenom+"",
          content: "Votre rendez-vous a été accepté",
          consigne: "Veuillez confirmer votre présence",
          thank: "Merci",
          signature: "L’équipe ORTISSAI",
          email: element.utilisateur.email
        };
    
        const result = await this.mailservice.sendValidationVisite(statutVisite, data);
        if(result){
          return {
            etat: "succes",
            data: {
              statutVisite
            }
          }
        }

      }

    return statutVisiteEntity;
  }
  //Fonction Marquer comme effectuer
  //Modifier le champ effectuer pour marquer comme effectuer
  async marquerEffectuer(manager: EntityManager, statutVisite: any) {
    //recuperer les informations de la table statutVisite pour pouvoir effectuer
    //les actions dessus.
    //le nouveau etat de statut qui sera créer aura pour actif:0
    let statutVisiteEntity = new StatutVisiteEntity({
      ...statutVisite,
      statut: 4,
    });
    //recuperer les informations de la table visite partant de l'id de la visite
    //qui se trouve dans la table statutVisite.
    //On recupere les visites dont l'actif = 0
    const listeVisite = await manager.find(StatutVisiteEntity, {
      where: {
        visite: statutVisite.visite,
        actif: 0,
      },
    });
    //Changer l'actif à 1 pour desactiver ce statut afin de lui attribuer un nouveau
    //qui va être enregistrer par la suite
    if (listeVisite.length > 0) {
      for (let i = 0; i < listeVisite.length; i++) {
        const statut = listeVisite[i];
        statut.actif = 1;
        await manager.save(statut);
      }
    }
    //Enregistrer les nouvelles données
    statutVisiteEntity = await manager.save(statutVisiteEntity);
    return statutVisiteEntity;
  }

  //Fonction changer statut
  async confirmerVisite(manager: EntityManager, statutVisite: any) {
    //recuperer les informations de la table statutVisite pour pouvoir effectuer
    //les actions dessus.
    //le nouveau etat de statut qui sera créer aura pour actif:0
    let statutVisiteEntity = new StatutVisiteEntity({
      ...statutVisite,
      statut: 7

    });
    //recuperer les informations de la table visite partant de l'id de la visite
    //qui se trouve dans la table statutVisite.
    //On recupere les visites dont l'actif = 0
    const listeVisite = await manager.find(StatutVisiteEntity, {
      where: {
        visite: statutVisite.visite,
        actif: 0,
      },
    });
    //Changer l'actif à 1 pour desactiver ce statut afin de lui attribuer un nouveau
    //qui va être enregistrer par la suite
    if (listeVisite.length > 0) {
      for (let i = 0; i < listeVisite.length; i++) {
        const statut = listeVisite[i];
        statut.actif = 1;
        await manager.save(statut);
      }
    }
    //Enregistrer les nouvelles données
    statutVisiteEntity = await manager.save(statutVisiteEntity);
    return statutVisiteEntity;
  }

  async recupererVisiteAttenteAll(manager: EntityManager) {
    const listeVisiteAttente = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut', 'employe'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .leftJoin('visite.employe', 'employe')
      .where('statutVisite.statut=1')
      .andWhere('statutVisite.actif=0')
      .andWhere('visite.geler=0')
      .getMany();
    return listeVisiteAttente;
  }

  async recupererTotalVisite(manager: EntityManager) {
    const totalVisiteEnAttente = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .where('statutVisite.statut= 1')
      .andWhere('statutVisite.actif= 0')
      .getCount();

    const totalVisiteEnValide = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .where('statutVisite.statut= 2')
      .andWhere('statutVisite.actif= 0')
      .getCount();

    const totalVisiteRejete = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .where('statutVisite.statut= 3')
      .andWhere('statutVisite.actif= 0')
      .getCount();

    const totalVisiteTermine = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .where('statutVisite.statut=4')
      .andWhere('statutVisite.actif= 0')
      .getCount();

    return {
      totalEnAttente: totalVisiteEnAttente,
      totalValide: totalVisiteEnValide,
      totalRejete: totalVisiteRejete,
      totalTermine: totalVisiteTermine,
      total:
        totalVisiteEnAttente +
        totalVisiteEnValide +
        totalVisiteRejete +
        totalVisiteTermine,
      valeur: [
        totalVisiteEnAttente,
        totalVisiteEnValide,
        totalVisiteRejete,
        totalVisiteTermine,
      ],
      libelle: ['En attente', 'Validées', 'Rejetées', 'Effectuées'],
    };
  }

  async recupererTotalVisiteEnattenteAttribue(manager: EntityManager) {
    const nomEmploye = [];
    const nombreVisiteEmploye = [];
    // Recuperer les visites selon l'employé à qui elles sont attribuées
    const totalVisiteAttribue = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite.employe', 'employe.nom', 'employe.prenom'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .leftJoin('visite.employe', 'employe')
      .addSelect('COUNT(*) AS nombreVisEmploye')
      .andWhere('statutVisite.actif=0')
      .andWhere('visite.geler=0')
      .andWhere('visite.employe IS NOT NULL')
      .groupBy('visite.employe')
      .orderBy('nombreVisEmploye', 'DESC')
      .limit(4)
      .getRawMany();

    for (let index = 0; index < totalVisiteAttribue.length; index++) {
      const element = totalVisiteAttribue[index];
      nomEmploye.push(
        element.employe_nom_usr + ' ' + element.employe_prenom_usr,
      );
      nombreVisiteEmploye.push(parseInt(element.nombreVisEmploye));
    }

    const total = nombreVisiteEmploye.reduce((acc, curreValue) => {
      return acc + parseInt(curreValue, 10);
    }, 0);

    return {
      // Recuperer les visites attribuées a un employe
      nomEmploye,
      nombreVisiteEmploye,
      total: total,
    };
  }
  
  //recherche journalière
  async rechercherByDay(manager: EntityManager, query: any) {

    const requete = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut', 'employe', 'motif.libelle', 'utilisateur'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .leftJoin('visite.employe', 'employe')
      .leftJoin('visite.utilisateur', 'utilisateur')
      .leftJoin('visite.motif', 'motif');
    if (query.utilisateurs == 'All' && query.statutVisite == 'All') {
      requete
        .where('TO_DAYS(statutVisite.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
        .andWhere('statutVisite.actif=0');
    } else if (query.statutVisite == 'All') {
      requete
        .where('TO_DAYS(statutVisite.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
        .andWhere('visite.employe=:employe', { employe: query.utilisateurs })
        .andWhere('statutVisite.actif=0');
    } else if (query.utilisateurs == 'All') {
      requete
        .where('TO_DAYS(statutVisite.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
        .andWhere('statutVisite.statut=:statut', { statut: query.statutVisite })
        .andWhere('statutVisite.actif=0');
    } else {
      requete
        .where('TO_DAYS(statutVisite.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour})
        .andWhere('statutVisite.statut=:statut', { statut: query.statutVisite })
        .andWhere('visite.employe=:employe', { employe: query.utilisateurs })
        .andWhere('statutVisite.actif=0');
    }

    const rechercherByDayAll = requete.getMany();
    return rechercherByDayAll;
  }

  async rechercherByWeek(manager: EntityManager, query: any) {

    const requete = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut', 'employe', 'motif.libelle', 'utilisateur'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .leftJoin('visite.employe', 'employe')
      .leftJoin('visite.utilisateur', 'utilisateur')
      .leftJoin('visite.motif', 'motif');
    if (query.statutVisite == 'All' && query.utilisateurs == 'All') {
      await requete
        .where(
          'TO_DAYS(statutVisite.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
          { dateDebut: query.dateDebut, dateFin: query.dateFin },
        )
        .andWhere('statutVisite.actif=0');
    } else if (query.utilisateurs == 'All') {
      await requete
        .where(
          'TO_DAYS(statutVisite.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
          { dateDebut: query.dateDebut, dateFin: query.dateFin },
        )
        .andWhere('statutVisite.statut=:statut', { statut: query.statutVisite })
        .andWhere('statutVisite.actif=0');
    } else if (query.statutVisite == 'All') {
      await requete
        .where(
          'TO_DAYS(statutVisite.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
          { dateDebut: query.dateDebut, dateFin: query.dateFin },
        )
        .andWhere('visite.employe=:employe', { employe: query.utilisateurs })
        .andWhere('statutVisite.actif=0');
    } else {
      await requete
        .where(
          'TO_DAYS(statutVisite.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
          { dateDebut: query.dateDebut, dateFin: query.dateFin },
        )
        .andWhere('statutVisite.statut=:statut', { statut: query.statutVisite })
        .andWhere('visite.employe=:employe', { employe: query.utilisateurs })
        .andWhere('statutVisite.actif=0');
    }
    const rechercherByYearAll = requete.getMany();
    return rechercherByYearAll;
  }

  async rechercherByMonth(manager: EntityManager, query: any) {

    const requete = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut', 'employe', 'motif.libelle', 'utilisateur'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .leftJoin('visite.employe', 'employe')
      .leftJoin('visite.utilisateur', 'utilisateur')
      .leftJoin('visite.motif', 'motif')
      .where('statutVisite.actif=0');
    if (query.statutVisite == 'All' && query.utilisateurs == 'All') {
      requete
        .where('EXTRACT(YEAR FROM statutVisite.dateCreation)=:annee', {
          annee: query.annee,
        })
        .andWhere('EXTRACT(MONTH FROM statutVisite.dateCreation)=:mois', {
          mois: query.mois,
        })
        .andWhere('statutVisite.actif=0');
    } else if (query.utilisateurs == 'All') {
      requete
        .where('EXTRACT(YEAR FROM statutVisite.dateCreation)=:annee', {
          annee: query.annee,
        })
        .andWhere('EXTRACT(MONTH FROM statutVisite.dateCreation)=:mois', {
          mois: query.mois,
        })
        .andWhere('statutVisite.statut=:statut', { statut: query.statutVisite })
        .andWhere('statutVisite.actif=0');
    } else if (query.statutVisite == 'All') {
      requete
        .where('EXTRACT(YEAR FROM statutVisite.dateCreation)=:annee', {
          annee: query.annee,
        })
        .andWhere('EXTRACT(MONTH FROM statutVisite.dateCreation)=:mois', {
          mois: query.mois,
        })
        .andWhere('visite.employe=:employe', { employe: query.utilisateurs })
        .andWhere('statutVisite.actif=0');
    } else {
      requete
        .where('EXTRACT(YEAR FROM statutVisite.dateCreation)=:annee', {
          annee: query.annee,
        })
        .andWhere('EXTRACT(MONTH FROM statutVisite.dateCreation)=:mois', {
          mois: query.mois,
        })
        .andWhere('statutVisite.statut=:statut', { statut: query.statutVisite })
        .andWhere('visite.employe=:employe', { employe: query.utilisateurs })
        .andWhere('statutVisite.actif=0');
    }
    const rechercherByMonthAll = requete.getMany();
    return rechercherByMonthAll;
  }

  async rechercherByYear(manager: EntityManager, query: any) {

    const requete = await manager
      .createQueryBuilder(VisiteEntity, 'visite')
      .select(['visite', 'statutVisite', 'statut', 'employe', 'motif.libelle', 'utilisateur'])
      .leftJoin('visite.statutVisite', 'statutVisite')
      .leftJoin('statutVisite.statut', 'statut')
      .leftJoin('visite.employe', 'employe')
      .leftJoin('visite.utilisateur', 'utilisateur')
      .leftJoin('visite.motif', 'motif')
      .where('statutVisite.actif=0');
    if (query.utilisateurs == 'All' && query.statutVisite == 'All') {
      requete
        .where('EXTRACT(YEAR FROM statutVisite.dateCreation)=:annee', {
          annee: query.annee,
        })
        .andWhere('statutVisite.actif=0');
    } else if (query.statutVisite == 'All') {
      requete
        .where('EXTRACT(YEAR FROM statutVisite.dateCreation)=:annee', {
          annee: query.annee,
        })
        .andWhere('visite.employe=:employe', { employe: query.utilisateurs })
        .andWhere('statutVisite.actif=0');
    } else if (query.utilisateurs == 'All') {
      requete
        .where('EXTRACT(YEAR FROM statutVisite.dateCreation)=:annee', {
          annee: query.annee,
        })
        .andWhere('statutVisite.statut=:statut', { statut: query.statutVisite })
        .andWhere('statutVisite.actif=0');
    } else {
      requete
        .where('EXTRACT(YEAR FROM statutVisite.dateCreation)=:annee', {
          annee: query.annee,
        })
        .andWhere('statutVisite.statut=:statut', { statut: query.statutVisite })
        .andWhere('visite.employe=:employe', { employe: query.utilisateurs })
        .andWhere('statutVisite.actif=0');
    }
    const rechercherByYearAll = requete.getMany();
    return rechercherByYearAll;
  }
}
