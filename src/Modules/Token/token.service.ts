import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Token} from '../../Entity/token.entity';
import {Repository} from 'typeorm';
import {UserService} from '../User/user.service';
import {JwtService} from '@nestjs/jwt';
import {use} from 'passport';


@Injectable()
export class TokenService {
    constructor(@InjectRepository(Token)

                private tokenRepository: Repository<Token>,
                @Inject(forwardRef(() => UserService))
                private userService: UserService,
                private jwtService: JwtService) {
    }

    async generateToken(email: string) {
        console.log('token123')
        const payload = {email: email};
        const token = {
           access: await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '20m'
            })
        }


        console.log('test')
//         console.log( process.env.JWT_EXP_H);
//         const payload = { email };
//
//         const token =await this.jwtService.signAsync(payload, {
//             secret: process.env.JWT_REFRESH_SECRET,
//             expiresIn: '20m'
//         });
        console.log(token)
        return token
    }

    async createToken(email: string) {
        const user = await this.userService.getUserByEmail(email)


        const token = await this.generateToken(email)
        console.log(token)
        // return await this.tokenRepository.save({refreshToken: token.refresh_token})


    }

    async findToken() {
    }

    async refreshToken() {
    }
}