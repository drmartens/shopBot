'use strict';
var Botkit = require('botkit');
var google = require('google');
var db = require('./db.js');
var reg = new RegExp('no','m');
var reg2 = new RegExp('No','m');
var reg3 = new RegExp('nope','m');
var reg4 = new RegExp('Nope','m');
var reg5 = new RegExp('done','m');
var reg6 = new RegExp('Done','m');
var reg7 = new RegExp('none','m');
var reg8 = new RegExp('None','m');



// var fs = require('fs');
// var json = JSON.stringify(object);

var snacks =  db.getItemList();
var restrict = db.getRestrictionList();
console.log('current restritions are' + restrict);

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-201125200757-fRPh3Le84WIRPnVOlOSMPKnm',
}).startRTM();

//simple test code
var tempSnacks = [];
var tempRestrictions = [];
//Conversation Responses

//CONVERSATION


//ADD SNACK
var snackAsk = function(response,conv) {
	conv.ask('What is your favorite snack?\nBe as specific as you can.', function(response,conv){
		conv.say(response.text + '? Great!');
		tempSnacks.push(" " + response.text);
		anyMore(response,conv);
		conv.next();
	});

var anyMore = function(response,conv) {
	if (response.text === 'No' || response.text === 'no' || response.text === 'nope' || response.text === 'done') {
		var string = '';
		for (var i=0;i<tempSnacks.length;i++){
			string = string + ',' + tempSnacks[i];
		}
		conv.say('Cool. I\'m adding your snacks to the list.');
		sayInstructions(response,conv);
		addToMasterList(string);
	} else {
		conv.say('okay...');
		evenMore(response,conv);
	}
}

var evenMore = function(response,conv) {
	conv.ask('Anything else?', function(response, conv){
		conv.say(response.text + '? Great.');
		tempSnacks.push(" " + response.text);
		anyMore(response, conv);
		conv.next();
	});
};

}

var sayInstructions = function(response,conv){
	conv.say('Thank you for your addition.\nType @botler snack to add your favorite snacks to this weeks list.\nType @botler list to see all the snacks others have added.\nType @botler restriction to tell us about anything you cannot eat, are allergic to, or really really hate.')
}

var listSnacks = function(response,conv) {
	// var tempList = snackList;
	// for (var i=0;i<tempList.length;i++){
	// var space = " ";
	// tempList[i] = space + tempList[i];
	var tempList = db.getItemList();

	conv.say('The current items on the list are' + tempList);;
}

function addToMasterList() {
	for (var i=0;i<tempSnacks.length;i++){
		if (reg.test(tempSnacks[i])) {
			console.log('the item to cut is' + tempSnacks[i]);
			tempSnacks[i].slice(1);
		} else if (reg.test(tempSnacks[i])) {
			console.log('the item to cut is' + tempSnacks[i]);
			tempSnacks[i].slice(1); }

			else if (reg2.test(tempSnacks[i])) {
			console.log('the item to cut is' + tempSnacks[i]);
			tempSnacks[i].slice(1); }

			else if (reg3.test(tempSnacks[i])) {
			console.log('the item to cut is' + tempSnacks[i]);
			tempSnacks[i].slice(1); }

			else if (reg4.test(tempSnacks[i])) {
			console.log('the item to cut is' + tempSnacks[i]);
			tempSnacks[i].slice(1); }

			else if (re5.test(tempSnacks[i])) {
			console.log('the item to cut is' + tempSnacks[i]);
			tempSnacks[i].slice(1); }

			else if (reg6.test(tempSnacks[i])) {
			console.log('the item to cut is' + tempSnacks[i]);
			tempSnacks[i].slice(1); 

			} else {
				snacks.push(tempSnacks[i]);
				}
	db.saveItemList(snacks);
	console.log(snacks);
}
}

// Channel Joined

var channelJoin = function(response,conv){
	conv.say('Hey there, I\'m Botler and my job is to help IDEO CoLab order snacks everyone enjoys.');
		conv.ask('What is your name?', function(response,conv) {
			if(response.text.length>0){
			conv.say('Hi' + response.text + 'Nice to meet you!');
			conv.say('Type snack to add your favorite snacks to this weeks list. Type list to see all the snacks others have added.\nType restriction to tell us about anything you cannot eat, are allergic to, or really really hate.');
			conv.next();
		}
		});
}

