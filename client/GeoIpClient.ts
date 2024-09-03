export class GeoIpClient {
  private readonly apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getGeoDataByIp(ip: string){
    const response = await fetch(`${this.apiUrl}?ip=${ip}`);

    const responseStatus = response.status;

    switch (responseStatus) {
      case 200:
        return response.json();
      case 400:
        throw new Error('Invalid IP format');
      case 404:
        throw new Error('No data found for this IP');
      case 500:
        throw new Error('Server error');
      default:
        throw new Error('Unhandled error')
    }
  }
}