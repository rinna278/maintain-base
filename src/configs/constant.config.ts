import { config } from 'dotenv';
config();
export const NODE_ENV = process.env.NODE_ENV;

export const JWT_CONFIG = {
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME:
    +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  SALT_ROUNDS: 12,
};

export const DATABASE_CONFIG = {
  host: process.env.DATABASE_HOST || '',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || '',
  port: +process.env.DATABASE_PORT || 5432,
  logging: process.env.DATABASE_LOGGING === 'true' || false,
};

export const API_CONFIG = {
  VERSION_V1: '1',
};

export const DEFAULT_ADMIN_USER = {
  email: process.env.DEFAULT_ADMIN_USER,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
  name: process.env.DEFAULT_ADMIN_NAME || 'Administrator',
};

export const AWS_CONFIG = {
  BUCKET_ID: process.env.AWS_BUCKET_ID || '',
  KEY_ID: process.env.AWS_KEY_ID || '',
  ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
  REGION: process.env.AWS_REGION || 'ap-southeast-1',
  SOURCE_MAIL: process.env.AWS_SOURCE_MAIL || '',
  SMTP_USER: process.env.AWS_SMTP_USER || '',
  SMTP_PASS: process.env.AWS_SMTP_PASS || '',
  SMTP_URL: process.env.AWS_SMTP_URL || '',
};

export const MINIO_CONFIG = {
  ENDPOINT: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
  HOST: process.env.HOST || 'localhost',
  BUCKET_NAME: process.env.MINIO_BUCKET_NAME || '',
  ACCESS_KEY: process.env.MINIO_ACCESS_KEY || '',
  SECRET_KEY: process.env.MINIO_SECRET_KEY || '',
};

export const REDIS_CONFIG = {
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  REDIS_TTL: Number(process.env.REDIS_TTL) || 300, // 5 minutes
};

export const OTP_CONFIG = {
  OTP_LENGTH: Number(process.env.OTP_LENGTH) || 6,
  OTP_EXPIRATION: Number(process.env.OTP_EXPIRATION) || 300, // 5 minutes
};

export const EMAIL_CONFIG = {
  MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
  MAIL_PORT: Number(process.env.MAIL_PORT) || 465,
  MAIL_SECURE: process.env.MAIL_SECURE === 'true',
  MAIL_USER: process.env.MAIL_USER || '',
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || 'Your App',
  MAIL_FROM_EMAIL: process.env.MAIL_FROM_EMAIL || 'noreply@yourapp.com',
};
