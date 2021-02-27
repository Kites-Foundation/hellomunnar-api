import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Users from '../entities/users.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import * as AuthValidator from 'google-auth-library';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class GoogleService {
  private logger = new Logger('Google Service');
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(token: String): Promise<any> {
    try {
      const tokenVerifier = async (token) => {
        const verify = async () => {
          const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
          const client = new AuthValidator.OAuth2Client(CLIENT_ID);
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
          });
          const payload = ticket.getPayload();
          return payload;
        };
        return verify().catch(() => {
          console.log('invalid token');
        });
      };

      const result = await tokenVerifier(token);
      if (result) {
        const user = await this.userRepository.findOne({
          email: result.email,
        });

        if (!user) {
          const googleDto: any = {};
          googleDto.name = result.name;
          googleDto.email = result.email;
          googleDto.password = await bcrypt.hash(token, 10);
          googleDto.googleImageUrl = result.picture;
          googleDto.uuid = uuidv4();
          googleDto.status = 'ACTIVE';
          googleDto.type = 'USER';

          const saveUser = await this.userRepository.save(googleDto);
          const { ...savedUser } = saveUser;

          const { email, id } = saveUser;
          const payload = { email, id };
          delete savedUser.password;
          delete savedUser.token;

          return {
            success: true,
            status: 200,
            access_token: this.jwtService.sign(payload),
            user: savedUser,
          };
        } else {
          const { email, id } = user;
          user.googleImageUrl = result.picture;
          await this.userRepository.save(user);
          const payload = { email, id };
          delete user.password;
          delete user.token;
          return {
            success: true,
            status: 200,
            access_token: await this.jwtService.sign(payload),
            user: user,
          };
        }
      } else {
        return {
          success: false,
          message: 'Invalid token...!',
        };
      }
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
        message: 'Something went wrong..! Registration failed.',
      };
    }
  }
}
