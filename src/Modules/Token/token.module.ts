import {forwardRef, Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Token} from '../../Entity/token.entity';
import {UserModule} from '../User/user.module';
import {UserService} from '../User/user.service';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';

const jwtFactory = {
    imports: [ConfigModule],
    useFactory: () => ({
        secret: process.env.JWT_SECRET,
        global: true,
        signOptions: {
            expiresIn: process.env.JWT_EXP_H
        }
    }),
    inject: [ConfigService],
};

@Module({
    providers: [TokenService],
    imports: [TypeOrmModule.forFeature([Token]),
        forwardRef(() => UserModule),
        JwtModule.registerAsync(jwtFactory)],
    exports: [TokenService]
})


export class TokenModule {
}