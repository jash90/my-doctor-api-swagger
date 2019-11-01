import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('MyDoctor API')
        .setLicense('MIT License','ttps://opensource.org/licenses/MIT')
        .setContactEmail('makrzywd@metal.agh.edu.pl')
        .setDescription('API Documentation')
        .setVersion('1.1')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentation', app, document);
}
