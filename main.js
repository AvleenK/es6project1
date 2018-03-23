$(document).ready(function(){
	//initializes table when page loads
	$(`.container`).hide().fadeIn(1000);
	initiateTable();
});
$(document).on('click','#btnClose',()=> {	

	document.getElementById(`btnClose`).click();

	//reset form when closed
	document.getElementById(`form1`).reset();

	//to ensure that roll no is not changed when 
	//editing an existing row
	document.getElementById(`roll`).disabled = false;

	//edit button shows when editing an existing row
	document.getElementById(`editBtn`).style.display = `none`;

	//submit button shows when entering a new row
	document.getElementById(`submitBtn`).style.display = `inline`;
});

$(document).on('click','#editBtn',()=> {

	//runs when edit button is clicked
	let name = document.getElementById(`name`).value;
	let stream = document.getElementById(`stream`).value;
	let year = document.getElementById(`passYear`).value;
	if(name == `` || stream == `` || year == ``) {
		window.alert(`FIELDS CANNOT BE NULL`);
	}
	else {
		let a = document.getElementsByTagName(`tr`);
		for(let val of a) {
			let row = val.childNodes[1].innerHTML;
			if(row == document.getElementById(`roll`).value) {
				val.childNodes[2].innerHTML = name;
				val.childNodes[3].innerHTML = stream;
				val.childNodes[4].innerHTML = year;
			}
		}
		$(`#btnClose`).trigger(`click`);
	}
	
});
function editSetting(rollno) {
	document.getElementById(`roll`).value = parseInt(rollno);
	document.getElementById(`roll`).disabled = `true`;
	document.getElementById(`register`).click();
	document.getElementById(`editBtn`).style.display = `inline`;
	document.getElementById(`submitBtn`).style.display = `none`;
}
let delete_entry = (rollno)=>{
	let a = document.getElementsByTagName(`tr`);
	let table = document.getElementById(`table`);
	let i = 0;
	
	for(let val of a) {
		let row = val.childNodes[1].innerHTML;
		if(parseInt(row) == parseInt(rollno)) {
			table.deleteRow(i);
		}
		i++;
	}
}

$(document).on('click','#deleteSelected',()=> {		
	var a = document.getElementsByName("CHECKBOXES");
	var arr = new Array();
	for(let val of a) {
		if(val.checked) {
			arr.push(val.id);
		}
	}
	for(let val of arr){
		delete_entry(val);
	}
});

$(document).on('click','#submitBtn',()=> {

	let name = document.getElementById(`name`).value;
	let stream = document.getElementById(`stream`).value;
	let rollno = document.getElementById(`roll`).value;
	let year = document.getElementById(`passYear`).value;
	if(rollno == `` || name == `` || stream == `` || year == ``) {
		window.alert(`FIELDS CANNOT BE NULL`);
	}
	else {
		let a = document.createElement(`tr`);
		let j = document.createElement(`td`);
		let k = document.createElement(`input`);
		k.type = `checkbox`;
		k.name = "CHECKBOXES";
		k.id = rollno;
		j.appendChild(k);
		a.appendChild(j);

		let b = document.createElement(`td`);
		let c = document.createTextNode(rollno);
		b.appendChild(c);
		a.appendChild(b);

		let e = document.createElement(`td`);
		let f = document.createTextNode(name);
		e.appendChild(f);
		a.appendChild(e);

		let m = document.createElement(`td`);
		let n = document.createTextNode(stream);
		m.appendChild(n);
		a.appendChild(m);

		let o = document.createElement(`td`);
		let p = document.createTextNode(year);
		o.appendChild(p);
		a.appendChild(o);
		
		let r = document.createElement(`td`);
		let s = document.createElement(`button`);

		s.className += `glyphicon glyphicon-edit`;
		s.addEventListener(`click`, function(){
			editSetting(rollno);
		});
		r.appendChild(s);
		a.appendChild(r);

		let u = document.createElement(`td`);
		let deleteBtn = document.createElement(`button`);
		deleteBtn.className += `glyphicon glyphicon-trash`;
		deleteBtn.addEventListener(`click`, function(){
			delete_entry(rollno);
		});
		deleteBtn.id = rollno;
		r.appendChild(deleteBtn);
		a.appendChild(u);

		let z = document.getElementById(`tbody`);
		z.appendChild(a);
		document.getElementById(`form1`).reset();
		document.getElementById(`btnClose`).click();
	}
});

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