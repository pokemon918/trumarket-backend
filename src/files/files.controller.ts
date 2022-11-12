import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
    file.pipe(res);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  uploadFile(
    @UploadedFile() { filename }: Express.Multer.File,
    @Query('relationId') relationId: string,
  ) {
    return this.filesService.recordFile(filename, relationId);
  }
}
