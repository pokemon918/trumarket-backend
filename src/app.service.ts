import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getApiName(): string {
    return 'TRU Market API'
  }
}
