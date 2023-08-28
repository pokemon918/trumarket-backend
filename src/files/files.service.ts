import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import * as mime from 'mime';
import { unlink } from 'fs/promises';

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

    if (fileType.startsWith('image/') || fileType.startsWith('video/') || fileType.includes('pdf') || fileType.includes('msword')) {
      cb(null, filename)
    } else {
      cb(new BadRequestException(), fileType);
    }
  },
});

@Injectable()
export class FilesService {
  getFile(filename: string) {
    if (!FILENAME_REGEX.test(filename)) throw new NotFoundException();
    return join(storageDest, filename);
  }

  async handleUpload(files: Express.Multer.File[]) {
    return files.map(({ filename }) => `${backendUrl}/files/${filename}`);
  }

  async deleteFiles(filenames: string[]) {
    for (const filename of filenames) {
      if (FILENAME_REGEX.test(filename)) {
        try {
          const filePath = join(storageDest, filename);
          await unlink(filePath);
        } catch { }
      }
    }

    return true;
  }
}