var helloScript = function(response,conv){
	conv.say('Hey there, I\'m Botler and my job is to help IDEO CoLab order snacks everyone enjoys.');
	conv.ask('What is your name?', function(response,conv) {
			if(response.text.length>0){
			conv.say('Hi ' + response.text + '. Nice to meet you!');
			conv.say('Type @botler snack to add your favorite snacks to this weeks list. Type @botler list to see all the snacks others have added.\nType @botler restriction to tell us about anything you cannot eat, are allergic to, or really really hate.');
			conv.next();
		}
});
}

var restrictions = function(response,conv){
	conv.ask('Okay. Tell me about what dietary restrictions or food allergies you have.\nIf you really hate a food, you can list it here. But please be considerate.', function(response,conv) {
			conv.say('Got it.');
			tempRestrictions.push(response.text);
			moreRestrictions(response, conv);
			conv.next();
	})
}

var moreRestrictions = function(response,conv){
	if (response.text === 'No' || response.text === 'no' || response.text === 'nope' || response.text === 'none') {
		var string = '';
		for (var i=0;i<tempRestrictions.length;i++){
			string = string + ',' + tempRestrictions[i];
		}
		conv.say('Cool. I\'m adding your restrictions to the list.');
		addToMasterRestrictions(string);
	} else {
		conv.say('okay...');
		evenMoreRestrictions(response,conv);
	}
}

var evenMoreRestrictions = function(response,conv){
	conv.ask('Anything else?', function(response, conv){
		conv.say('Okay, got it.');
		tempRestrictions.push(response.text);
		moreRestrictions(response, conv);
		conv.next();
	});
}
//there are not comments in this code -- dude
var curses = function(response,conv){
	conv.say("Do you kiss your mother with that mouth?");
}



function addToMasterList() {
	for (var i=0;i<tempSnacks.length;i++){
		if (reg.test(tempSnacks[i])) {
			console.log('the item to cut is' + tempSnacks[i]);
			tempSnacks[i].slice(1);
		} else {
		snacks.push(tempSnacks[i]);
	}
	db.saveItemList(snacks);
	console.log(snacks);
}
}

function addToMasterRestrictions() {
	for (var i=0;i<tempRestrictions.length;i++){
		if (reg.test(tempRestrictions[i])) {
			console.log('the item to cut is' + tempRestrictions[i]);
			tempRestrictions[i].slice(1);
		} else if (reg2.test(tempRestrictions[i])) {
			console.log('the item to cut is' + tempRestrictions[i]);
			tempRestrictions[i].slice(1); }

			else if (reg3.test(tempRestrictions[i])) {
			console.log('the item to cut is' + tempRestrictions[i]);
			tempRestrictions[i].slice(1); }

			else if (reg4.test(tempRestrictions[i])) {
			console.log('the item to cut is' + tempRestrictions[i]);
			tempRestrictions[i].slice(1); }

			else if (reg5.test(tempRestrictions[i])) {
			console.log('the item to cut is' + tempRestrictions[i]);
			tempRestrictions[i].slice(1); }

			else if (reg6.test(tempRestrictions[i])) {
			console.log('the item to cut is' + tempRestrictions[i]);
			tempRestrictions[i].slice(1); }

			else if (reg7.test(tempRestrictions[i])) {
			console.log('the item to cut is' + tempRestrictions[i]);
			tempRestrictions[i].slice(1); }

			else if (reg8.test(tempRestrictions[i])) {
			console.log('the item to cut is' + tempRestrictions[i]);
			tempRestrictions[i].slice(1); }

		else {
		restrict.push(tempRestrictions[i]);
	}
	db.saveRestrictionList(restrict);
	console.log('Saving' + restrict + 'to the list');
}
}

//***ONE TIME CONVERSATION TRIGGERS***

//HELLO
controller.hears(['hello', 'hi'], ['direct_message','direct_mention','mention'],function(bot,message) {
     bot.startConversation(message, helloScript);
     // bot.reply(message,'Hi there, I\'m Botler and my job is to help the IDEO CoLab team order AWESOME snacks that everyone enjoys.');
 
    });

//HOW ARE YOU
controller.hears('how are you', ['direct_message','direct_mention','mention'],function(bot, message) {
	bot.reply(message,'Just peachy! How can I help you?\nYou can add a snack by typing *snack*, see what snacks have been added by typing *list*, or tell us if you are allergic to something, cannot eat something, or follow a special diet by typing *restrictions*');
});


//*** MULTIPLE REPLY CONVERSATION TRIGGERS ****  	

//ADD SNACK

controller.hears('snack', ['direct_message','direct_mention','mention'],function(bot, message) {
	bot.startConversation(message, snackAsk);
});

controller.hears('list', ['direct_message','direct_mention','mention'],function(bot, message) {
	bot.startConversation(message, listSnacks);
});

