import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UtilisateurProfilEntity } from 'src/database/utilisateur-profil/utilisateur-profil.entity';
import { VisiteEntity } from 'src/database/visite/visite.entity';
import { StatutVisiteEntity } from 'src/database';

@Injectable()
export class UtilisateurProfilMetierService {
    constructor() { }

    // Recuperer la liste des utilisateur ayant le profil 2 (employé)
    // Et pour chaque employé afficher afficher le nombre ses visite en attente
    async recupererListeEmployeAndNbrVisite(manager: EntityManager) {
        // Sous-requête pour recuperer le nombre de visite en attente par utilisateur
        const nbrVisiteAttente = await manager.createQueryBuilder(VisiteEntity, "visite")
        .select([
            "visite.employe",
        ])

        .addSelect("COUNT(visite.id)", "nbrVisite")
        .leftJoin('visite.statutVisite', 'statutVisite')
        .leftJoin('statutVisite.statut', 'statut')
        .where("statutVisite.statut=1")
        .andWhere("statutVisite.actif=0")
        .groupBy("visite.employe")

        //requete principale, la liste des utilisateurs.
        //Pour chaque utilisateurs on lui associe son nombre de visite 
        //(en attente trouvée dans la sous requête)
        const ListeEmployeAndNbrVisite = await manager.createQueryBuilder(UtilisateurProfilEntity, "utilisateurProfil")
            .select([
                "utilisateur.id",
                "utilisateur.nom",
                "utilisateur.prenom"
            ])
            .leftJoin("utilisateurProfil.utilisateur", "utilisateur")
            .leftJoin("utilisateurProfil.profil", "profil")
            .leftJoinAndSelect("("+nbrVisiteAttente.getQuery()+")","visite","visite.idusr_vis = utilisateurProfil.utilisateur")
            .andWhere("utilisateurProfil.profil=2")
            .groupBy('utilisateurProfil.utilisateur')
            .getRawMany()
        return ListeEmployeAndNbrVisite ;
        
    }

    async recupererListeEmploye(manager: EntityManager) {
        const ListeEmploye = await manager.createQueryBuilder(UtilisateurProfilEntity, "utilisateurProfil")
            .select([
                "utilisateurProfil",
                "utilisateur.id",
                "utilisateur.nom",
                "utilisateur.prenom",
                "profil.id"
            ])
            .leftJoin("utilisateurProfil.utilisateur", "utilisateur")
            .leftJoin("utilisateurProfil.profil", "profil")
            .where("utilisateurProfil.profil=2")
            .getMany()

        return ListeEmploye ;
        
    }
}

