import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { User, Product, Order, Category, SecretCode, MediaFiles, Ingredient, OrderItem, Zone } from './entities';
import { CategoriesModule } from './resources/categories/categories.module';
import { ProductsModule } from './resources/products/products.module';
import { OrdersModule } from './resources/orders/orders.module';
import { UsersModule } from './resources/users/users.module';
import { ZonesModule } from './resources/zones/zones.module';
import { AuthModule } from './resources/auth/auth.module';
import { AppController } from './app.controller';
import { validationSchema } from './validation';
import { jwtConfig, dbConfig } from './configs';
import { AppService } from './app.service';
import { IDBConfig } from 'src/models';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/'),
      serveRoot: '/public/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validationSchema,
      load: [jwtConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService : ConfigService) => {
        const dbConfig: IDBConfig = configService.get("DB_CONFIG") as IDBConfig;
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [User, Product, Order, Category, SecretCode, MediaFiles, Ingredient, OrderItem, Zone],
          synchronize: true,
        }
      }
    }),
    TypeOrmModule.forFeature([User, Product, Order, Category, SecretCode, MediaFiles, Ingredient, OrderItem, Order, Zone]),
    AuthModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    UsersModule,
    ZonesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }