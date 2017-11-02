function buildTable() {
     var body = document.getElementsByTagName('body')[0];                    // first create variables (body is already in HTMl as exception)
     var tbl = document.createElement("table"); 
     tbl.setAttribute("id", "table");
     tbl.style.tableLayout = "fixed"; 
     tbl.setAttribute('border', '1');
     var tbody = document.createElement("tbody"); 
     tbody.setAttribute("id", "tbody"); 
     var thead = document.createElement("thead");      

     var tr = document.createElement("tr");
    /* var th = document.createElement("th"); 
     var txt = document.createTextNode("ID");
     th.appendChild(txt);
     tr.appendChild(th);*/ 

     var th = document.createElement("th");      
     var txt = document.createTextNode("Excercise");
     th.appendChild(txt);
     tr.appendChild(th); 
     
     var th = document.createElement("th"); 
     var txt = document.createTextNode("Reps");
     th.appendChild(txt);
     tr.appendChild(th); 

     var th = document.createElement("th"); 
     var txt = document.createTextNode("Weight");
     th.appendChild(txt);
     tr.appendChild(th); 

     var th = document.createElement("th");
     th.colspan = "2";
     var txt =  document.createTextNode("Date");
     th.appendChild(txt);
     tr.appendChild(th); 

     var th = document.createElement("th"); 
     var txt = document.createTextNode("Measurement");
     th.appendChild(txt);
     tr.appendChild(th); 

     thead.appendChild(tr); 
     tbl.appendChild(thead); 
     tbl.appendChild(tbody); 

     body.appendChild(tbl); 
}

buildTable(); 

function createEditForm(id, exerciseIn, repsIn, weightIn, dateIn, measurementIn) {

    var body = document.getElementsByTagName('body')[0]; 
    var editForm = document.createElement("form"); 
    editForm.setAttribute("id", "editForm");

    var fieldset = document.createElement("fieldset");
    var legend = document.createElement("legend");
    legend.innerText = "Edit row"
    fieldset.appendChild(legend); 

    var exercise = document.createElement("INPUT");
    exercise.setAttribute("type", "text");
    exercise.setAttribute("id", "editExercise"); 
    exercise.setAttribute("name", "editExercise"); 
    exercise.setAttribute("value", exerciseIn); 
    fieldset.appendChild(exercise); 

    var reps = document.createElement("INPUT");
    reps.setAttribute("type", "number");
    reps.setAttribute("id", "editReps"); 
    reps.setAttribute("name", "editReps"); 
    reps.setAttribute("value", repsIn); 
    fieldset.appendChild(reps); 

    var weight = document.createElement("INPUT");
    weight.setAttribute("type", "number");
    weight.setAttribute("id", "editWeight"); 
    weight.setAttribute("name", "editWeight"); 
    weight.setAttribute("value", weightIn); 
    fieldset.appendChild(weight); 

    var newDate = new Date(dateIn); 
    var newYear = newDate.getFullYear(); 
    var newMonth = newDate.getMonth() + 1; 
    var newDay = newDate.getDate(); 


    var date = document.createElement("INPUT");
    date.setAttribute("type", "date");
    date.setAttribute("id", "editDate"); 
    date.setAttribute("name", "editDate"); 
    date.setAttribute("value", newYear + "-" + newMonth + "-" + newDay); 
    fieldset.appendChild(date); 

    var measurement = document.createElement("INPUT");
    measurement.setAttribute("type", "checkbox");
    measurement.setAttribute("id", "editMeasurement"); 
    measurement.setAttribute("name", "editMeasurement"); 

    if (measurementIn == 1) {
         measurement.setAttribute("checked", "yes");
        }

    fieldset.appendChild(measurement); 

    var hiddenId = document.createElement("INPUT"); 
    hiddenId.setAttribute("type", "hidden"); 
    hiddenId.setAttribute("id", "editId"); 
    hiddenId.setAttribute("name", "editId"); 
    hiddenId.setAttribute("value", id); 
    fieldset.appendChild(hiddenId); 

    var button = document.createElement("button");
    button.setAttribute("type", "submit"); 
    button.setAttribute("value", "Submit");
    button.setAttribute("id", "editSubmitButton"); 
    button.innerText = "submit"; 
    fieldset.appendChild(button); 

    button.addEventListener('click', function(event) {
        var editForm = document.getElementById('editForm');
        var req = new XMLHttpRequest(); 

        var parameters = "editExercise="+editForm.elements.editExercise.value + 
                        "&editReps="+editForm.elements.editReps.value + 
                        "&editWeight="+editForm.elements.editWeight.value + 
                        "&editDate="+editForm.elements.editDate.value;

        var measurementBool; 

        if (editForm.elements.editMeasurement.checked) {
            measurementBool = "&editMeasurement=1";
        }
        else {
            measurementBool = "&editMeasurement=0"; 
        }  

        var id = "&editId="+editForm.elements.editId.value; 
        req.open("GET", "/edit?" + parameters + measurementBool + id, true);
        req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                
                var response = JSON.parse(req.responseText);
                var inner_data = JSON.parse(response.results); 
                updateTable(inner_data); 


                  //  var old_form = document.getElementById('editForm');
                  //  var new_form = document.createElement('form');
                   // new_tbody.setAttribute("id", 'editForm'); 
                   // old_form.parentNode.removeChild(old_form); 
        
            }
            else {
                console.log('Error in network request:' + request.responseText);
            }
        });
    req.send(null); 
    event.preventDefault();  

});

    editForm.appendChild(fieldset); 
    body.appendChild(editForm); 

}

