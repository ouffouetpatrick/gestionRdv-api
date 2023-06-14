import { ResetPasswordDto } from './dto/reset-password.dto';
// import { MailService } from './../mail/mail.service';
import { UtilisateurEntity } from './../database/utilisateur/utilisateur.entity';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { Injectable, InternalServerErrorException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilisateurService } from 'src/database/utilisateur/utilisateur.service';
import * as bcrypt from 'bcrypt'
import moment from 'moment';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {

    clientApiUrl = "http://localhost:4200";

    constructor(
        private utilisateurService: UtilisateurService,
        // private mailService: MailService,
        private readonly jwtService: JwtService,
    ) { }

    createAuthentificationToken(id) {
        return this.jwtService.sign({ id });
    }

    getExpirationTime() : Date {
        const now = new Date();
        const addDays = 1;

        now.setTime(now.getTime() + (addDays * 24 * 60 * 60 * 1000));

        return now;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.utilisateurService.findByEmail(username);

        // const isMatch = await bcrypt.compare(pass, user.motDePasse)
        if (user && user.motDePasse === pass) {
            const { motDePasse, ...result } = user;
            return result;
        }
        return null;
    }

    async login(authCredentialDto: AuthCredentialDto) {
        
        // const user = await this.utilisateurService.findByEmail(authCredentialDto.email);
        const userRequete = await this.utilisateurService.find({email: authCredentialDto.email})
        const user = userRequete[0];

        // if (!user || user.motDePasse != authCredentialDto.motDePasse) {
        //     throw new UnauthorizedException('Login ou mot de passe incorrecte');
        // }

        // try {
        //     const { motDePasse, ...utilisateur } = user;

            // return {
            //     user : user,
            //     token_type: "Bearer",
            //     expire_at: this.getExpirationTime(),
            //     access_token: this.createAuthentificationToken(user.id)
            // };

        // } catch (error) {    

        //     throw new InternalServerErrorException("Une erreur est survenue");
        // }

        if (!user || user.motDePasse != authCredentialDto.password) {
            // throw new UnauthorizedException('Login ou mot de passe incorrecte');
            return { etat: 'warning', 
                     message: 'login ou mot de passe incorrect', 
                     data: null
                    }
        } else {
            return { etat: 'succes', 
                     message: 'connecté', 
                     data:
                        {
                            user : user,
                            token_type: "Bearer",
                            expire_at: this.getExpirationTime(),
                            access_token: this.createAuthentificationToken(user.id)
                        }
                    }
            }
        
    }

    async getProfile(user: UtilisateurEntity) {
        const { motDePasse, ...utilisateur } = user;

        return utilisateur;
    }

    async logout(user: UtilisateurEntity){
        const { motDePasse, ...utilisateur } = user;
        
        return {
            utilisateur,
            message: "utilisateur déconnecté avec succès"
        }
    }

    async forgotmotDePasse(forgotPasswordDto: ForgotPasswordDto){
        const user = await this.utilisateurService.findByEmail(forgotPasswordDto.email);
        
        if (!user) {
            throw new BadRequestException('Email invalide');
        }
        
        try {
            const token = this.createAuthentificationToken(user.id);
            const forgotLink = `${this.clientApiUrl}/auth/reinitialiser-mot-passe?token=${token}`;

            // const result = await this.mailService.sendForgotPasswordEmail(user, forgotLink)
            
            return {
                message: "Email de vérification envoyé avec succès"
            } 

        } catch (error) {
            
            throw new InternalServerErrorException("Une erreur est survenue");
        }
    }

    async changemotDePasse(resetPasswordDto: ResetPasswordDto, user: UtilisateurEntity, manager: EntityManager){
        
        if(resetPasswordDto.password != resetPasswordDto.passwordConfirm){
            throw new BadRequestException('Les mots de passe ne correspondent pas');
        }
        
        user.motDePasse = resetPasswordDto.password;

        user = await manager.save(user);

        return {
            message: "mot de passe changé avec succès"
        }
    }
}
