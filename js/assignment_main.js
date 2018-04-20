'use strict';
var start = new Date().getTime();
console.log(start);
// //declaring arrays to capture data
let assignmentData = [];
let skills = [];
let keywords = [];
let activity = [];
let course = [];

//pulling in json data to work with on page load.
window.onload = function() {
	axios.get('https://spencerdev.dept.ku.edu/RJT')
		.then(function(response) {
			//main data
			assignmentData = response.data;
			//breaking down list items programmatically
			let tempSkillsArray = [];
			let tempKeywordArray = [];
			let tempCourseArray = [];
			let tempActivityArray = [];
			//breaking the strings into array items
			assignmentData.forEach((item) => {
				let skillsArray = item.Skills.split(',');
				let keywordArray = item.Keywords.split(',');
				let courseArray = item.CourseCodeAndNumber.split(',');
				let activityArray = item.ActivityType.split(',');

				skillsArray.forEach((item) => {
					tempSkillsArray.push(item);
				})
				keywordArray.forEach((item) => {
					tempKeywordArray.push(item);
				})
				courseArray.forEach((item) => {
					tempCourseArray.push(item);
				})
				activityArray.forEach((item) => {
					tempActivityArray.push(item);
				})
			})
			skills = removeDuplicates(tempSkillsArray).sort();
			keywords = removeDuplicates(tempKeywordArray).sort();
			course = removeDuplicates(tempCourseArray).sort();
			activity = removeDuplicates(tempActivityArray).sort();
			console.log(new Date().getTime() - start);
		})
		.catch(function(error) {
			console.log(error);
			alert('Sorry, we could not find any assignments at this time')
		});
}
//function to remove duplicate entries from data;
function removeDuplicates(arr) {
	let filteredList = []
	for (let i = 0; i < arr.length; i++) {
		if (filteredList.indexOf(arr[i]) == -1) {
			filteredList.push(arr[i])
		}
	}
	return filteredList;
}
//make a div to put in assignment data and then append it to the dom
const initPage = function(item) {
	let markup = createDiv(item);
	let container = document.createElement("div");
	container.classList.add("assignmentBox");
	container.innerHTML = markup;
	document.body.appendChild(container);
}
//function to template divs with assignment data
function createDiv(item) {
	return `
		<a href='http://spencerdev.dept.ku.edu/assignment?value=${item.ExhibitionName}' target="_blank"><h1>${item.ExhibitionName}</h1></a>
		<h4>${item.AssignmentDescription}</h4>
		<h5>Skills used: ${item.Skills}</h5>
		<h5>Keywords: ${item.Keywords}</h5>
	`
}

let newView = document.getElementById('submitCall');
//function set to get search criteria
newView.addEventListener('click', function() {
	//getting data from select fields
	let activityType = document.getElementById('activityType').value;
	let skillType = document.getElementById('skillType').value;
	//declaring the array to put matching criteria
	let activityDisplay = []
	//looping through our data to check for mathing items
	for (let i = 0; i < assignmentData.length; i++) {
		if (assignmentData[i].ActivityType === null) {
			assignmentData[i].ActivityType = "N/A";
		}
		if (assignmentData[i].Skills === null) {
			assignmentData[i].Skills = "N/A";
		}
		if ((assignmentData[i].ActivityType.includes(activityType)) && (assignmentData[i].Skills.includes(skillType))) {
			activityDisplay.push(assignmentData[i]);
		}
	}
	if (activityDisplay.length === 0) {
		//if no matches, display warning
		alert('Sorry, no matching criteria');
	} else {
		//creating a new div for each matching criteria
		activityDisplay.forEach(initPage);
	}
	//resetting fields for possible search

});

let resetSearch = document.getElementById('resetSearch');
resetSearch.addEventListener('click', function() {
	document.getElementById('activityType').value = "";
	let divs = document.querySelectorAll('.assignmentBox');
	console.log(divs[0]);
	for (let i = 0; i < divs.length; i++) {
		divs[i].parentNode.removeChild(divs[i]);
	}
});
