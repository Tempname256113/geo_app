import { GeoIpClient } from "./GeoIpClient";

(async () => {
  const geoIpClient = new GeoIpClient('http://localhost:3001');

  try {
    const data = await geoIpClient.getGeoDataByIp('207.97.227.239') // 200 success
    // const data = await geoIpClient.getGeoDataByIp('192.168.1.1') // 404 not found
    // const data = await geoIpClient.getGeoDataByIp('node') // 400 bad request

    console.log('success. data:', data);
  } catch (err: any) {
    console.log('failed. err message:', err.message);
  }
})()