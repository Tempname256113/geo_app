import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetInfoAboutIpHandler } from './application/get-info-about-ip.handler';

const commandHandlers = [GetInfoAboutIpHandler];

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [...commandHandlers],
})
export class AppModule {}