controller.hears('restriction', ['direct_message','direct_mention','mention'],function(bot, message) {
	bot.startConversation(message, restrictions);
});
//Join the Channel
controller.on(['channel_joined','direct_message'], function(bot, message){
	bot.startConversation(message, channelJoin);
});

//Stuff from Group

//Curses
controller.hears(['fuck', 'shit', 'bitch', 'asshole'], ['direct_message','direct_mention','mention'],function(bot, message) {
	bot.startConversation(message, curses);
});

//Help
controller.hears(['help', 'assistance', 'what', 'how'], ['direct_message','direct_mention','mention'], function(bot,message){
	bot.reply(message, "Type @botler snack to add your favorite snacks to this weeks list. Type @botler list to see all the snacks others have added.\nType @botler restriction to tell us about anything you cannot eat, are allergic to, or really really hate.")
})






//General
controller.on(['ambient', 'direct_mention'], function(bot,message) {
	bot.reply(message, "Sorry, I don't have that information. Type @botler help for a list of commands.");
})
















// var recipes = [];
// var index= 0;

// var nextRecipe = function(reponse, conv){
// 	conv.ask('Ok how about ' + recipes[index].title + ' . Any good?', function(response, conv){
// 		if(response.text ==='Yes' || response.text ==='yes'){
// 			conv.say('Here\s the link\n' + recipes[index].href + '\n' + recipes[index].description);
// 		}
// 		else{
// 			nextRecipe(response, conv);
// 		}
		
		
// 		conv.next();
// 	});
// };

// var conversation = function(response, conv){
// 	conv.ask('I\ve found a recipe for ' + recipes[index].title + '. Any good?', function(response, conv){
// 		if(response.text ==='Yes' || response.text ==='yes'){
// 			conv.say('Here\s the link\n' + recipes[index].href + '\n' + recipes[index].description);
// 		}
// 		else{
// 			index++;
// 			nextRecipe(response, conv);
// 		}
		
		
// 		conv.next();
// 	});
// };

// var doSearch = function(response, conv, str){
// 	google('food recipe ' + str, function (err, res){
// 	  if (err){ 
// 	  		console.error(err);
// 	  }



// 	  if(res.links.length > 0){
// 	  	recipes = res.links;
// 	  	console.log('found ' + res.links.length);
// 	  	conversation(response, conv);
// 	  }
// 	  else{
// 	  	conv.say('Booooo I\ve found anything!');
// 	  }
	  	

	  
	 
// 	  /*for (var i = 0; i < res.links.length; ++i) {
// 	    var link = res.links[i];
// 	    console.log(link.title + ' - ' + link.href)
// 	    console.log(link.description + "\n");
// 	  }
	 
// 	  if (nextCounter < 4) {
// 	    nextCounter += 1
// 	    if (res.next){
// 	    	res.next();	
// 	    } 
// 	  }*/
// 	});
// };


// var askIngredients = function(response, conv){
// 	conv.ask('What Ingredients have you got?', function(response, conv){
// 		conv.say(response.text + '? Great.');

// 		things.push(response.text);
// 		anyMore(response, conv);
// 		conv.next();
// 	});
// };

// var askIngredientMore = function(response, conv){
// 	conv.ask('Anything else?', function(response, conv){
// 		conv.say(response.text + '? Great.');

// 		things.push(response.text);
// 		anyMore(response, conv);
// 		conv.next();
// 	});
// };

// var anyMore = function(response, conv){
// 	conv.ask('Anything else?', function(response, conv){
// 		if(response.text ==='No' || response.text ==='no'){
// 			var str = '';
// 			for(var i = 0; i < things.length; i++){
// 				str = str  + ' ' + things[i];
// 			}
// 			conv.say('Ok, great! I\'ve got' + str );
// 			doSearch(response, conv, str);
// 		}
// 		else{
// 			conv.say('uh-huh.');
// 			askIngredientMore(response, conv);
// 		}
// 		conv.next();
// 	});
// };


// var things = [];

// // give the bot something to listen for.
// controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {
//   bot.reply(message,'Hello yourself.');
// });

// controller.hears(['find recipe'],['ambient'],function(bot,message) {
// 	bot.startConversation(message, askIngredients);
// 	/*bot.startConversation(message,function(err,convo) {
// 	    convo.ask('How are you?',function(response,convo) {
// 	      	convo.say('Cool, you said: ' + response.text);
// 	      	convo.next();
// 	    });
//   	});*/
// });
// Contact GitHub API Training Shop Blog About
