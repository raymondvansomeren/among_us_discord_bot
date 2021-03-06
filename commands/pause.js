module.exports =
{
    name: 'pause',
    description: 'Pause the song.',
    aliases: [''],
    usage: '',
    async execute(bot, message, args)
    {
        if (message.member.roles.cache.find(role => role.name.toLowerCase() === 'nomusic') || message.member.roles.cache.find(role => role.name.toLowerCase() === 'incapacitated'))
        {
            return message.channel.send('Seems like you aren\'t allowed to use the music features :confused:')
                .then(msg =>
                {
                    if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                    {
                        message.delete({ timeout: 5000 });
                        msg.delete({ timeout: 5000 });
                    }
                });
        }

        const serverQueue = bot.queue.get(message.guild.id);
        if (!message.member.voice.channel)
        {
            return message.channel.send('You have to be in a voice channel to pause the music!')
                .then(msg =>
                {
                    if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                    {
                        message.delete({ timeout: 5000 });
                        msg.delete({ timeout: 5000 });
                    }
                });
        }

        if (!serverQueue)
        {
            return message.channel.send('There is no song that I could pause!')
                .then(msg =>
                {
                    if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                    {
                        message.delete({ timeout: 5000 });
                        msg.delete({ timeout: 5000 });
                    }
                });
        }

        serverQueue.connection.dispatcher.pause();

        message.channel.send(`Paused song **${serverQueue.songs[0].title}\n(${serverQueue.songs[0].url})**`);
    },
};