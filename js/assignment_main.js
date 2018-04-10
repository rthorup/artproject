'use strict';
let myArray = [];
const initPage = function(item) {
	let markup = createDiv(item);
	let container = document.createElement("div");
	container.classList.add("assignmentBox");
	container.innerHTML = markup;
	document.body.appendChild(container);
}

function createDiv(item) {
	return `
	<h1>${item.ExhibitionName}</h1>
	<h4>${item.AssignmentDescription}</h4>
	<h5>${item.Skills}</h5>
	<h5>${item.Keywords}</h5>
	`
}
window.onload = function() {
	axios.get('https://spencerdev.dept.ku.edu/RJT')
		.then(function(response) {
			// console.log(response.data);
			myArray = response.data;
			// console.log(typeof(myArray[0].Skills));
			// console.log(myArray[0].Skills);
			myArray.forEach(initPage)
		})
		.catch(function(error) {
			console.log(error);
		});


}
// console.log(myArray);
let newView = document.getElementById('submitCall');
newView.addEventListener('click', function() {
	axios.get('https://spencerdev.dept.ku.edu/RJT')
		.then(function(response) {
			// console.log(response.data);
			myArray = response.data;
			// console.log(typeof(myArray[0].Skills));
			// console.log(myArray[0].Skills);
			myArray.forEach(initPage)
		})
		.catch(function(error) {
			console.log(error);
		});

})