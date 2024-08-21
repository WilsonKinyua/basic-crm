import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './leads/leads.module';
import { CustomersModule } from './customers/customers.module';
import { InteractionsModule } from './interactions/interactions.module';

@Module({
  imports: [
    // load the .env file and make it available in the entire application
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // connect to the database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      // synchronize: true, // setting to true to auto create tables (dev only)
      // logging: true, // for debugging purposes
    }),
    LeadsModule,
    CustomersModule,
    InteractionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
