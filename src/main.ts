import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketGateway } from './gateway/socket.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for WebSocket connections
  const server = await app.listen(3000);

  const socketGateway = app.get(SocketGateway);
  socketGateway.server = server;
}
bootstrap();
