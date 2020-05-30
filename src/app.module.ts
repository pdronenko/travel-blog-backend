import { Module } from '@nestjs/common';
import { TrailsModule } from './trails/trails.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TrailsModule,
    AuthModule
  ],
})
export class AppModule {}
