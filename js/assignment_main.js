'use strict';
//tracking time to load/sort data;
var start = new Date().getTime();
console.log(start);
// //declaring arrays to capture data
let assignmentData = [];
let skills = [];
let keywords = [];
let activity = [];
let department = [];
let size = [];
let level = [];

//pulling in json data to work with on page load.
window.onload = function() {
	axios.get('http://spencerdev.dept.ku.edu/RJT')
		.then(function(response) {
			//main data
			assignmentData = response.data;
			//breaking down list items programmatically
			let tempSkillsArray = [];
			let tempKeywordArray = [];
			let tempActivityArray = [];
			let tempDepartmentArray = [];
			let tempLevelArray = [];
			let classSize = [];
			//breaking the strings into array items
			assignmentData.forEach((item) => {
				//checking for null variables in each object.
				let flag = true;
				for (var key in item) {
					if (item[key] === null) {
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
					let activityArray = item.ActivityType.split(',');
					let departmentArray = item.SchoolDepartment.split(',');
					let levelArray = item.AcademicLevel.split(',');
					classSize.push(item.ClassSize.trim());

					//loading all array items into temp array and trimming the extra white space before some of the entries
					skillsArray.forEach((item) => {
						tempSkillsArray.push(item.trim());
					})
					keywordArray.forEach((item) => {
						tempKeywordArray.push(item.trim());
					})
					activityArray.forEach((item) => {
						tempActivityArray.push(item.trim());
					})
					departmentArray.forEach((item) => {
						tempDepartmentArray.push(item.trim());
					})
					levelArray.forEach((item) => {
						tempLevelArray.push(item.trim());
					})
				}
			})
			//sort the resulting data alphabetically after removing duplicates.
			skills = removeDuplicates(tempSkillsArray).sort();
			keywords = removeDuplicates(tempKeywordArray).sort();
			activity = removeDuplicates(tempActivityArray).sort();
			department = removeDuplicates(tempDepartmentArray).sort();
			level = removeDuplicates(tempLevelArray).sort();
			size = removeDuplicates(classSize).sort();
			console.log(new Date().getTime() - start);
		}).then(() => {
			//capturing arrays to insert into autocomplete search;
			let searchSkillList = skills;
			let searchKeywordList = keywords;
			let searchActivityList = activity;
			let searchDepartmentList = department;
			let searchLevelList = level;
			let searchSizeList = size;
			//attaching lists to each autocomplete search
			//if you need more info, check the autocmplete.js file for code base
			$('#autocompleteSkills').autocomplete({
				lookup: searchSkillList,
				minChars: 0,
				onSelect: function(suggestion) {}
			});
			$('#autocompleteKeywords').autocomplete({
				lookup: searchKeywordList,
				minChars: 0,
				onSelect: function(suggestion) {}
			});
			$('#autocompleteActivity').autocomplete({
				lookup: searchActivityList,
				minChars: 0,
				onSelect: function(suggestion) {}
			});
			$('#autocompleteDepartment').autocomplete({
				lookup: searchDepartmentList,
				minChars: 0,
				onSelect: function(suggestion) {}
			});
			$('#autocompleteLevel').autocomplete({
				lookup: searchLevelList,
				minChars: 0,
				onSelect: function(suggestion) {}
			});
			$('#autocompleteSize').autocomplete({
				lookup: searchSizeList,
				minChars: 0,
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
let post = document.getElementById('post');
const initPage = function(item) {
	let markup = createDiv(item);
	let container = document.createElement("div");
	container.classList.add("assignmentBox");
	container.innerHTML = markup;
	post.appendChild(container);
}
//function to template divs with assignment data
function createDiv(item) {
	return `
		<a href='http://spencerdev.dept.ku.edu/assignment?value=${item.ExhibitionName}' target="_blank"><h1>${item.ExhibitionName}</h1></a>
		<h4>${item.AssignmentDescription}</h4>
		<h5><strong>Activity Type:</strong> ${item.ActivityType}</h5>
		<h5><strong>Keywords:</strong> ${item.Keywords}</h5>
		<h5><strong>Department:</strong> ${item.SchoolDepartment}</h5>
		<h5><strong>Academic Level:</strong> ${item.AcademicLevel}</h5>
	`
}

let newView = document.getElementById('submitCall');
//function set to get search criteria
newView.addEventListener('click', function() {
	//getting data from select fields
	let skillType = document.getElementById('autocompleteSkills').value;
	let keywordType = document.getElementById('autocompleteKeywords').value;
	let activityType = document.getElementById('autocompleteActivity').value;
	let departmentType = document.getElementById('autocompleteDepartment').value;
	let levelType = document.getElementById('autocompleteLevel').value;
	let sizeType = document.getElementById('autocompleteSize').value;
	//clearing previous results if any
	resetPage();
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
		if (assignmentData[i].Keywords === null) {
			continue;
		}
		if (assignmentData[i].AcademicLevel === null) {
			continue;
		}
		if (assignmentData[i].SchoolDepartment === null) {
			continue;
		}
		if (assignmentData[i].ClassSize === null) {
			continue;
		}
		if ((assignmentData[i].ActivityType.includes(activityType)) && (assignmentData[i].Skills.includes(skillType)) && (assignmentData[i].Keywords.includes(keywordType)) && (assignmentData[i].AcademicLevel.includes(levelType)) && (assignmentData[i].SchoolDepartment.includes(departmentType)) && (assignmentData[i].ClassSize.includes(sizeType))) {
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
	resetPage();
});

function resetPage() {
	document.getElementById('autocompleteSkills').value = "";
	document.getElementById('autocompleteKeywords').value = "";
	document.getElementById('autocompleteActivity').value = "";
	document.getElementById('autocompleteDepartment').value = "";
	document.getElementById('autocompleteLevel').value = "";
	document.getElementById('autocompleteSize').value = "";
	let divs = document.querySelectorAll('.assignmentBox');
	for (let i = 0; i < divs.length; i++) {
		divs[i].parentNode.removeChild(divs[i]);
	}
}