import { HttpException, Injectable, HttpService } from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
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
  getReq(endpoint: string) {
    return this.http
      .get(`${process.env.API_URL}/${endpoint}`, {
        headers: {
          'X-API-KEY': process.env.API_KEY,
          'X-API-SIGN': this.getSignature(''),
        },
      })
      .pipe(map((response) => response.data))
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }
  postReq(endpoint: string, data: Record<string, unknown>) {
    return 'hj';
  }
}
