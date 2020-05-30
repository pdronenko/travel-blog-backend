import { Module } from '@nestjs/common';
import { TrailsController } from './trails.controller';
import { TrailsService } from './trails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailRepository } from './trail.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrailRepository]),
    AuthModule
  ],
  controllers: [TrailsController],
  providers: [TrailsService]
})
export class TrailsModule {}
