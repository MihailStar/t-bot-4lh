import { Composer } from 'telegraf';

const composer = new Composer();

composer.help(async (ctx) => {
  try {
    const myCommands = await ctx.telegram.getMyCommands();
    const text = myCommands.reduce(
      (accumulator, myCommand) =>
        `${accumulator}/${myCommand.command} - ${myCommand.description}\n`,
      ''
    );

    await ctx.reply(text);
  } catch (reason) {
    console.error(reason);
  }
});

export { composer as help };
