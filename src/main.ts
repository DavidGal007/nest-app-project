import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Online Shop')
    .setDescription('The shop API description')
    .setVersion('1.0.0')
    .addTag('sushi')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/doc', app, document);
    await app.listen(PORT, () => {
    console.log(`Server start! ${PORT}`);
    
  });
}
bootstrap();
