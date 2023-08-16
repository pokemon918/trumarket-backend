import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { FulfillmentGoogleOAuthGuard, InvestmentGoogleOAuthGuard, AdminGoogleOAuthGuard } from './guards/google-oauth.guard';
import { CurUser } from './decorators/cur-user.decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  async handleGoogleAuthRedirect(
    user: ExternalUser,
    res: Response,
    appType: 'fulfillment' | 'investment' | 'admin',
  ) {
    const { redirectUrl, cookies } =
      await this.authService.handleGoogleRedirect(user, appType);

    if (cookies) {
      cookies.forEach((cookie) => {
        res.cookie(cookie.name, cookie.value, cookie.options);
      });
    }

    res.redirect(redirectUrl);
  }

  @Get('google/fulfillment')
  @UseGuards(FulfillmentGoogleOAuthGuard)
  fulfillmentGoogleAuthRedirect(
    @CurUser() user: ExternalUser,
    @Res() res: Response,
  ) {
    return this.handleGoogleAuthRedirect(user, res, 'fulfillment');
  }

  @Get('google/investment')
  @UseGuards(InvestmentGoogleOAuthGuard)
  investmentGoogleAuthRedirect(
    @CurUser() user: ExternalUser,
    @Res() res: Response,
  ) {
    return this.handleGoogleAuthRedirect(user, res, 'investment');
  }

  @Get('google/admin')
  @UseGuards(AdminGoogleOAuthGuard)
  adminGoogleAuthRedirect(
    @CurUser() user: ExternalUser,
    @Res() res: Response,
  ) {
    return this.handleGoogleAuthRedirect(user, res, 'admin');
  }
}
