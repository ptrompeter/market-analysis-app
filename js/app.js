//global variables

var images = ["boots.jpg", "chair.jpg", "scissors.jpg", "water_can.jpg", "wine_glass.jpg", "bag.jpg", "banana.jpg", "cthulhu.jpg", "dragon2.jpg", "pen.jpg", "shark.jpg", "sweep.png",
"unicorn.jpg", "usb.gif"];
var products = [];
var display = [];
var randNums = [];
var voteCount = 0;
var pic1 = document.getElementById("pic1");
var pic2 = document.getElementById("pic2");
var pic3 = document.getElementById("pic3");
var resBut = document.getElementById("resBut");
var graphs = document.getElementById("graphs");
var clear = document.getElementById('clear');
var changeGraphs = document.getElementById('changeGraphs');
var gTracker = 0;
//product constructor

var Product = function(name){
	this.name = name.slice(0, -4);
	this.tally = 0;
	this.views = 0;
	this.fileSource = "img/" + name;
	products.push(this);
};

Product.prototype.voteRate = function(){
	return Math.floor(this.tally / this.views * 100);
};

// trying out local storage. building functionality as an object this time.
var locStore = {
	checkStore: function() {
		var loadedProducts;
		if (localStorage.getItem("products")){
			loadedProducts = JSON.parse(localStorage.getItem("products"));
			for (var i = 0; i < products.length; i++){
				products[i].name = loadedProducts[i].name;
				products[i].tally = loadedProducts[i].tally;
				products[i].views = loadedProducts[i].views;
				products[i].fileSource = loadedProducts[i].fileSource;
			}
			voteCount = JSON.parse(localStorage.getItem("votes"));
		} 
	},
	makeStore: function(){
		var jsonProducts = JSON.stringify(products);
		localStorage.setItem("products", jsonProducts);
		var jsonVotes = JSON.stringify(voteCount);
		localStorage.setItem("votes", jsonVotes);
	}
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
}

function productList(images){
	for (var i=0 ; i < images.length ; i++){
		var obj = new Product(images[i]);
	}
}

function showDisplay(display){
	pic1.innerHTML = "<img src ='" + display[0].fileSource + "' id='picOne'>";
	pic2.innerHTML = "<img src ='" + display[1].fileSource + "' id='picTwo'>";
	pic3.innerHTML = "<img src ='" + display[2].fileSource + "' id='picThree'>";

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
	}
}

function newPics(){
	makeDisplay(arrayMaker(products), products);
	showDisplay(display);
	graphs.style.display = "none";
	if (voteCount % 15 === 0){
		resBut.style.display = 'block';
	} else {
		resBut.style.display = 'none';
	}
}

//let's build a bar graph with chart.js

var barData = {
    labels: [],
    datasets: [
        {
            // label: "My First dataset",
            fillColor: "rgba(77, 5, 31,.8)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: null
        }
    ]
};

var ctx = document.getElementById("barGraph").getContext("2d");
var graph1 = new Chart(ctx).Bar(barData);

//let's make a pie chart with chart.js
var pieData = [];
var pieOptions = {
	segmentShowStroke : false,
	animateScale : true
};

var pieGraph = document.getElementById("pieGraph").getContext("2d");
var graph2 = new Chart(pieGraph).Pie(pieData, pieOptions);

function randomColor(){
	var array = [];
	for (var i = 0 ; i < 6; i++){
		array.push(Math.floor(Math.random() * 10));
	}
	return "#" + array.join("");
}

function graphMaker(products) {
		graph1.destroy();
		// graph2.destroy();
		var nameArray = [];
		var voteArray = [];
		var pieArray = [];
		for (var i = 0 ; i < products.length ; i++){
			nameArray.push(products[i].name);
			voteArray.push(products[i].voteRate());
		}
		for (var i = 0; i < products.length ; i++){
			pieArray.push({label: nameArray[i], value: voteArray[i], color: randomColor()})
		}
		barData.labels = nameArray;
		barData.datasets[0].data = voteArray;
		if (gTracker % 2 === 0){
		graph1 = new Chart(ctx).Bar(barData);
		} else {
		pieData = pieArray;
		graph1 = new Chart(ctx).Pie(pieData, pieOptions);
		}

}

//object creator function calls
productList(images);
locStore.checkStore();



//other function calls

makeDisplay(arrayMaker(products), products);
showDisplay(display);

//adding event listeners
pics.addEventListener("click", function(e){
	console.log(e.target);
	if (e.target.id !== "pics"){
		var num = e.target.id === 'picOne' ? 0: e.target.id === 'picTwo' ? 1: 2;
		voteCount += 1;
		products[randNums[num]].tally += 1;
		gTracker = 0;
		locStore.makeStore();
		newPics();		
	}
});

clear.addEventListener("click", function(e){
	console.log("clear is listening");
	localStorage.clear();
});

changeGraphs.addEventListener("click", function(e){
	gTracker += 1;
	graphMaker(products);
});

resBut.addEventListener("click", function(e){
	console.log("listener is listening");
	if (!checkZero()){
		console.log("passed checkZero");
		productSort();
		graphs.style.display = "in-line";
		graphMaker(products);
	} else {
	}
});
