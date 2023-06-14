
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { StatutVisiteEntity } from 'src/database/statut-visite/statut-visite.entity';
import { UtilisateurEntity } from 'src/database/utilisateur/utilisateur.entity';
import { VisiteEntity } from 'src/database/visite/visite.entity';

@Injectable()
export class MailService {

  constructor(private mailerService: MailerService) {}

  /**
   * Mail acceptation de la requete
   * @date 07/09/2022 - 11:17:06
   *
   * @async
   * @param {UtilisateurEntity} user
   * @param {*} data
   * @returns {unknown}
   */

  // Envoie de mail aux admin pour qu'il attribut une visite à qui de droit
  async sendDemandeVisite(user: UtilisateurEntity, visite: VisiteEntity, data) {
    // const url = `example.com/auth/confirm?token=${token}`;

    return this.mailerService.sendMail({
      to: [data.resultemail],
      from: '"Support Team" <support@example.com>', // override default from
      subject: '[ORTISSAI]: Demande de rendez-vous',
      template: 'mailAttribution', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        ...data
      },
    });
  }

  /**
   * Mail acceptation de la requete
   * @date 07/09/2022 - 11:17:06
   *
   * @async
   * @param {VisiteEntity} visite
   * @param {*} data
   * @returns {unknown}
   */

  // Envoi de mail au receveur de la visite pour qu'il la valide ou pas
  async sendTraitementVisite(visite: VisiteEntity, data) {
    // const url = `example.com/auth/confirm?token=${token}`;

    return this.mailerService.sendMail({
      to: data.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: '[ORTISSAI]: Demande de rendez-vous',
      template: 'mailDemande', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        ...data
      },
    });
  }

  /**
   * Mail acceptation de la requete
   * @date 07/09/2022 - 11:17:06
   *
   * @async
   * @param {StatutVisiteEntity} statutVisite
   * @param {*} data
   * @returns {unknown}
   */

  // Envoi de mail au receveur de la visite pour qu'il la valide ou pas
  async sendValidationVisite(statutVisite: StatutVisiteEntity, data) {
    // const url = `example.com/auth/confirm?token=${token}`;

    return this.mailerService.sendMail({
      to: data.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: '[ORTISSAI]: Rendez-vous accepté',
      template: 'mailValidation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        ...data
      },
    });
  }

  /**
   * Mail acceptation de la requete
   * @date 07/09/2022 - 11:17:06
   *
   * @async
   * @param {VisiteEntity} visite
   * @param {*} data
   * @returns {unknown}
   */

  // Envoi de mail au receveur de la visite pour qu'il la valide ou pas
  async sendRejeterVisite(visite: VisiteEntity, data) {
    // const url = `example.com/auth/confirm?token=${token}`;

    return this.mailerService.sendMail({
      to: data.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: '[ORTISSAI]: Rendez-vous rejeté',
      template: 'mailRejeter', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        ...data
      },
    });
  }

  
}