import { ModuleDroitEntity } from '../../database/module-droit/module-droit.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ModuleEntity } from 'src/database/module/module.entity';

@Injectable()
export class ModuleDroitMetierService {

    async saveModule(manager: EntityManager, module: any){

        // On insère l'module et on recupére les informations
        const moduleEntity = new ModuleEntity({
            ...module
        });
        const modules = await manager.save(moduleEntity);

        if (module.droitsAjouter) {
            
            // On parcours la liste des droits sélectionnés pour le module ajouter
            for (let indexDroit = 0; indexDroit < module.droitsAjouter.length; indexDroit ++) {
                const droitAjouter = module.droitsAjouter[indexDroit];
                
                // On lie le droit à la lisaion module (affectation de droits à un module)
                const moduledroitEntity = new ModuleDroitEntity({
                    id: null,
                    module : modules,
                    droit: droitAjouter.id,
                    dateCreation: new Date().toDateString(),
                    geler: 0,
                    idusrcreation: 1,
                })

                 await manager.save(moduledroitEntity);
            }
        }
       
        if(module.droitsRetirer) {
        
            // On parcours la liste des droits a retirés du module
            for (let indexDroit = 0; indexDroit < module.droitsRetirer.length; indexDroit++) {
                const droitRetirer = module.droitsRetirer[indexDroit];
                
                // On supprime la liaison utilisateur-module
                await manager.delete(ModuleDroitEntity, droitRetirer.idModuleDroit);                
            }
        }

        return modules;
    }
}