//global variables

var images = ["boots.jpg", "chair.jpg", "scissors.jpg", "water_can.jpg", "wine_glass.jpg", "bag.jpg", "banana.jpg", "cthulhu.jpg", "dragon.jpg", "pen.jpg", "shark.jpg", "sweep.png", 
"unicorn.jpg", "usb.gif"];
var products = [];
var display = [];
var randNums = [];
var voteCount = 0;
var pic1 = document.getElementById("pic1");
var pic2 = document.getElementById("pic2");
var pic3 = document.getElementById("pic3");
var resBut = document.getElementById("resBut");


//product constructor

var Product = function(name){
	this.name = name.slice(0, -4);
	this.tally = 0;
	this.views = 0;
	this.voteRate = (this.tally / this.views);
	this.fileSource = "img/" + name;
	products.push(this);
};

//function declarations

function repeatChecker(num, array){
	for (var i=0 ; i < array.length; i++){
		if (array[i] === num){
			return true;
		}
	}
}

function arrayMaker(products){
	var array = [];
	while (array.length < 3){
		num = Math.floor(Math.random() * products.length);
		if (!repeatChecker(num, array)){
			array.push(num);
		}
	}
	console.log(array);
	return array;
}

function makeDisplay(arrayFunc, products){
	display = [];
	randNums = arrayFunc;
	for (var i=0 ; i < arrayFunc.length ; i++){
		display.push(products[arrayFunc[i]]);
	}
	console.log(display);
}

function productList(images){
	for (var i=0 ; i < images.length ; i++){
		var obj = new Product(images[i]);
	}
}

function showDisplay(display){
	console.log("made it to showDisplay");
	pic1.innerHTML = "<img src ='" + display[0].fileSource + "''>";
	pic2.innerHTML = "<img src ='" + display[1].fileSource + "''>";
	pic3.innerHTML = "<img src ='" + display[2].fileSource + "''>";

}

function newPics(){
	makeDisplay(arrayMaker(products), products);
	showDisplay(display);
	if (voteCount % 15 === 0){
		resBut.style.display = 'block';
	} else {
		resBut.style.display = 'none';
	}

}
//object creator function calls

productList(images);


//other function calls

makeDisplay(arrayMaker(products), products);
showDisplay(display);

//adding event listeners
pic1.addEventListener("click", function(e){
	voteCount += 1;
	products[randNums[0]].tally += 1;
	newPics();
});

pic2.addEventListener("click", function(e){
	voteCount += 1;
	products[randNums[1]].tally += 1;
	newPics();
});

pic3.addEventListener("click", function(e){
	voteCount += 1;
	products[randNums[2]].tally += 1;
	newPics();
});






