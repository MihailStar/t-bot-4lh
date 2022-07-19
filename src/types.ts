import { Context } from 'telegraf';

interface MyContext extends Context {
  // memorize: bot.context.db, bot.context создается для каждого update'а
  db?: { counter?: number };
  // memorize: ctx.session, для данных сессии
  session?: { counter?: number };
  // memorize: ctx.state, для обмена между middleware'ами
  state: { example?: number };
}

export { MyContext };
