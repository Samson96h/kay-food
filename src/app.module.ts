import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import { AppService } from './app.service';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/'),
      serveRoot: '/public/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT as string),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Product, Order, Category, SecretCode, MediaFiles, Ingredient, Order, OrderItem, Zone],
      synchronize: true,
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