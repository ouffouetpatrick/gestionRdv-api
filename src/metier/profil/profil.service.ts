import { TemplateProfilEntity } from './../../database/template-profil/template-profil.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ProfilEntity } from 'src/database/profil/profil.entity';

@Injectable()
export class ProfilMetierService {

    async saveProfil(manager: EntityManager, profil: any) {

        // On insère le profil et on recupére les informations
        let profilEntity = new ProfilEntity({
            ...profil
        });
        profilEntity = await manager.save(profilEntity);

        if (profil.modulesAjouter && profil.modulesAjouter.length > 0) {

            // On parcours la liste des modules ajouter pour definir les modules supplémentaires du profil
            for (let indexModule = 0; indexModule < profil.modulesAjouter.length; indexModule++) {
                const moduleAjouter = profil.modulesAjouter[indexModule];

                // Si des droits sont sélectionnées pour ce module
                if (moduleAjouter.droitsAjouter && moduleAjouter.droitsAjouter.length > 0) {

                    // On parcours la liste des droits sélectionnés pour le module ajouter 
                    for (let indexDroit = 0; indexDroit < moduleAjouter.droitsAjouter.length; indexDroit++) {
                        const droitAjouter = moduleAjouter.droitsAjouter[indexDroit];

                        // On crée une liaison profil-module et on récupère ses informations
                        let templateProfilEntity = new TemplateProfilEntity({
                            id: null,
                            profil: profilEntity,
                            module: moduleAjouter.id,
                            droit: droitAjouter.id,
                            dateCreation: new Date().toDateString(),
                            geler: 0,
                            idusrcreation: 1,
                        })
                        templateProfilEntity = await manager.save(templateProfilEntity);
                    }
                }
                //sinon on ajoute le module sans droit
                else {
                    // On crée une liaison profil-module et on récupère ses informations
                    let templateProfilEntity = new TemplateProfilEntity({
                        id: null,
                        profil: profilEntity,
                        module: moduleAjouter.id,
                        droit: null,
                        dateCreation: new Date().toDateString(),
                        geler: 0,
                        idusrcreation: 1,
                    })
                    templateProfilEntity = await manager.save(templateProfilEntity);
                }
            }
        }

        if (profil.modulesRetirer  && profil.modulesRetirer.length > 0) {

            // On parcours la liste des modules retirés du profil(templateProfil)
            for (let indexModule = 0; indexModule < profil.modulesRetirer.length; indexModule++) {
                const moduleRetirer = profil.modulesRetirer[indexModule];

                // On récupère la liste des templateprofil retirer et on les supprime
                const listeTemplateProfil = await manager.find(TemplateProfilEntity, {
                    where: {
                        profil: profilEntity,
                        module: moduleRetirer.id
                    },
                });
                const ids = listeTemplateProfil.map(x => x.id)
                await manager.delete(TemplateProfilEntity, ids)

                // On supprime la liaison profil-module(templateprofil)
                // await manager.delete(TemplateProfilEntity, moduleRetirer.idProfilModule);
            }
        }


        if(profil.modulesModifier && profil.modulesModifier.length > 0) {
            
            // On parcours la liste des modules modifiés de le profil
            for (let indexModule = 0; indexModule < profil.modulesModifier.length; indexModule++) {
                const moduleModifier = profil.modulesModifier[indexModule];


                if(moduleModifier.droitsAjouter && moduleModifier.droitsAjouter.length > 0 ) {
                    
                    // On parcours la liste des droits sélectionnés pour la liaison profil-module
                    for (let indexDroit = 0; indexDroit < moduleModifier.droitsAjouter.length; indexDroit ++) {
                        const droitAjouter = moduleModifier.droitsAjouter[indexDroit];

                        // On lie le droit à la lisaion profil-module (affectation de droits à un profil pour un module)
                        const templateProfilEntity = new TemplateProfilEntity({
                            id: null,
                            profil: profilEntity,
                            module : moduleModifier.id,
                            droit: droitAjouter.id,
                            dateCreation: new Date().toISOString(),
                            geler: 0,
                            idusrcreation: 1,
                        })

                        await manager.save(templateProfilEntity);
                    }
                }

                if(moduleModifier.droitsRetirer && moduleModifier.droitsRetirer.length > 0) {

                    // On parcours la liste des droits retirés pour la liaison profil-module
                    const ids = moduleModifier.droitsRetirer.map(x => x.idTemplateProfil)

                    // On retire le droit à la lisaion profil-module (retrait de droits du profil pour un module)
                    await manager.delete(TemplateProfilEntity, ids);

                }
            }
        }

        return profilEntity;
    }
}



 // if (profil.modulesRetirer.droitsRetirer) {

                //     // On parcours la liste des droits retirés pour la liaison profil-module
                //     const ids = profil.modulesRetirer.droitsRetirer.map(x => x.id)
    
                //     // On retire le droit à la lisaion profil-module (retrait de droits du profil pour un module)
                //     await manager.delete(TemplateProfilEntity, ids);
    
                // }
