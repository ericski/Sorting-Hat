const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

fs = require('fs')
fs.readFile('.token', 'utf8', function (err,token) {
  if (err) {
    return console.log(err);
  }
  client.login(token);
});

