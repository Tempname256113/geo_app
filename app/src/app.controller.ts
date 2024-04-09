import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetInfoAboutIpDto } from './dto/get-info-about-ip.dto';
import { CommandBus } from '@nestjs/cqrs';
import {
  GetInfoAboutIpCommand,
  InfoAboutIpType,
} from './application/get-info-about-ip.handler';

@Controller()
export class AppController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getInfoAboutIp(@Query() { ip }: GetInfoAboutIpDto): Promise<InfoAboutIpType> {
    return this.commandBus.execute(new GetInfoAboutIpCommand(ip));
  }
}
