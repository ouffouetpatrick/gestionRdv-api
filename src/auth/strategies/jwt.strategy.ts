import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UtilisateurEntity } from 'src/database/utilisateur/utilisateur.entity';
import { getConnection } from 'typeorm';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      // passReqToCallback: true
    });
  }

  async validate(payload: any) {    
    const { id } = payload;

    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    // establish real database connection using our new query runner
    
    await queryRunner.connect();
    const utilisateur = await queryRunner.manager.findOne<UtilisateurEntity>(UtilisateurEntity, id);

    if (!utilisateur) {
      throw new UnauthorizedException();
    }

   await queryRunner.release();

    return utilisateur;
  }
}