// Global; will be replaced by a call to the server! 
var photoURLArray = 
[
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/A%20Torre%20Manuelina.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Uluru%20sunset1141.jpg" },
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Sejong tomb 1.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Serra%20da%20Capivara%20-%20Painting%207.JPG"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Royal%20Palace%2c%20Rabat.jpg"},
 { url: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Red%20pencil%20urchin%20-%20Papahnaumokukea.jpg"}
 ];


function reqListener() {
	var objList = JSON.parse(this.responseText);
	console.log(objList);
	/*var photoURL = this.responseText;
	var display = document.getElementById("photoImg");
	display.src = photoURL;*/
}

// Called when the user pushes the "submit" button 
function photoByNumber() {

	var numList = document.getElementById("num").value;
	numList = numList.trim();
	numList = numList.replace(/,/g, "+"); // separate by commas
	console.log(numList);
	
	if (numList != NaN) {
		var oReq = new XMLHttpRequest();
		var URL = "query?numList=" + numList;

		oReq.open("GET", URL);
		oReq.addEventListener("load", reqListener);
		oReq.send();

		/*
		var photoURL = photoURLArray[photoNum].url;
		var display = document.getElementById("photoImg");
		display.src = photoURL;
		*/
	}

}



