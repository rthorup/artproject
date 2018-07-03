'use strict';
//tracking time to load/sort data;
var start = new Date().getTime();
console.log(start);
// //declaring arrays to capture data
let assignmentData = {};
let skills = [];
let keywords = [];
let activity = [];
let size = [];
let level = ["Introductory Undergraduate", "Advanced Undergraduate", "Graduate"];
//pulling in json data to work with on page load.
window.onload = function() {
	axios.get('http://spencerdev.dept.ku.edu/RJT')
		.then(function(response) {
			//main data
			assignmentData = response.data;
			//breaking down list items programmatically
			const tempSkillsArray = [];
			const tempKeywordArray = [];
			const tempActivityArray = [];
			const classSize = [];
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
				}
			})
			//sort the resulting data alphabetically after removing duplicates.
			skills = removeDuplicates(tempSkillsArray).sort();
			keywords = removeDuplicates(tempKeywordArray).sort();
			activity = removeDuplicates(tempActivityArray).sort();
			size = removeDuplicates(classSize).sort();
			console.log(new Date().getTime() - start);
		}).then(() => {
			//capturing arrays to insert into autocomplete search;
			let searchSkillList = skills;
			let searchKeywordList = keywords;
			let searchActivityList = activity;
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
//scroll to top feature.
let topScroll = document.getElementById('topScroll').addEventListener("click", ()=> {
	document.body.scrollTop = 50; // For Safari
  document.documentElement.scrollTop = 50; // For Chrome, Firefox, IE and Opera
})
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
			document.getElementById('topScroll').style.display = "block";
    } else {
      document.getElementById('topScroll').style.display = "none";
    }
}


let resultView = document.getElementById('results');
const initResult = function() {
	let markup = createResults();
	let container = document.createElement("div");
	container.innerHTML = markup;
	resultView.appendChild(container);
}

function createResults() {
	return`
	<div class="container resultBox">
		<h2 class="ml-3">Results: ${results}</h2>
	</div>
	`
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
	<div class="container">
		<div class="row">
			<div class="col-lg-4 imageContainer p-3 m-3">
				<img src=https://dept.ku.edu/~smamobile/oai/download/asset/bigger/${item.ObjID} class="itemImage" alt="${item.ExhibitionName} Assignment Main Image">
			</div>
			<div class="col-lg-7 p-3">
					<a href='http://spencerdev.dept.ku.edu/assignment?value=${item.ExhibitionName}' target="_blank"><h2>${item.ExhibitionName}</h2></a>
					<h5>${item.AssignmentDescription}</h5>
					<h5><strong>Activity Type:</strong> ${item.ActivityType}</h5>
					<h5><strong>Keywords:</strong> ${item.Keywords}</h5>
					<h5><strong>Department:</strong> ${item.SchoolDepartment}</h5>
					<h5><strong>Academic Level:</strong> ${item.AcademicLevel}</h5>
			</div>
		</div>
	</div>
	`
}

let results = 0;

let newView = document.getElementById('submitCall');
//function set to get search criteria
newView.addEventListener('click', function() {
	//getting data from select fields
	let skillType = document.getElementById('autocompleteSkills').value;
	let keywordType = document.getElementById('autocompleteKeywords').value;
	let activityType = document.getElementById('autocompleteActivity').value;
	let levelType = document.getElementById('autocompleteLevel').value;
	let sizeType = document.getElementById('autocompleteSize').value;
	//clearing previous results if any
	results = 0;
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
		if ((assignmentData[i].ActivityType.includes(activityType)) && (assignmentData[i].Skills.includes(skillType)) && (assignmentData[i].Keywords.includes(keywordType)) && (assignmentData[i].AcademicLevel.includes(levelType)) && (assignmentData[i].ClassSize.includes(sizeType))) {
			activityDisplay.push(assignmentData[i]);
		}
	}
	if (activityDisplay.length === 0) {
		//if no matches, display modal
		$('#noResultsMessage').modal('toggle')
	} else {
		//creating a new div for each matching criteria
		results = activityDisplay.length;
		initResult();
		activityDisplay.forEach(initPage);
	}

});

let resetSearch = document.getElementById('resetSearch');
resetSearch.addEventListener('click', function() {
	resetSearchBoxes();
	resetPage();
});

function resetSearchBoxes() {
	document.getElementById('autocompleteSkills').value = "";
	document.getElementById('autocompleteKeywords').value = "";
	document.getElementById('autocompleteActivity').value = "";
	document.getElementById('autocompleteLevel').value = "";
	document.getElementById('autocompleteSize').value = "";
}

function resetPage() {
	let searchDiv = document.querySelectorAll('.resultBox');
	for (let i = 0; i < searchDiv.length; i++) {
		searchDiv[i].parentNode.removeChild(searchDiv[i]);
	}
	let divs = document.querySelectorAll('.assignmentBox');
	for (let i = 0; i < divs.length; i++) {
		divs[i].parentNode.removeChild(divs[i]);
	}
}
