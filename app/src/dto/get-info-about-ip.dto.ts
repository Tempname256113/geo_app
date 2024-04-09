import { IsIP } from 'class-validator';

export class GetInfoAboutIpDto {
  @IsIP()
  ip: string;
}
