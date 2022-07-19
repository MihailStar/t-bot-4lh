import { Telegraf } from 'telegraf';
import { configuration } from '../common/configuration';

// memorize: Telegraf.branch, Telegraf.filter
const logger = Telegraf.optional(
  () => configuration.isDevelopment,
  Telegraf.log()
);

export { logger };
