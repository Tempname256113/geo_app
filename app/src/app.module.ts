import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetInfoAboutIpUsecase } from './application/GetInfoAboutIp.usecase';

const commandHandlers = [GetInfoAboutIpUsecase];

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [...commandHandlers],
})
export class AppModule {}
