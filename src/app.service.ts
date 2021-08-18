import { HttpException, Injectable, HttpService } from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import * as qs from 'qs';
dotenv.config();
@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }
  getSignature(totalParams: any): any {
    const h = crypto
      .createHmac('sha256', process.env.API_SECRET)
      .update(totalParams)
      .digest('hex');
    return h;
  }
  objectToQueryString(obj) {
    const str = [];
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }
  getReq(endpoint: string, data: Record<string, unknown>) {
    const totalParams = qs.stringify(data);
    const signature = this.getSignature(totalParams);
    console.log(totalParams, signature);
    return this.http
      .get(`${process.env.API_URL}/${endpoint}`, {
        headers: {
          'X-API-KEY': process.env.API_KEY,
          'X-API-SIGN': signature,
        },
        params: totalParams,
      })
      .pipe(map((response) => response.data))
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }
  postReq(endpoint: string, data: Record<string, unknown>) {
    const totalParams = qs.stringify(data);
    const signature = this.getSignature(totalParams);
    const url = `${process.env.API_URL}/${endpoint}`;
    const headers = {
      'X-API-KEY': process.env.API_KEY,
      'X-API-SIGN': signature,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return this.http
      .post(url, totalParams, { headers })
      .pipe(map((response) => response.data))
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }
}
