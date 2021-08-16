import { Controller, Get, Body, Post, Scope } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('api/v1')
export class ApiController {
  constructor(private readonly appService: AppService) {}
  @Get('/getCurrencies')
  getCurrencies() {
    return this.appService.getReq('getCurrencies');
  }
  @Post('/getPrice')
  getPrice(@Body() data: Record<string, any>) {
    return this.appService.getSignature(
      'fromCurrency=ETH&toCurrency=BTC&type=fixed',
    );
  }
}
