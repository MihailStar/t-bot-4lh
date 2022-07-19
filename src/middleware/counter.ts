import { Composer, Markup } from 'telegraf';
import { bot } from '../connection/bot';
import { MyContext } from '../types';

bot.context.db = { counter: 0 };

const Command = {
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  INCREMENT: 'INCREMENT',
} as const;

const button: Record<
  keyof typeof Command,
  ReturnType<typeof Markup.button.callback>
> = {
  [Command.DECREMENT]: Markup.button.callback('-', Command.DECREMENT),
  [Command.RESET]: Markup.button.callback('Обнулить', Command.RESET),
  [Command.INCREMENT]: Markup.button.callback('+', Command.INCREMENT),
};

function createResponse(ctx: MyContext): string {
  const commonCounter = ctx.db?.counter ?? 0;
  const currentCounter = ctx.session?.counter ?? 0;
  const response = `Общий: ${commonCounter}. Текущий: ${currentCounter}`;

  return response;
}

/** Need session middleware */
const composer = new Composer<MyContext>();

composer.command('counter', async (ctx) => {
  try {
    await ctx.reply(
      createResponse(ctx),
      Markup.inlineKeyboard([
        button[Command.DECREMENT],
        button[Command.INCREMENT],
      ])
    );
  } catch (reason) {
    console.error(reason);
  }
});

composer.action(Command.DECREMENT, async (ctx) => {
  try {
    if (ctx.db instanceof Object) {
      ctx.db.counter = (ctx.db.counter ?? 0) - 1;
    } else {
      ctx.db = { counter: -1 };
    }

    if (ctx.session instanceof Object) {
      ctx.session.counter = (ctx.session.counter ?? 0) - 1;
    } else {
      ctx.session = { counter: -1 };
    }

    await ctx.editMessageText(
      createResponse(ctx),
      Markup.inlineKeyboard([
        button[Command.DECREMENT],
        button[Command.RESET],
        button[Command.INCREMENT],
      ])
    );
    await ctx.answerCbQuery('Декрементировано');
  } catch (reason) {
    console.error(reason);
  }
});

composer.action(Command.RESET, async (ctx) => {
  try {
    if (ctx.session instanceof Object) {
      ctx.session.counter = 0;
    } else {
      ctx.session = { counter: 0 };
    }

    await ctx.editMessageText(
      createResponse(ctx),
      Markup.inlineKeyboard([
        button[Command.DECREMENT],
        button[Command.INCREMENT],
      ])
    );
    await ctx.answerCbQuery('Обнулено', { show_alert: true });
  } catch (reason) {
    console.error(reason);
  }
});

composer.action(Command.INCREMENT, async (ctx) => {
  try {
    if (ctx.db instanceof Object) {
      ctx.db.counter = (ctx.db.counter ?? 0) + 1;
    } else {
      ctx.db = { counter: 1 };
    }

    if (ctx.session instanceof Object) {
      ctx.session.counter = (ctx.session.counter ?? 0) + 1;
    } else {
      ctx.session = { counter: 1 };
    }

    await ctx.editMessageText(
      createResponse(ctx),
      Markup.inlineKeyboard([
        button[Command.DECREMENT],
        button[Command.RESET],
        button[Command.INCREMENT],
      ])
    );
    await ctx.answerCbQuery('Инкрементировано');
  } catch (reason) {
    console.error(reason);
  }
});

export { composer as counter };
