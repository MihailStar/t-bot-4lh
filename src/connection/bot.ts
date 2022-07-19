import { Telegraf } from 'telegraf';
import { MyContext } from '../types';
import { configuration } from '../common/configuration';

const bot = new Telegraf<MyContext>(configuration.BOT_TOKEN);

export { bot };
