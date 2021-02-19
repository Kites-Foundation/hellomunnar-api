import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SessionModule } from 'nestjs-session';
import { ConfigModule } from './config';
import { watchmanModule } from './watchman/watchman.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { nestMailer } from './config/constants';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ReviewsModule } from './reviews/reviews.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot('munnar'),
    CacheModule.register({
      store: redisStore,
      host: process.env.X_REDIS_HOST,
      port: process.env.X_REDIS_PORT,
    }),
    SessionModule.forRoot({
      session: {
        secret: process.env.SESSION_SECRET || 'tomahawk',
        resave: true,
        saveUninitialized: true,
        cookie: {
          maxAge: 1000 * 60 * 100,
        },
      },
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: nestMailer.transport,
        template: {
          dir: './templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    watchmanModule,
    AuthModule,
    ReviewsModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
