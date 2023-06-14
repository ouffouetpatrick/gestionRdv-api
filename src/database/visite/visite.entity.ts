import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from '../../core/shared/systems/default.entity';
import { MotifEntity } from '../motif/motif.entity';
import { StatutVisiteEntity } from '../statut-visite/statut-visite.entity';
import { UtilisateurEntity } from '../utilisateur/utilisateur.entity';
@Entity('visite_vis')
@Index('fx_idusrcreation_idx', ['idusrcreation'])
export class VisiteEntity { 
 
  @PrimaryGeneratedColumn (DefaultEntity.convertDataType({ type: 'integer', name:'id_vis', length: 11, scale: 0, primary:true, nullable: false, unique: true  }))
  id : number;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'date_vis', length: 100, scale: 0, nullable: false, unique: false  }))
  date : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'heure_vis', length: 255, scale: 0, nullable: false, unique: false  }))
  heure : string; 

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'objet_vis', length: 255, scale: 0, nullable: false, unique: false  }))
  objet : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty1_vis', length: 100, scale: 0, nullable: true, unique: false  }))
  empty1 : string; 

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty2_vis', length: 100, scale: 0, nullable: true, unique: false  }))
  empty2 : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty3_vis', length: 100, scale: 0, nullable: true, unique: false  }))
  empty3 : string; 

  @Column (DefaultEntity.convertDataType({ type: 'integer' , name:'geler_vis', length: 100, scale: 0, nullable: false, unique: false  }))
  geler : number;

  @Column (DefaultEntity.convertDataType({ type: 'timestamp' , name:'date_creation_vis', scale: 0, nullable: false, unique: false  }))
  dateCreation : Date;

  @Column (DefaultEntity.convertDataType({ type: 'integer' , name:'idusrcreation_vis', scale: 0, nullable: true, unique: false  }))
  idusrcreation : number;

  // Recuperer les informations de l'utilisateur à partir de son id se trouvant dans le champ iduscreation
  @ManyToOne(type => UtilisateurEntity, utilisateur => utilisateur.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'idusrcreation_vis' })
  utilisateur: UtilisateurEntity;

  @ManyToOne(type => UtilisateurEntity, utilisateur => utilisateur.visite, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idusr_vis'})
  employe : UtilisateurEntity; 

  @ManyToOne(type => MotifEntity, motif => motif.visite, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'idmtf_vis'})
  motif : MotifEntity;

  @OneToMany(type => StatutVisiteEntity, statutVisite => statutVisite.visite, {onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  statutVisite : StatutVisiteEntity[];

  constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}
