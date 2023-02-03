import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { CurUser } from './decorators/cur-user.decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @CurUser() user: ExternalUser,
    @Res() res: Response,
  ) {
    const { redirectUrl, cookies } =
      await this.authService.handleGoogleRedirect(user);

    if (cookies) {
      cookies.forEach((cookie) => {
        res.cookie(cookie.name, cookie.value, cookie.options);
      });
    }

    res.redirect(redirectUrl);
  }
}
