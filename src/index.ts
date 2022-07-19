import { session } from 'telegraf';
import { bot } from './connection/bot';
import { logger as loggerMiddleware } from './middleware/logger';
import { start as startMiddleware } from './middleware/start';
import { help as helpMiddleware } from './middleware/help';
import { counter as counterMiddleware } from './middleware/counter';
import { sequelize } from './connection/db';

bot.telegram
  .setMyCommands([
    { command: 'start', description: 'Запустить' },
    { command: 'help', description: 'Команды' },
    { command: 'counter', description: 'Счетчик' },
  ])
  .catch(console.error);

bot
  // session middleware for counterMiddleware
  .use(session())
  .use(loggerMiddleware)
  .use(startMiddleware)
  .use(helpMiddleware)
  .use(counterMiddleware);

Promise.all([bot.launch(), sequelize.sync()])
  .then(() => console.log('Бот запущен'))
  .catch((reason) => {
    if (reason instanceof Error) {
      throw reason;
    }

    throw new Error(String(reason));
  });

process
  .once('SIGINT', () => {
    bot.stop('SIGINT');
    sequelize.close().catch(console.error);
  })
  .once('SIGTERM', () => {
    bot.stop('SIGTERM');
    sequelize.close().catch(console.error);
  });
