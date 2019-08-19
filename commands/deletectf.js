// Deletes the ctf category names `ctf` and all children channels and corresponding roles

exports.run = async (client, message, [ctf, ...problems]) => {

    // Checks if at least one argument (the ctf name) was given
    if (!ctf)
	return message.reply("You must specify a CTF to create.").catch(console.error);

    const ctfname = ctf.toLowerCase();

    // Finds ctf category
    const ctfcat = message.guild.channels.find(channel => (channel.name.toLowerCase() === ctfname) && channel.type === 'category');

    // Return with error message if not found
    if (!ctfcat)
	return message.reply(`${ctfname} not found!`).catch(console.error);

    let output = `- [category] ${ctfname}\n`;
    
    // For each channel of the category, delete the channel and corresponding role
    ctfcat.children.forEach(channel => {
	if (channel.name !== 'general')
	    message.guild.roles.find(role => role.name === `${ctfname}-${channel.name}`).delete().catch(console.error);
	channel.delete().then(output += `- [channel]  ${channel.name}\n`).catch(console.error);
    });

    // Delete the category and send output
    ctfcat.delete().catch(console.error);
    message.channel.send(output, {code: 'diff'});
};

exports.conf = {
    permLevel: "Mod"
};

exports.help = {
    name: "deletectf",
    description: "Deletes CTF category and all channels under the category.",
    usage: "deletectf ctf"
};
