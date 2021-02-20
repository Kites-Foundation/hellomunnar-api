import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import * as helmet from 'helmet';
import { RedocModule, RedocOptions } from 'nestjs-redoc/dist';
import { join } from 'path';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { getConnectionManager } from 'typeorm';
import * as rateLimit from 'express-rate-limit';
/*eslint-disable */
const Sentry = require('@sentry/node');
/*eslint-enable */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
config();
async function bootstrap() {
  try {
    const logger = new Logger('Hello Munnar');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({ origin: `${process.env.CORS}` });
    app.use(helmet.noSniff());
    app.use(helmet.referrerPolicy());
    app.use(helmet.xssFilter());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.frameguard({ action: 'sameorigin' }));
    app.use(helmet.expectCt({ maxAge: 123, enforce: true }));
    app.use(helmet.dnsPrefetchControl({ allow: false }));
    app.use(compression({ encodings: ['gzip', 'deflate'] }));
    app.use(function (req, res, next) {
      res.header('x-powered-by', 'Kites Foundation');
      next();
    });
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
      }),
    );
    app.use(
      helmet.hsts({
        maxAge: 5184000,
        includeSubDomains: true,
        preload: true,
      }),
    );
    app.disable('etag');
    app.set('trust proxy', 1);
    app.useStaticAssets(join(__dirname, '../../../public'));

    const swaggerOptions = new DocumentBuilder()
      .setTitle('HelloMunnar')
      .setDescription('HelloMunnar Project')
      .setVersion('1.0.2')
      .addTag('Kites Foundation')
      .addBearerAuth()
      .setContact(
        'HelloMunnar',
        'https://hellomunnar.in',
        'info@kitesfoundation.org',
      )
      .addServer('http://')
      .addServer('https://')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api-doc', app, swaggerDocument);

    const redocOptions: RedocOptions = {
      title: 'HelloMunnar',
      logo: {
        url: 'https://cdn.hellomunnar.in/logo.jpg',
        backgroundColor: '#F0F0F0',
        altText: 'Vibgyor Tourism Logo',
      },
      sortPropsAlphabetically: true,
      hideDownloadButton: false,
      hideHostname: false,
    };
    await RedocModule.setup('redoc', app, swaggerDocument, redocOptions);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        validationError: { target: false },
      }),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        validationError: { target: false },
      }),
    );

    const port = process.env.PORT || 4009;
    await app.listen(port);

    logger.log(`Application Listening on Port ${port} `);
    logger.log(`Api documentation available at "/api-doc/`);
    logger.log(`Api Redoc documentation available at "/redoc/`);
  } catch (e) {
    if (e.name === 'AlreadyHasActiveConnectionError') {
      return getConnectionManager().get('default');
    }
  }
}
bootstrap();
