'use strict';
//tracking time to load/sort data;
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
				//checking for null variables in each object.
				let flag = true;
				for (var key in item) {
					if (item[key] === null) {
						console.log("this is null");
						flag = false;
						break;
					}
				}
				if (flag === false) {
					//breaks out of forEach if any value is null
					return
				} else {
					//go ahead and process everything you need to.
					let skillsArray = item.Skills.split(',');
					let keywordArray = item.Keywords.split(',');
					let courseArray = item.CourseCodeAndNumber.split(',');
					let activityArray = item.ActivityType.split(',');
					//loading all array items into temp array and trimming the extra white space before some of the entries
					skillsArray.forEach((item) => {
						tempSkillsArray.push(item.trim());
					})
					keywordArray.forEach((item) => {
						tempKeywordArray.push(item.trim());
					})
					courseArray.forEach((item) => {
						tempCourseArray.push(item.trim());
					})
					activityArray.forEach((item) => {
						tempActivityArray.push(item.trim());
					})
				}
			})
			//sort the resulting data alphabetically after removing duplicates.
			skills = removeDuplicates(tempSkillsArray).sort();
			keywords = removeDuplicates(tempKeywordArray).sort();
			course = removeDuplicates(tempCourseArray).sort();
			activity = removeDuplicates(tempActivityArray).sort();
			console.log(new Date().getTime() - start);
		}).then(() => {
			//capturing arrays to insert into autocomplete search;
			let searchSkillList = skills;
			let searchKeywordList = keywords;
			let searchCourseList = course;
			let searchActivityList = activity;
			//attaching lists to each autocomplete search
			//if you need more info, check the autocmplete.js file for code base
			$('#autocompleteSkills').autocomplete({
				lookup: searchSkillList,
				onSelect: function(suggestion) {}
			});
			$('#autocompleteKeywords').autocomplete({
				lookup: searchKeywordList,
				onSelect: function(suggestion) {}
			});
			$('#autocompleteCourse').autocomplete({
				lookup: searchCourseList,
				onSelect: function(suggestion) {}
			});
			$('#autocompleteActivity').autocomplete({
				lookup: searchActivityList,
				onSelect: function(suggestion) {}
			});
		})
		.catch(function(error) {
			//if there is a problem with the page, display error.
			console.log(error);
			alert('Sorry, we could not find any assignments at this time. Please try again in a few minutes.')
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
	//clearing previous results if any
	resetPage();
	//getting data from select fields
	let skillType = document.getElementById('autocompleteSkills').value;
	let keywordType = document.getElementById('autocompleteKeywords').value;
	let courseType = document.getElementById('autocompleteCourse').value;
	let activityType = document.getElementById('autocompleteActivity').value;
	//declaring the array to put matching criteria
	let activityDisplay = []
	//looping through our data to check for matching items/accounting for any NULL values
	for (let i = 0; i < assignmentData.length; i++) {
		if (assignmentData[i].ActivityType === null) {
			continue;
		}
		if (assignmentData[i].Skills === null) {
			continue;
		}
		if (assignmentData[i].CourseCodeAndNumber === null) {
			continue;
		}
		if (assignmentData[i].Keywords === null) {
			continue;
		}
		if ((assignmentData[i].ActivityType.includes(activityType)) && (assignmentData[i].Skills.includes(skillType)) && (assignmentData[i].CourseCodeAndNumber.includes(courseType)) && (assignmentData[i].Keywords.includes(keywordType))) {
			activityDisplay.push(assignmentData[i]);
		}
	}
	if (activityDisplay.length === 0) {
		//if no matches, display modal
		$('#noResultsMessage').modal('toggle')
	} else {
		//creating a new div for each matching criteria
		activityDisplay.forEach(initPage);
	}

});

let resetSearch = document.getElementById('resetSearch');
resetSearch.addEventListener('click', function() {
	document.getElementById('autocompleteSkills').value = "";
	document.getElementById('autocompleteKeywords').value = "";
	document.getElementById('autocompleteCourse').value = "";
	document.getElementById('autocompleteActivity').value = "";
	resetPage();
});

function resetPage() {
	let divs = document.querySelectorAll('.assignmentBox');
	for (let i = 0; i < divs.length; i++) {
		divs[i].parentNode.removeChild(divs[i]);
	}
}