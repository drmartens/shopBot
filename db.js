var items = require('./snacks.json');
var restrictions = require('./restrictions.json');
let fs = require('fs');

var db = {
	getItemList: function(){
		return items;
	},

	saveItemList: ()=> {
        fs.writeFile('./snacks.json', JSON.stringify(items), (err) => {
        console.log('The Database is updated!');
           if (err){
            console.log('The Database did NOT update.');
        }
    });
    },

    getRestrictionList: function() {
        return restrictions;
    },

    saveRestrictionList: ()=> {
        fs.writeFile('./restrictions.json', JSON.stringify(restrictions), (err)=> {
        console.log('The Database is updated!');
            if (err) {
                console.log('The Database did NOT update.');
            }
        });
    }
};

module.exports = db;