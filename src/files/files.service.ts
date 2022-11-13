import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import * as mime from 'mime';
import { readFile } from 'fs/promises';

const { THIS_BACKEND_URL: backendUrl } = process.env as { [k: string]: string };

const FILENAME_REGEX = /^[0-9a-z]+\.[0-9a-z]+$/;

const randomBytesAsync = promisify(randomBytes);
const storageDest = join(__dirname, '../../files-storage');

export const fileStorage = diskStorage({
  destination: (req, file, cb) => {
    console.log('destination');
    cb(null, storageDest);
  },
  filename: async (req, file, cb) => {
    console.log('filename', file);
    const name = (await randomBytesAsync(48)).toString('hex');
    const filename = (name + extname(file.originalname)).toLowerCase();

    const fileType = mime.getType(filename) ?? '';

    if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
      console.log('YESSS');
      cb(null, filename);
    } else {
      console.log('Hiiioo');
      cb(new BadRequestException(), '');
    }

    console.log('Yooooo');
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
    return join(storageDest, filename);
  }

  async recordFiles(files: Express.Multer.File[]) {
    const urls: string[] = [];

    for (const { filename } of files) {
      await this.filesModel.create({ filename });
      urls.push(`${backendUrl}/files/${filename}`);
    }

    return urls;
  }
}
