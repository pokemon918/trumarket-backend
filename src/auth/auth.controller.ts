import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { CurUser } from './cur-user.decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  googleAuth() {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @CurUser() user: ExternalUser,
    @Res() res: Response,
  ) {
    const { redirectUrl, cookie } = await this.authService.handleGoogleRedirect(
      user,
    );

    if (cookie) {
      res.cookie(cookie.name, cookie.value, cookie.options);
    }

    res.redirect(redirectUrl);
  }
}
