// src/prisma/prisma.service.ts
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    try {
      const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      });
      super({ adapter });
    } catch (error) {
      console.error('PrismaService initialization error:', error);
    }
  }
}
