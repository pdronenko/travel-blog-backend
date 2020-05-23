import { Module } from '@nestjs/common';
import { TrailsModule } from './trails/trails.module';

@Module({
  imports: [TrailsModule],
})
export class AppModule {}
