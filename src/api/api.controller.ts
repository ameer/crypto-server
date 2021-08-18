import { Controller, Get, Body, Post, Query, Param } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('api/v1')
export class ApiController {
  constructor(private readonly appService: AppService) {}
  @Get('/getCurrencies')
  getCurrencies() {
    return this.appService.getReq('getCurrencies', {});
  }
  @Post('/getOrder')
  getOrder(@Body() body) {
    return this.appService.postReq('getOrder', {
      id: body.id,
      token: body.token,
    });
  }
  @Post('/setEmergency')
  setEmergency(@Body() body) {
    return this.appService.postReq('setEmergency', {
      id: body.id,
      token: body.token,
      choice: body.choice,
      address: body.address,
    });
  }
  @Post('/getPrice')
  getPrice(@Body() data: Record<string, any>) {
    return this.appService.postReq('getPrice', data);
  }
  @Post('/createOrder')
  createOrder(@Body() data: Record<string, any>) {
    return this.appService.postReq('createOrder', data);
  }
}
