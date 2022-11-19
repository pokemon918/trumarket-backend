import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesResolver } from './files.resolver';

@Module({
  providers: [FilesService, FilesResolver],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
