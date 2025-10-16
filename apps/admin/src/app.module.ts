import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import {
  User,
  Product,
  Order,
  Category,
  SecretCode,
  MediaFiles,
  Ingredient,
  OrderItem,
  Zone,
  Admins,
} from '@app/common/database/entities';

import { AdminModule } from './resources/admins/admin.module';
import { UsersModule } from './resources/users/users.module';
import { ProductsModule } from './resources/products/products.module';
import { ZonesModule } from './resources/zones/zones.module';
import { OrdersModule } from './resources/orders/orders.module';
import { CategoriesModule } from './resources/categories/categories.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/'),
      serveRoot: '/public/',
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../../.env'),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          User,
          Admins,
          Product,
          Order,
          Category,
          SecretCode,
          MediaFiles,
          Ingredient,
          OrderItem,
          Zone,
        ],
        synchronize: true,
      }),
    }),

    AdminModule,
    UsersModule,
    ProductsModule,
    ZonesModule,
    OrdersModule,
    CategoriesModule,

  ],
})
export class AppModule { }
