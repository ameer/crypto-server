import { HttpModule, Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
@Global()
@Module({
  imports: [HttpModule],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
