/*
	Insert values in table and make tha table fade in
	when the page loads
*/
$(document).ready(function(){
	$(`.container`).hide().fadeIn(1000);
	initiateTable();
});

/*
	Entry form when the close button on top right is clicked.
	This function resets the form, change rollno field as disabled
	or enabled depending on the form.
*/
$(document).on('click','#btnClose',()=> {	

	document.getElementById(`btnClose`).click();

	//reset form when closed
	document.getElementById(`form1`).reset();

	//to change the roll number when an entry is made
	//disabled is false
	document.getElementById(`roll`).disabled = false;

	//edit button shows when editing an existing row
	document.getElementById(`editBtn`).style.display = `none`;

	//submit button shows when entering a new row
	document.getElementById(`submitBtn`).style.display = `inline`;
});

/* 
	This function is called when the edit button clicked. It
	checks that the input values are in correct format and does
	not allow roll number to be changed. if roll Number has to 
	be changed, a new row should be inserted.
*/
$(document).on('click','#editBtn',()=> {

	let name = document.getElementById(`name`).value;
	let stream = document.getElementById(`stream`).value;
	let year = document.getElementById(`passYear`).value;
	const pttrn1 = /[a-z A-Z]+/;
    const pttrn2 = /[0-9]+/;
	const pttrn3 = /[a-z A-Z]+/;

	if (name == "" || !pttrn1.test(name)) {
		window.alert("Enter correct Name");
	}
	else if (stream == "" || stream.length > 4 || !pttrn3.test(stream)) {
		window.alert("ENTER STREAM IN CORRECT FORMAT");
	}
	else if (year == "" || year.length != 4 || !pttrn2.test(year)) {
		window.alert("Enter correct 4 digit pass-out year");
	}
	else {
		let tableRows = document.getElementsByTagName(`tr`);
		for(let row of tableRows) {
			let cell = row.childNodes[1].innerHTML;
			if(cell == document.getElementById(`roll`).value) {
				row.childNodes[2].innerHTML = name;
				row.childNodes[3].innerHTML = stream;
				row.childNodes[4].innerHTML = year;
			}
		}
		$(`#btnClose`).trigger(`click`);
	}
	
});

/*
	This function diables editing of roll number when editing 
	a row. Also, displays edit button instead of submit button.
*/
function editSetting(rollno) {
	document.getElementById(`roll`).value = parseInt(rollno);
	document.getElementById(`roll`).disabled = `true`;
	document.getElementById(`register`).click();
	document.getElementById(`editBtn`).style.display = `inline`;
	document.getElementById(`submitBtn`).style.display = `none`;
}

/*
	Function to delete a single row
*/
let delete_entry = (rollno)=>{
	let tableRows = document.getElementsByTagName(`tr`);
	let table = document.getElementById(`table`);
	let rowCount = 0;
	
	for(let row of tableRows) {
		let cell = row.childNodes[1].innerHTML;
		if(parseInt(cell) == parseInt(rollno)) {
			table.deleteRow(rowCount);
		}
		rowCount++;
	}
}

/*
	Function to delete multiple rows.
*/
$(document).on('click','#deleteSelected',()=> {		
	var checkBoxes = document.getElementsByName("CHECKBOXES");
	var arr = new Array();
	for(let box of checkBoxes) {
		if(box.checked) {
			arr.push(box.id);
		}
	}
	for(let box of arr){
		delete_entry(box);
	}
});

/*
	gets called when submit button is clicked. Checks if
	input values are valid and if they are insert them into table.
*/
$(document).on('click','#submitBtn',()=> {

	let name = document.getElementById(`name`).value;
	let stream = document.getElementById(`stream`).value;
	let rollno = document.getElementById(`roll`).value;
	let year = document.getElementById(`passYear`).value;
	const pttrn1 = /[a-z A-Z]+/;
    const pttrn2 = /[0-9]+/;
	const pttrn3 = /[a-z A-Z]+/;
	if (rollno == "" || rollno.length != 10 || !pttrn2.test(rollno)) {
		window.alert("Enter correct 10 digit roll Number");
	}
	else if (name == "" || !pttrn1.test(name)) {
		window.alert("Enter correct Name");
	}
	else if (stream == "" || stream.length > 5 || !pttrn3.test(stream)) {
		window.alert("ENTER STREAM IN CORRECT FORMAT");
	}
	else if (year == "" || year.length != 4 || !pttrn2.test(year)) {
		window.alert("Enter correct 4 digit pass-out year");
	}
	else {
		let tableRow = document.createElement(`tr`);
		let newRow = document.createElement(`td`);
		let chkBox = document.createElement(`input`);
		chkBox.type = `checkbox`;
		chkBox.name = "CHECKBOXES";
		chkBox.id = rollno;
		newRow.appendChild(chkBox);
		tableRow.appendChild(newRow);

		let id = document.createElement(`td`);
		let idData = document.createTextNode(rollno);
		id.appendChild(idData);
		tableRow.appendChild(id);

		let stuName = document.createElement(`td`);
		let nameData = document.createTextNode(name);
		stuName.appendChild(nameData);
		tableRow.appendChild(stuName);

		let stuStream = document.createElement(`td`);
		let streamData = document.createTextNode(stream);
		stuStream.appendChild(streamData);
		tableRow.appendChild(stuStream);

		let stuYear = document.createElement(`td`);
		let yearData = document.createTextNode(year);
		stuYear.appendChild(yearData);
		tableRow.appendChild(stuYear);
		
		let btn1 = document.createElement(`td`);
		let editBtn = document.createElement(`button`);

		editBtn.className += `glyphicon glyphicon-edit`;
		editBtn.addEventListener(`click`, function(){
			editSetting(rollno);
		});
		btn1.appendChild(editBtn);
		tableRow.appendChild(btn1);

		let btn2 = document.createElement(`td`);
		let deleteBtn = document.createElement(`button`);
		deleteBtn.className += `glyphicon glyphicon-trash`;
		deleteBtn.addEventListener(`click`, function(){
			delete_entry(rollno);
		});
		deleteBtn.id = rollno;
		btn1.appendChild(deleteBtn);
		tableRow.appendChild(btn2);

		let table = document.getElementById(`tbody`);
		table.appendChild(tableRow);
		document.getElementById(`form1`).reset();
		document.getElementById(`btnClose`).click();
	}
});


/*
	Called when initially table is called when page loads.
	Inserts inbuilt values.
*/
function initiateTable() {
	document.getElementById(`name`).value=`Avleen Kaur`;
	document.getElementById(`stream`).value=`CSE`;
	document.getElementById(`roll`).value=`1510991138`;
	document.getElementById(`passYear`).value=`2019`;
	$('#submitBtn').trigger('click');
	
	document.getElementById(`name`).value=`Garima Nanda`;
	document.getElementById(`stream`).value=`CSE`;
	document.getElementById(`roll`).value=`1510991205`;
	document.getElementById(`passYear`).value=`2019`;
	$('#submitBtn').trigger('click');

	document.getElementById(`name`).value=`Gaganpreet Kaur`;
	document.getElementById(`stream`).value=`CSE`;
	document.getElementById(`roll`).value=`1510991204`;
	document.getElementById(`passYear`).value=`2019`;
	$('#submitBtn').trigger('click');
}