function insertRow(id, exercise, reps, weight, date, measurement) {
    var tbody = document.getElementById('tbody'); 

    var tr = document.createElement('tr'); 

   /* var td = document.createElement('td'); 
    var txt = document.createTextNode(id); 
    td.appendChild(txt); 
    tr.appendChild(td); */

    var td = document.createElement('td'); 
    var txt = document.createTextNode(exercise); 
    td.appendChild(txt); 
    tr.appendChild(td); 

    var td = document.createElement('td'); 
    var txt = document.createTextNode(reps); 
    td.appendChild(txt); 
    tr.appendChild(td); 

    var td = document.createElement('td'); 
    var txt = document.createTextNode(weight); 
    td.appendChild(txt); 
    tr.appendChild(td); 

    var td = document.createElement('td'); 
    var txt = document.createTextNode(date); 
    td.appendChild(txt); 
    tr.appendChild(td); 

    var td = document.createElement('td');
    var txt = document.createTextNode(measurement); 
    td.appendChild(txt); 
    tr.appendChild(td); 

    var deleteButton = document.createElement("button"); 
    deleteButton.innerText = "Delete"; 
    deleteButton.setAttribute("id", id);
    tr.appendChild(deleteButton); 

    deleteButton.addEventListener('click', function(event, id) {
            var i = 0;

        var req = new XMLHttpRequest(); 

        var parameters = "id="+this.id;

        req.open("GET", "/delete?" + parameters, true);
        req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                
                var response = JSON.parse(req.responseText);
                var inner_data = JSON.parse(response.results); 
                updateTable(inner_data); 
        
            }
            else {
                console.log('Error in network request:' + request.responseText);
            }
        });
    req.send(null); 
    event.preventDefault(); 
}); 

    var editButton = document.createElement("button"); 
    editButton.innerText = "Edit"; 
    editButton.setAttribute("id", id);
    tr.appendChild(editButton); 

    editButton.addEventListener('click', function(event) {
        
        var exercise = this.parentNode.firstChild.innerText;
        var reps = this.parentNode.firstChild.nextSibling.innerText;
        var weight = this.parentNode.firstChild.nextSibling.nextSibling.innerText;
        var date = this.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerText;
        var measurement = this.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerText; 

        createEditForm(this.id, exercise, reps, weight, date, measurement);         
        event.preventDefault(); 
    });

    tbody.appendChild(tr);
}

function updateTable(response) {

    var old_tbody = document.getElementById('tbody');
    var new_tbody = document.createElement('tbody');
    new_tbody.setAttribute("id", 'tbody'); 
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);

    if (document.getElementById('editForm')) {
        var old_form = document.getElementById('editForm');
        //  var new_form = document.createElement('form');
        // new_tbody.setAttribute("id", 'editForm'); 
        old_form.parentNode.removeChild(old_form); 
    }


    var i = 0;
    while (response[i]) {
            insertRow(response[i].id, response[i].name, response[i].reps, response[i].weight, response[i].date, response[i].lbs);
            i++;
    }   

    document.getElementById("table").appendChild(new_tbody);

}
document.getElementById('submitButton').addEventListener('click', function(event) {
    var submitForm = document.getElementById('submitForm'); 
    var req = new XMLHttpRequest(); 

    var parameters = "exercise="+submitForm.elements.exercise.value + 
                    "&reps="+submitForm.elements.reps.value + 
                    "&weight="+submitForm.elements.weight.value + 
                    "&date="+submitForm.elements.date.value;

    var measurementBool; 

    if (submitForm.elements.measurement.checked) {
        measurementBool = "&measurement=1";
    }
    else {
        measurementBool = "&measurement=0"; 
    }

    if (submitForm.elements.exercise.value != "") {


    req.open("GET", "/insert?" + parameters + measurementBool, true);
 	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

    
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var inner_data = JSON.parse(response.results); 
            updateTable(inner_data); 

    
        }
        else {
            console.log('Error in network request:' + request.responseText);
        }
    });
    req.send(null); }
    event.preventDefault(); 
}); 



document.getElementById('displayButton').addEventListener('click', function(event) {
    var displayForm = document.getElementById('displayForm'); 
    if (displayForm.elements.display.checked) {
    var req = new XMLHttpRequest(); 
    req.open("GET", "/display", true);
 	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            
            var response = JSON.parse(req.responseText);
            var inner_data = JSON.parse(response.results); 
            updateTable(inner_data); 
    
        }
        else {
            console.log('Error in network request:' + request.responseText);
        }
    });
    req.send(null);  }
    event.preventDefault();  
}); 

