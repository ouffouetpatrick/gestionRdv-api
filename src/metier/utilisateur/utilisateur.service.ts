import { ModuleEntity } from './../../database/module/module.entity';
import { UtilisateurModuleDroitEntity } from './../../database/utilisateur-module-droit/utilisateur-module-droit.entity';
import { UtilisateurProfilEntity } from './../../database/utilisateur-profil/utilisateur-profil.entity';
import { TemplateProfilEntity } from './../../database/template-profil/template-profil.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UtilisateurEntity } from 'src/database/utilisateur/utilisateur.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UtilisateurMetierService {

    async saveUtilisateur(manager: EntityManager, utilisateur: any){
        console.log('utilisateur',utilisateur)
        // On insère l'utilisateur et on recupére les informations
        let utilisateurEntity = new UtilisateurEntity({
            id: null,
            ...utilisateur
        });

        // const saltOrRounds = 10;
        // const hash = await bcrypt.hash(utilisateurEntity.motDePasse, saltOrRounds);
        // utilisateurEntity.motDePasse = hash
        
        utilisateurEntity = await manager.save(utilisateurEntity);

        if(utilisateur.profils){
            // for (let index = 0; index < utilisateur.profils.length; index++) {
                const profil = utilisateur.profils.id;
                let utilisateurProfilEntity = new UtilisateurProfilEntity({
                    id: null,
                    dateCreation: new Date().toDateString(),
                    geler: 0,
                    idusrcreation: 1,
                    profil,
                    utilisateur: utilisateurEntity
                });
                utilisateurProfilEntity = await manager.save(utilisateurProfilEntity);

                console.log('utilisateurProfilEntity',utilisateurProfilEntity)

                const listeTemplateProfil = await manager.find(TemplateProfilEntity, {
                    where: { profil: profil },
                    relations: ["module", "droit"]
                });

                let listeUtilisateurModuleDroitEntity = [];
                for (let indexTemplate = 0; indexTemplate < listeTemplateProfil.length; indexTemplate++) {
                    const templateProfil = listeTemplateProfil[indexTemplate];
                    
                    const utilisateurModuleDroitEntity = new UtilisateurModuleDroitEntity({
                        id: null,
                        dateCreation: new Date().toDateString(),
                        geler: 0,
                        idusrcreation: 1,
                        templateProfil: templateProfil.id,
                        utilisateur: utilisateurEntity,
                        module: templateProfil.module,
                        droit: templateProfil.droit,
                    });

                    listeUtilisateurModuleDroitEntity = [...listeUtilisateurModuleDroitEntity, utilisateurModuleDroitEntity]
                }

                await manager.save(listeUtilisateurModuleDroitEntity);
            }
        // }

        return utilisateurEntity;
    }

    async updateUtilisateur(manager: EntityManager, utilisateur: any){
        
        // On insère l'utilisateur et on recupére les informations
        let utilisateurEntity = new UtilisateurEntity({
            ...utilisateur
        });
        utilisateurEntity = await manager.save(utilisateurEntity);

        if (utilisateur.modulesAjouter && utilisateur.modulesAjouter.length > 0) {

            // On parcours la liste des modules ajouter pour definir les modules supplémentaires du utilisateur
            for (let indexModule = 0; indexModule < utilisateur.modulesAjouter.length; indexModule++) {
                const moduleAjouter = utilisateur.modulesAjouter[indexModule];

                // Si des droits sont sélectionnées pour ce module
                if (moduleAjouter.droitsAjouter && moduleAjouter.droitsAjouter.length > 0) {

                    // On parcours la liste des droits sélectionnés pour le module ajouter 
                    for (let indexDroit = 0; indexDroit < moduleAjouter.droitsAjouter.length; indexDroit++) {
                        const droitAjouter = moduleAjouter.droitsAjouter[indexDroit];

                        // On crée une liaison utilisateur-module et on récupère ses informations
                        let utilisateurModuleDroitEntity = new UtilisateurModuleDroitEntity({
                            id: null,
                            utilisateur: utilisateurEntity,
                            module: moduleAjouter.id,
                            droit: droitAjouter.id,
                            dateCreation: new Date().toDateString(),
                            geler: 0,
                            idusrcreation: 1,
                        })
                        utilisateurModuleDroitEntity = await manager.save(utilisateurModuleDroitEntity);
                    }
                }
                //sinon on ajoute le module sans droit
                else {
                    // On crée une liaison profil-module et on récupère ses informations
                    let utilisateurModuleDroitEntity = new UtilisateurModuleDroitEntity({
                        id: null,
                        utilisateur: utilisateurEntity,
                        module: moduleAjouter.id,
                        droit: null,
                        dateCreation: new Date().toDateString(),
                        geler: 0,
                        idusrcreation: 1,
                    })
                    utilisateurModuleDroitEntity = await manager.save(utilisateurModuleDroitEntity);
                }
            }
        }

        if (utilisateur.modulesRetirer  && utilisateur.modulesRetirer.length > 0) {

            // On parcours la liste des modules retirés du de l'utilisateurs module droit(utilisateurmoduledroit)
            for (let indexModule = 0; indexModule < utilisateur.modulesRetirer.length; indexModule++) {
                const moduleRetirer = utilisateur.modulesRetirer[indexModule];

                // On récupère la liste des utilisateurmoduledroit retirer et on les supprime
                const listeUtilisateurModuleDroit = await manager.find(UtilisateurModuleDroitEntity, {
                    where: {
                        utilisateur: utilisateurEntity,
                        module: moduleRetirer.id
                    },
                });
                const ids = listeUtilisateurModuleDroit.map(x => x.id)
                await manager.delete(UtilisateurModuleDroitEntity, ids)

                // On supprime la liaison utilisateurs module droit(utilisateurmoduledroit)
                // await manager.delete(UtilisateurModuleDroitEntity, moduleRetirer.idUtilisateurModule);
            }
        }

        if(utilisateur.modulesModifier && utilisateur.modulesModifier.length > 0) {
            
            // On parcours la liste des modules modifiés de l'utilisateur
            for (let indexModule = 0; indexModule < utilisateur.modulesModifier.length; indexModule++) {
                const moduleModifier = utilisateur.modulesModifier[indexModule];

                if(moduleModifier.droitsAjouter && moduleModifier.droitsAjouter.length > 0 ) {
                    
                    // On parcours la liste des droits sélectionnés pour la liaison l'utilisateur-module
                    for (let indexDroit = 0; indexDroit < moduleModifier.droitsAjouter.length; indexDroit ++) {
                        const droitAjouter = moduleModifier.droitsAjouter[indexDroit];

                        // On lie le droit à la lisaion utilisateur-module (affectation de droits à un utilisateur pour un module)
                        const utilisateurModuleDroitEntity = new UtilisateurModuleDroitEntity({
                            id: null,
                            utilisateur: utilisateurEntity,
                            module : moduleModifier.id,
                            droit: droitAjouter.id,
                            dateCreation: new Date().toISOString(),
                            geler: 0,
                            idusrcreation: 1,
                        })

                        await manager.save(utilisateurModuleDroitEntity);
                    }
                }

                if(moduleModifier.droitsRetirer && moduleModifier.droitsRetirer.length > 0) {

                    // On parcours la liste des droits retirés pour la liaison utilisateur-module
                    const ids = moduleModifier.droitsRetirer.map(x => x.idUtilisateurModuleDroit)

                    // On retire le droit à la lisaion profil-module (retrait de droits de l'utilisateurs pour un module)
                    await manager.delete(UtilisateurModuleDroitEntity, ids);

                }
            }
        }

        return utilisateurEntity;
    }

    async navigation(manager: EntityManager, utilisateur: UtilisateurEntity) {

        const utilisateurModuleDroit = await manager.find(UtilisateurModuleDroitEntity, {
            where: {utilisateur: utilisateur},
            relations:[
                "droit",
                "module",
                "module.moduleParent",
                "module.sousModules",
            ],
        });

        const listeModuleDroitAttribuer = await this.getModuleEtDroitAttribuer(utilisateurModuleDroit);
        listeModuleDroitAttribuer.sort((a, b) => {return a.ordre-b.ordre})
        
        const navigation = await this.createNavigation(listeModuleDroitAttribuer);

        return {default:navigation};
    }

    private async getModuleEtDroitAttribuer(ListeUtilisateurModuleDroit: UtilisateurModuleDroitEntity[]){
        let moduleTemp = []
        let modules: ModuleEntity[] = [];

        // On parcours le tableau des utilisateurModuleDroits profil
        for (let indexUtilisateurModuleDroit = 0; indexUtilisateurModuleDroit < ListeUtilisateurModuleDroit.length; indexUtilisateurModuleDroit++) {

            const utilisateurModuleDroit = ListeUtilisateurModuleDroit[indexUtilisateurModuleDroit];
            
            // Si le module n'est pas déja traité
            if(utilisateurModuleDroit.module && !moduleTemp.includes(utilisateurModuleDroit.module.id)){

                let droits = [] //Liste des droits pour ce module

                // ajout du module à la liste des traités
                moduleTemp = [...moduleTemp, utilisateurModuleDroit.module.id]

                let droitTemp = [] // liste des id des droits déja traités
                
                // On récupère la liste des droits séléctionnées du modules 
                const listeTemplateDroit = ListeUtilisateurModuleDroit.filter(temp => temp.module.id == utilisateurModuleDroit.module.id)

                // On parcours le liste des droits séléctionnées du modules 
                for (let indexTemplateDroit = 0; indexTemplateDroit < listeTemplateDroit.length; indexTemplateDroit++) {
                    const userModuleDroit = listeTemplateDroit[indexTemplateDroit];

                    // si le droit n'est pas déja traité
                    if (userModuleDroit.droit && !droitTemp.includes(userModuleDroit.droit.id)) {
                        // ajout du module à la liste des traités
                        droitTemp = [...droitTemp, userModuleDroit.droit.id]

                        droits = [...droits, userModuleDroit.droit]
                    }
                    
                }
                                
                // Formatage du module avec ajout de la colonne isCheck au droit selectionné
                const moduleAttribuer = {
                    ...utilisateurModuleDroit.module,

                    droits: droits
                }
                modules = [...modules, moduleAttribuer]

            }
        }
        
        return modules;
    }

    private async createNavigation(listeModuleDroitAttribuer: ModuleEntity[]) {

        let navigation: any[] = []
        let children: any[] = []

        const modulesParent: ModuleEntity[] = listeModuleDroitAttribuer.filter(module => module.moduleParent == null);
        for (let i = 0; i < modulesParent.length; i++) {

            const moduleParent = modulesParent[i];

            const sousModules = listeModuleDroitAttribuer.filter(
                module => (module.moduleParent != null && module.moduleParent.id == moduleParent.id)
            );                

            let child = {
                id: moduleParent.id,
                title: moduleParent.libelle,
                type: (moduleParent.sousModules.length >0) ? 'collapsable' : "basic",
                link: (moduleParent.sousModules.length >0) ? null : moduleParent.lien,
                icon: moduleParent.icone,
                children: sousModules.map(sousModule => {
                    return {
                        id: sousModule.id,
                        title: sousModule.libelle,
                        type: 'basic',
                        link: sousModule.lien,
                        icon: sousModule.icone,
                        exactMatch: false
                    }
                })
            }
                
            children = [...children, child]
            
        }   
        
        return children;
    }

    async getLastUtilisateur(manager: EntityManager) {
        let lastFiveUtilisateur: any[] = []
        const listeUtilisateur = await manager.createQueryBuilder(UtilisateurEntity, "utilisateur")
            .select([
                "utilisateur",
                "utilisateurProfil",
                "profil"
            ])
            .leftJoin("utilisateur.utilisateurProfil", "utilisateurProfil")
            .leftJoin("utilisateurProfil.profil", "profil")
            .where('utilisateur.geler=0')
            .orderBy("utilisateur.id", "DESC")
            .getMany()

        for (let i = 0; i < 5; i++) {
            lastFiveUtilisateur.push(listeUtilisateur[i])
        }

        return lastFiveUtilisateur;
    }
}

