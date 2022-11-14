import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { GoogleOAuthGuard } from './auth/guards/google-oauth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
