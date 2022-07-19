import dotenv from 'dotenv';
import { ExitCode } from './exit-code';

dotenv.config();

const { NODE_ENV, BOT_TOKEN, DB_URL } = process.env;

if (NODE_ENV === undefined) {
  process.exitCode = ExitCode.INVALID_ARGUMENT;
  throw new Error('No environment variable process.env.NODE_ENV');
}

if (BOT_TOKEN === undefined) {
  process.exitCode = ExitCode.INVALID_ARGUMENT;
  throw new Error('No environment variable process.env.BOT_TOKEN');
}

if (DB_URL === undefined) {
  process.exitCode = ExitCode.INVALID_ARGUMENT;
  throw new Error('No environment variable process.env.DB_URL');
}

const configuration = {
  NODE_ENV,
  BOT_TOKEN,
  DB_URL,
  isDevelopment: NODE_ENV === 'development',
} as const;

export { configuration };
