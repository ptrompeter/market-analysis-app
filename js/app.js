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
var tblSection = document.getElementById("tblSection");
var resTbl = document.getElementById("resTbl");
var tBody = document.getElementById("appendHere");

//product constructor

var Product = function(name){
	this.name = name.slice(0, -4);
	this.tally = 0;
	this.views = 0;
	this.fileSource = "img/" + name;
	products.push(this);
};

Product.prototype.voteRate = function(){
	return this.tally / this.views;
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
	for (var i = 0 ; i < randNums.length ; i++){
		products[randNums[i]].views += 1;
	}
	console.log([randNums[i]]);
	console.log(display);
}

function productList(images){
	for (var i=0 ; i < images.length ; i++){
		var obj = new Product(images[i]);
	}
}

function showDisplay(display){
	pic1.innerHTML = "<img src ='" + display[0].fileSource + "''>";
	pic2.innerHTML = "<img src ='" + display[1].fileSource + "''>";
	pic3.innerHTML = "<img src ='" + display[2].fileSource + "''>";

}

function compare(a,b){
	if (a.voteRate() < b.voteRate()){
		return 1;
	} else if (a.voteRate() > b.voteRate()){
		return -1;
	} else {
		return 0;
	}
}

function checkZero(){
	for (i = 0 ; i < products.length ; i++){
		if (products[i].views === 0){
			return true;
		}
	}
}

function productSort(){
	if (!checkZero()){
		products.sort(compare);
	} else {
		console.log("insufficient data");
	}
}

function newPics(){
	makeDisplay(arrayMaker(products), products);
	showDisplay(display);
	if (voteCount % 15 === 0){
		resBut.style.display = 'block';
	} else {
		resBut.style.display = 'none';
	}
	// tblSection.style.display = 'none';
}
//object creator function calls
function tableRemover(){
	console.log("made it to table remover")
	for(i=0; i < products.length ; i++){
		if (tBody.firstChild){
		tBody.removeChild(tBody.firstChild);
		}
	}
}
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
resBut.addEventListener("click", function(e){
	console.log("listener is listening");
	if (!checkZero()){
		console.log("passed checkZero");
		productSort();
		console.log("passed sort");
		tableRemover();
		console.log("passed remover");
		tblSection.style.display = "block";
		for (i = 0 ; i < products.length ; i++){
			var trEl = document.createElement("tr");
			var th = document.createElement("th");
			th.textContent = products[i].name;
			var td1 = document.createElement("td");
			td1.textContent = Math.floor(products[i].voteRate() * 100);
			var td2 = document.createElement("td");
			td2.textContent = products[i].tally;
			var td3 = document.createElement("td");
			td3.textContent = products[i].views;
			trEl.appendChild(th);
			trEl.appendChild(td1);
			trEl.appendChild(td2);
			trEl.appendChild(td3);
			tBody.appendChild(trEl);
		}
	}
});
