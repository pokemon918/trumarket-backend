import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  Get,
  Param,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService, fileStorage } from './files.service';
import { Response } from 'express';
import { Public } from 'src/auth/public.decorator';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get(':filename')
  @Public()
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = this.filesService.getFile(filename);
    res.sendFile(file);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 20, { storage: fileStorage }))
  uploadFile(
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.filesService.recordFiles(files);
  }
}
