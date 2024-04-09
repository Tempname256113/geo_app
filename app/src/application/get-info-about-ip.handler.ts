import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Lookup, lookup } from 'geoip-lite';
import { NotFoundException } from '@nestjs/common';

export class GetInfoAboutIpCommand {
  constructor(public readonly ip: string) {}
}

export type InfoAboutIpType = {
  lat: number;
  lng: number;
  country: string;
  city: string;
};

@CommandHandler(GetInfoAboutIpCommand)
export class GetInfoAboutIpHandler
  implements ICommandHandler<GetInfoAboutIpCommand, InfoAboutIpType>
{
  // здесь promise потому что реализовывая интерфейс ICommandHandler execute должен вернуть promise
  async execute(data: GetInfoAboutIpCommand): Promise<InfoAboutIpType> {
    const providedIp: string = data.ip;

    try {
      const infoAboutIp: Lookup = lookup(providedIp);

      return {
        lat: infoAboutIp.ll[0],
        lng: infoAboutIp.ll[1],
        country: infoAboutIp.country,
        city: infoAboutIp.city,
      };
    } catch (err) {
      throw new NotFoundException('Not found info about provided ip');
    }
  }
}
