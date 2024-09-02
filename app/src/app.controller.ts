import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetInfoAboutIpDto } from './dtos/GetInfoAboutIp.dto';
import { CommandBus } from '@nestjs/cqrs';
import {
  GetInfoAboutIpCommand,
  InfoAboutIpType,
} from './application/GetInfoAboutIp.usecase';

@Controller()
export class AppController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getInfoAboutIp(@Query() { ip }: GetInfoAboutIpDto): Promise<InfoAboutIpType> {
    return this.commandBus.execute(new GetInfoAboutIpCommand(ip));
  }
}
