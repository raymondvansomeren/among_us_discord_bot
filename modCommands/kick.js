module.exports =
{
    name: 'kick',
    alias: ['yeet', 'fuckoff'],
    description: 'Kicks a user from the server. A reason is optional.',
    usage: '[user] [reason]',
    execute(bot, message, args)
    {
        if (args.length === 0)
        {
            return message.channel.send('You need to mention someone.')
                .then(msg =>
                {
                    if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                    {
                        message.delete({ timeout: 5000 });
                        msg.delete({ timeout: 5000 });
                    }
                });
        }
        if (message.member.hasPermission('KICK_MEMBERS'))
        {
            const toKick = message.mentions.members.first();
            if (message.author.id === toKick.id)
            {
                return message.channel.send('You can\'t kick yourself.')
                    .then(msg =>
                    {
                        if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                        {
                            message.delete({ timeout: 5000 });
                            msg.delete({ timeout: 5000 });
                        }
                    });
            }
            else if (!toKick.kickable)
            {
                return message.channel.send(`I can't kick ${toKick}`)
                    .then(msg =>
                    {
                        if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                        {
                            message.delete({ timeout: 5000 });
                            msg.delete({ timeout: 5000 });
                        }
                    });
            }

            if (args.length === 1)
            {
                toKick.kick()
                    .then(t =>
                    {
                        message.channel.send(`Succesfully kicked ${toKick}`)
                            .then(msg =>
                            {
                                if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                                {
                                    message.delete({ timeout: 5000 });
                                    msg.delete({ timeout: 5000 });
                                }
                            });
                    })
                    .catch(e =>
                    {
                        message.channel.send(`Failed to kick ${toKick}. Because ${e}`)
                            .then(msg =>
                            {
                                if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                                {
                                    message.delete({ timeout: 5000 });
                                    msg.delete({ timeout: 5000 });
                                }
                            });
                    });
            }
            else if (args.length > 1)
            {
                args.shift();
                const reason = args.join(' ');
                toKick.kick({ reason: reason })
                    .then(t =>
                    {
                        message.channel.send(`Succesfully kicked ${toKick} with reason \`${reason}\``)
                            .then(msg =>
                            {
                                if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                                {
                                    message.delete({ timeout: 5000 });
                                    msg.delete({ timeout: 5000 });
                                }
                            });
                    })
                    .catch(e =>
                    {
                        message.channel.send(`Failed to kick ${toKick}. Because ${e}`)
                            .then(msg =>
                            {
                                if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                                {
                                    message.delete({ timeout: 5000 });
                                    msg.delete({ timeout: 5000 });
                                }
                            });
                    });
            }
        }
    },
};