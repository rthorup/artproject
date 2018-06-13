'use strict'
document.getElementById('Name').innerHTML = `${assignmentInfo[0].ExhibitionName}`
document.getElementById('Description').innerHTML = `${assignmentInfo[0].AssignmentDescription}`
document.getElementById('Type').innerHTML = `Activity Type: ${assignmentInfo[0].ActivityType}`
document.getElementById('Keys').innerHTML = `Keywords: ${assignmentInfo[0].Keywords}`
document.getElementById('CCN').innerHTML = `Course Code: ${assignmentInfo[0].CourseCodeAndNumber}`
document.getElementById('Skills').innerHTML = `Skills used: ${assignmentInfo[0].Skills}`
document.getElementById('Size').innerHTML = `Class size: ${assignmentInfo[0].ClassSize}`
document.getElementById('Instructor').innerHTML = `Instructor: ${assignmentInfo[0].Instructor}`
document.getElementById('Semester').innerHTML = `Semester: ${assignmentInfo[0].Semester}`


const initPage = function(item) {
	let markup = createDiv(item);
	let container = document.createElement("div");
	container.classList.add("assignmentBox");
	container.innerHTML = markup;
	document.getElementById('assignmentItems').appendChild(container);
}

function createDiv(item) {
	let firstName = item.FirstName;
	if (item.FirstName === null) {
		firstName = '';
	}
	return `
  <div class = "container">
    <div class="row">
      <div class ="col-md-auto imageContainer p-3 m-3">
        <a href="http://collection.spencerart.ku.edu/eMuseumPlus?service=ExternalInterface&module=collection&objectId=${item.ObjID}&viewType=detailView" target="blank">
          <img src=https://dept.ku.edu/~smamobile/oai/download/asset/bigger/${item.ObjID} class="itemImage" alt="${item.Title}">
         </a>
       </div>
       <div class ="col-lg p-4">
        <a href="http://collection.spencerart.ku.edu/eMuseumPlus?service=ExternalInterface&module=collection&objectId=${item.ObjID}&viewType=detailView" target="blank">
          <h3>${item.Title}</h3>
        </a>
          <h3>${item.FirstName} ${item.SortName}</h3>
          <h5>${item.Date}</h5>
          <h5>${item.MaterialTechnique}</h5>
       </div>
      </div>
   </div>
  `
}


assignmentObject.forEach(initPage);