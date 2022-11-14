import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (
      typeof authorization !== 'string' ||
      !authorization.startsWith('Bearer ')
    ) {
      return next();
    }

    const token = authorization.slice('Bearer '.length);

    let decoded: {
      uid: string;
      xky: string;
    };

    try {
      decoded = await this.jwtService.verifyAsync(token);
    } catch {
      return next();
    }

    const user = await this.userModel
      .findOne({
        _id: decoded.uid,
        accessKey: decoded.xky,
      })
      .exec();

    if (!user) {
      return next();
    }

    req.user = {
      source: 'jwt',
      _id: user._id,
      role: user.role,
    };

    next();
  }
}
