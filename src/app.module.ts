import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './resources/categories/categories.module';
import { AuthModule } from './resources/auth/auth.module';
import { ProductsModule } from './resources/products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { OrdersModule } from './resources/orders/orders.module';
import { User } from './entities/users-entiti';
import { Product } from './entities/products-entiti';
import { Order } from './entities/orders-entiti';
import { Category } from './entities/categories-entiti';
import { SecretCode } from './entities/secret-code';
import { MediaFiles } from './entities/media-files';
import { UsersModule } from './resources/users/users.module';
import { Ingredient } from './entities/ingredients-entiti';
import { OrderItem } from './entities/order-item';

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
      entities: [User, Product, Order, Category, SecretCode, MediaFiles,Ingredient,Order,OrderItem],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Product, Order, Category, SecretCode, MediaFiles,Ingredient,OrderItem,Order]),
    AuthModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}