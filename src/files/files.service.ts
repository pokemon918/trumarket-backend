import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import * as mime from 'mime';
import { createReadStream } from 'fs';

const { THIS_BACKEND_URL: backendUrl } = process.env as { [k: string]: string };

const FILENAME_REGEX = /^[0-9a-z]+\.[0-9a-z]+$/;

const randomBytesAsync = promisify(randomBytes);
const storageDest = join(__dirname, '../../files-storage');

export const fileStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDest);
  },
  filename: async (req, file, cb) => {
    const name = (await randomBytesAsync(48)).toString('hex');
    const filename = (name + extname(file.originalname)).toLowerCase();

    const fileType = mime.getType(filename) ?? '';

    if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
      cb(null, filename);
    } else {
      cb(new BadRequestException(), '');
    }
  },
});

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name)
    private filesModel: Model<FileDocument>,
  ) {}

  getFile(filename: string) {
    if (!FILENAME_REGEX.test(filename)) throw new BadRequestException();
    return createReadStream(join(storageDest, filename));
  }

  async recordFile(filename: string, rId: string) {
    const relationId =
      typeof rId === 'string' && rId.split('-').every((p) => p.length > 0)
        ? rId
        : undefined;

    await this.filesModel.create({
      filename,
      relationId,
    });

    return `${backendUrl}/files/${filename}`;
  }
}
