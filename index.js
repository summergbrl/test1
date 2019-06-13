// Discord.js bot
const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "/"
var fs = require('fs')
var lineReader = require('line-reader');
var async = require('async');
const firstline = require('firstline')
const generated = new Set();
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message => {
  if (message.channel.id === '584988498751389716') {
  if(message.author.bot) return;
  var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];

  if (command === 'test') {
    message.channel.send("Test done, bot's working")
  }

  if (command === 'ping') {
    message.reply("pong")
  }

  if (command === 'gen') {
    if (generated.has(message.author.id)) {
      message.reply("Wait 30 seconds before generating another account!");
    }
    else {
      let messageArray = message.content.split(" ");
      let args = messageArray.slice(1);
      if (!args[0]) return message.reply("Please, specify the service you want! Listing : Spotify & Minecraft")
      var fs = require('fs');
      const filePath = __dirname+'/'+ args[0] + '.txt'


fs.readFile(filePath, function(err, data) {
    if (!err) {
        data = data.toString();
        var position = data.toString().indexOf('\n');
        var firstLine = data.split('\n')[0];
        if (position != -1) {
             data = data.substr(position + 1);
            fs.writeFile(filePath, data, function(err) {
              const embed = {
                "title": "Account Generated!",
                "description": "Check your dm for the account's information!",
                "color": 2202060,
                "timestamp": "https://shoppy.gg/@xRedAccounts",
                "footer": {
                  "icon_url": "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
                  "text": "xRedGen - Bot - xRedZoid"
                },
                "thumbnail": {
                  "url": "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png"
                },
                "author": {
                  "name": "xRedGen",
                  "url": "https://discordapp.com",
                  "icon_url": bot.displayAvatarURL
                },
                "fields": []
              };
              message.channel.send({ embed });
              generated.add(message.author.id);
              const embed2 = {
                "title": "xRedGen",
                "description": "If the account does not work, please do not sue me, this is just free",
                "color": 2202060,
                "timestamp": "https://shoppy.gg/@xRedAccounts",
                "footer": {
                  "icon_url": "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
                  "text": "Do you want a 99.9% accounts working? Purchase Premium-Generator!"
                },
                 "author": {
                  "name": "Account Generator",
                  "url": "https://discordapp.com",
                  "icon_url": bot.displayAvatarURL
                },
                "fields": [
                  {
                    "name": "Here's your account details!:",
                    "value": firstLine,
                  },

                ]
              };
              message.author.send({embed: embed2 });
              setTimeout(() => {
                // Removes the user from the set after a minute
                generated.delete(message.author.id);
              }, 30000);
                if (err) {
                   console.log(err);
                }
            });
        } else {
            message.channel.send("Sorry, there isn't any account avaible for that service!");
        }
    } else {
        message.channel.send("Sorry, that service doesen't exists on our database");
    }
});
}

}

if (command === "help"){
  const embed = {
    "title": "xRedGen",
    "description": "Informations",
    "color": 8519796,
    "timestamp": "https://shoppy.gg/@xRedAccounts",
    "footer": {
      "icon_url": "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
      "text": "xRedGen - Bot - @574229298278301717"
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png"
    },
    "author": {
      "name": "Account Generator",
      "url": "https://discordapp.com",
      "icon_url": bot.displayAvatarURL
    },
    "fields": [
      {
        "name": "Bot made by",
        "value": "Credits : Mental",
      },

    ]
  };
  message.channel.send({ embed });
}
if (command === "restock"){
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Sorry, you can't do it, you are not an admin!");
  if (!args[0]) return message.reply("Please, specify the service you want to restock!")
  message.channel.send("@everyone " + "**"+args[0]+"**" +" has been restocked by "+ "<@" + message.author.id + ">")
}
  }
})

client.login(process.env.TOKEN);
