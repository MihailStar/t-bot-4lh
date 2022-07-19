import { Composer } from 'telegraf';
import { User } from '../model/user';

const composer = new Composer();

composer.start(async (ctx) => {
  try {
    // prettier-ignore
    const name = 'MihailStar\'s бот';
    const about = 'Учебный бот (t-bot-4lh)';
    const text = `${name}\n${about}\n/help`;

    await ctx.reply(text);

    const [{ id, tgId }] = await User.findOrCreate({
      where: { tgId: ctx.update.message.from.id },
    });

    await ctx.replyWithMarkdown(
      `\`${JSON.stringify({ id, tgId }, null, '  ')}\``
    );
  } catch (reason) {
    console.error(reason);
  }
});

export { composer as start };
