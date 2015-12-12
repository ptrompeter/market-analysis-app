//global variables

var products = [];
var display = [];

//product constructor

var Product = function(name){
	this.name = name;
	this.tally = 0;
	this.views = 0;
	this.voteRate = (this.tally / this.views);
	products.push(this);
};

//function declarations

function repeatChecker(num, array){
	for (i=0 ; i < array.length; i++){
		if (array[i] === num){
			return true;
		}
	}
}

function arrayMaker(products){
	var array = [];
	while (array.length < 3){
		num = Math.floor(Math.rand() * products.length);
		if (!repeatChecker(num, array)){
			array.push(num);
		}
	}
	return array;
}

function makeDisplay(array, products){
	for (i=0 ; array.length; i++){
		display[i] = products[array[i]];
	}
}

//object creator function calls

//other function calls
makeDisplay(arrayMaker(products), products);






