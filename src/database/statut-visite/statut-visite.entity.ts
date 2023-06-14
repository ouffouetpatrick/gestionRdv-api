import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from '../../core/shared/systems/default.entity';
// import { ClientEntity } from '../client';
// import { EmployeEntity } from '../employe';
import { StatutEntity } from '../statut/statut.entity';
import { VisiteEntity } from '../visite/visite.entity';
import { UtilisateurEntity } from '../utilisateur/utilisateur.entity';
@Entity('statut_visite_stv')
@Index('fx_idusrcreation_idx', ['idusrcreation'])
export class StatutVisiteEntity {
 
  @PrimaryGeneratedColumn (DefaultEntity.convertDataType({ type: 'integer', name:'id_stv', length: 11, scale: 0, primary:true, nullable: false, unique: true  }))
  id : number;

  @Column (DefaultEntity.convertDataType({ type: 'integer', name:'actif_stv', length: 100, scale: 0, nullable: false, unique: false  }))
  actif : number; 

  @Column (DefaultEntity.convertDataType({ type: 'integer', name:'effectue_stv', length: 100, scale: 0, nullable: true, unique: false  }))
  effectue : number;
    
  @Column (DefaultEntity.convertDataType({ type: 'varchar', name:'satisfaction_stv', length: 100, scale: 0, nullable: true, unique: false  }))
  satisfaction : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar', name:'empty1_stv', length: 100, scale: 0, nullable: true, unique: false  }))
  empty1 : string; 

  @Column (DefaultEntity.convertDataType({ type: 'varchar', name:'empty2_stv', length: 100, scale: 0, nullable: true, unique: false  }))
  empty2 : string;

  @Column (DefaultEntity.convertDataType({type: 'varchar', name:'empty3_stv', length: 100, scale: 0, nullable: true, unique: false  }))
  empty3 : string;

  @Column (DefaultEntity.convertDataType({type: 'integer', name:'geler_stv', length: 100, scale: 0, nullable: false, unique: false  }))
  geler : number;

  @Column (DefaultEntity.convertDataType({ type: 'timestamp', name:'date_creation_stv', scale: 0, nullable: false, unique: false  }))
  dateCreation : Date;

  @Column (DefaultEntity.convertDataType({ type: 'integer', name:'idusrcreation_stv', scale: 0, nullable: true, unique: false  }))
  idusrcreation : number;

  // Recuperer les informations de l'utilisateur à partir de son id se trouvant dans le champ iduscreation
  @ManyToOne(type => UtilisateurEntity, utilisateur => utilisateur.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'idusrcreation_stv' })
  utilisateur: UtilisateurEntity;

  @ManyToOne(type => VisiteEntity, visite => visite.statutVisite, {  nullable: false, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idvis_stv'})
  visite : VisiteEntity;

  @ManyToOne(type => StatutEntity, statut => statut.statutVisite, {  nullable: false, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idsta_stv'})
  statut : StatutEntity;


  constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}
