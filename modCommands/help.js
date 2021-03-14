// const { defaultModPrefix } = require('../config.json');

module.exports =
{
    name: 'help',
    description: 'List all of my moderation commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    execute(bot, message, args)
    {
        const data = [];
        const { modCommands } = message.client;

        if (!args.length)
        {
            data.push('Here\'s a list of all my commands:');
            for (const cmd of modCommands.map(command => command.name))
            {
                const commandDisabled = (cmd.disabled || false);
                if (cmd !== 'reload' || !commandDisabled)
                    data.push(`:white_small_square: **${cmd}**`);
            }
            data.push(`\nYou can send \`${bot.modPrefixes.get(message.guild.id)}help [command name]\` to get info on a specific command!`)
                .then(msg =>
                {
                    if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                    {
                        message.delete({ timeout: 15000 });
                        msg.delete({ timeout: 15000 });
                    }
                });

            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = modCommands.get(name) || modCommands.find(c => c.aliases && c.aliases.includes(name));

        if (!command)
        {
            return message.reply('that\'s not a valid command!')
                .then(msg =>
                {
                    if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                    {
                        message.delete({ timeout: 5000 });
                        msg.delete({ timeout: 5000 });
                    }
                });
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases)
            data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description)
            data.push(`**Description:** ${command.description}`);
        if (command.usage)
            data.push(`**Usage:** ${bot.modPrefixes.get(message.guild.id)}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 1} second(s)`);

        message.channel.send(data, { split: true })
            .then(msg =>
            {
                if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                {
                    message.delete({ timeout: 15000 });
                    msg.delete({ timeout: 15000 });
                }
            });
    },
};