/*
Gryffindor (321070812054683678)                                                                                                                                                                                                           
Ravenclaw (321070913162313728)                                                                                                                                                                                                            
Slytherin (322176660352925696)                                                                                                                                                                                                            
Hufflepuff (322176841328885762) 
*/
var house_roles = {
	'Gryffindor': '321070812054683678',
	'Ravenclaw':  '321070913162313728',
	'Slytherin':  '322176660352925696',
	'Hufflepuff': '322176841328885762',
};
var houses =  [
	'gryffindor',
	'ravenclaw',
	'slytherin',
	'hufflepuff',
];


const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

var sortRe = /^!sortme ([a-z]+)/i;
client.on('message', message => {
  var sorting = sortRe.exec(message.content);
  if (sorting && message.channel.name === 'sorting_hat') {
    var request_house = sorting[1];
    
    console.log( message.author.username + ' would like to be sorted into ' + request_house);
    console.log("They have the following roles:");
    var roles = message.member.roles.map(function (role) {
      console.log(role.name + ' (' + role.id + ')');
      return role.id;
    });
      
    var role_test = check_roles(request_house,roles);
    if(!role_test) {
      //add them to the role
      message.member.addRole(house_roles[request_house.toLowerCase().capitalize()]);
      message.reply("And so it shall be! You are now a $request_house!");
    } else {
      if(role_test !== true) {
        message.reply("I'm sorry but you're already in house " + role_test + ", if you need to change your house you will need to contact a headmaster.");
      } else {
        message.reply('I\'m sorry, but "' + request_house +'" is not a recognized house here at Hogwarts School of Witchcraft and Wizardry.');
      }
    }
  }
});

fs = require('fs')
fs.readFile('.token', 'utf8', function (err,token) {
  if (err) {
    return console.log(err);
  }
  client.login(token);
});

function check_roles(check,user_roles) {
	//first check if it's actually a house_roles
  if(houses.indexOf(check.toLowerCase()) == -1) {
		return true;
	}
	for (var r in house_roles) {
    if (user_roles.indexOf(house_roles[r]) != -1) {
      return r;
    }
  }
	return false;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}