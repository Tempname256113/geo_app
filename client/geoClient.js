import fetch from "node-fetch";

class GeoServiceClient {
  #baseUrl;

  constructor(url = 'http://localhost:3000/') {
    this.#baseUrl = url;
  }

  async getInfoAboutIp(ip = '207.97.227.239'){
    const result = {message: 'default', body: null};

    try {
      const res = await fetch(`${this.#baseUrl}?ip=${ip}`).then((r) => {
        return r.json();
      });

      switch (res.statusCode) {
        case 400:
          result.message = 'provided ip is incorrect';
          break;
        case 404:
          result.message = 'info about provided ip is not found';
          break;
        case 500:
          result.message = 'maybe its fatal server error';
          break;
        default:
          result.message = 'success';
          result.body = res;
      }

      return result;
    } catch (err) {
      // стригерить 500 ошибку на сервере я так и не смог поэтому тут оставил обработчик на всякий случай
      result.message = 'maybe its fatal server error';

      return result;
    }
  }
}

// это надо для того чтобы не писать then. через await проще читается
(async () => {
  const geoClient = new GeoServiceClient('http://localhost:3001');

  const successRes = await geoClient.getInfoAboutIp('207.97.227.239');

  const notFoundRes = await geoClient.getInfoAboutIp('192.168.1.1');

  const badRequestRes = await geoClient.getInfoAboutIp('s3');

  //500 ошибку я так и не смог стригерить

  console.log('success', successRes);
  console.log('not found', notFoundRes);
  console.log('bad request', badRequestRes);
})()