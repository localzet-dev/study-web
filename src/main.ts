import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        credentials: true,
        origin: [
            "http://localhost:3000",
            "https://study-web-front.localzet.com"
        ]
    });
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
