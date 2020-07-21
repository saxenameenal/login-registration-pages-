function firstName(){
    var x = document.getElementsByClassName("firstName")[0];
     if (!x.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  }
}

function lastName(){
    var x = document.getElementsByClassName("lastName")[0];
     if (!x.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  }
}

function password(){
    var x = document.getElementsByClassName("passW")[0];
}

function displayPassword(){
     const pass_field = document.querySelector('.pass-key');
        const showBtn = document.querySelector('.show');
        showBtn.addEventListener('click', function(){
        if(pass_field.type === "password"){
           pass_field.type = "text";
           showBtn.textContent = "HIDE";
           showBtn.style.color = "#3498db";
        }else{
           pass_field.type = "password";
           showBtn.textContent = "SHOW";
           showBtn.style.color = "#222";
        }
    });
}

function nightmode() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

function logOut(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/logOut", true);
        xhttp.send();
}

function login(){
            var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                app.getProfile();
            } else if (this.readyState == 4 && this.status == 401) {
                console.log("Failed");
            }
        };
        xhttp.open("POST", "/login", true);
}

/*
function addTask(){
    document.getElementById('name').className="show";
    document.getElementById('type').className="show";
    document.getElementById('description').className="show";
    document.getElementById('add').className="show";

}

function tasksubmit(){
       document.getElementById('name').className="hide";
    document.getElementById('type').className="hide";
    document.getElementById('description').className="hide";
    document.getElementById('add').className="hide";
}
*/

function addRow(tableID) {

	var table = document.getElementById(tableID);

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	var colCount = table.rows[0].cells.length;

	for(var i=0; i<colCount; i++) {
    var newcell	= row.insertCell(i);
    newcell.innerHTML = table.rows[0].cells[i].innerHTML;
		//alert(newcell.childNodes);
		switch(newcell.childNodes[0].type) {
			case "text":
				newcell.childNodes[0].value = "";
			break;
			case "checkbox":
				newcell.childNodes[0].checked = false;
			break;
			case "select-one":
				newcell.childNodes[0].selectedIndex = 0;
			break;
		}
	}
}

function deleteRow(tableID) {
	try {
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;

		for(var i=0; i<rowCount; i++) {
			var row = table.rows[i];
			var chkbox = row.cells[0].childNodes[0];

			if(null !== chkbox && true == chkbox.checked) {
				if(rowCount <= 1) {
					alert("Cannot delete all the rows.");
				break;
				}
				table.deleteRow(i);
				rowCount--;
				i--;
			}
        }
	}catch(e) {
		alert(e);
	}
}

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var startYear = 2000;
var endYear = 2020;
var month = 0;
var year = 0;

function loadCalendarMonths() {
    for (var i = 0; i < months.length; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = months[i];
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedMonth = i;
            return function () {
                month = selectedMonth;
                document.getElementById("curMonth").innerHTML = months[month];
                loadCalendarDays();
                return month;
            };
        })();

        document.getElementById("months").appendChild(doc);
    }
}

function loadCalendarYears() {
    document.getElementById("years").innerHTML = "";

    for (var i = startYear; i <= endYear; i++) {
        var doc = document.createElement("div");
        doc.innerHTML = i;
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            var selectedYear = i;
            return function () {
                year = selectedYear;
                document.getElementById("curYear").innerHTML = year;
                loadCalendarDays();
                return year;
            };
        })();

        document.getElementById("years").appendChild(doc);
    }
}

function loadCalendarDays() {
    document.getElementById("calendarDays").innerHTML = "";

    var tmpDate = new Date(year, month, 0);
    var num = daysInMonth(month, year);
    var dayofweek = tmpDate.getDay();       // find where to start calendar day of week

    for (var i = 0; i <= dayofweek; i++) {
        var d = document.createElement("div");
        d.classList.add("day");
        d.classList.add("blank");
        document.getElementById("calendarDays").appendChild(d);
    }

    for (var i = 0; i < num; i++) {
        var tmp = i + 1;
        var c = document.createElement("div");
        c.id = "calendarday_" + i;
        c.className = "day";
        c.innerHTML = tmp;

        document.getElementById("calendarDays").appendChild(d);
    }

    var clear = document.createElement("div");
    clear.className = "clear";
    document.getElementById("calendarDays").appendChild(clear);
}

function daysInMonth(month, year)
{
    var d = new Date(year, month+1, 0);
    return d.getDate();
}

window.addEventListener('load', function () {
    var date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    document.getElementById("curMonth").innerHTML = months[month];
    document.getElementById("curYear").innerHTML = year;
    loadCalendarMonths();
    loadCalendarYears();
    loadCalendarDays();
});
