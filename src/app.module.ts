import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Employee } from './employees/employee.entity';
import { CommitmentLevel } from './commitment-levels/commitment-level.entity';
import { CommitmentHistory } from './commitment-history/commitment-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '5432', 10),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [Employee, CommitmentLevel, CommitmentHistory],
        synchronize: true, // Chỉ dùng cho dev!
      }),
    }),
    TypeOrmModule.forFeature([Employee, CommitmentLevel, CommitmentHistory]),
    // Import các module khác ở đây
  ],
})
export class AppModule {}