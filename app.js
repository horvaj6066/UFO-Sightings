// from data.js
var tableData = data; //all the ufo sightings stored here 
var date_selection=[]; //to be used for storing all of the sightings for the particular input date 
//var events=[]
// Get a d3 reference to the table body
var tbody = d3.select("tbody");

// inputField is selecting the input field on the page 
var inputField = d3.select("#datetime");  
var inputField2 = d3.select("#state"); 

 
 //this search thru the data array looking for dates that match user input  
function search_data(input_date, input_state){
    tableData.forEach(function(the_date) {  
    var date= the_date.datetime;
    var state= the_date.state;
    if(input_state==='') {
      state='';
    }
      

    console.log("state ", state);
      if(input_date === date && input_state === state) {
        date_selection.push(the_date); 
        console.log(date, state, " added to date_selection array");
      }   
    });
    console.log(date_selection)
    return(date_selection);
}

function table_entry(tableData){ //actually enters the sightings to the table on the page based on the user input
    console.log("entering table_entry function");
    tableData.forEach(function(table_entry)  {
        var row = tbody.append("tr");
        Object.entries(table_entry).forEach(([key, value]) => {   //runs through one entry of the array (need to match up with user entry) and extracts the value in separate variables and appends to table 
            var cell = tbody.append("td");
            cell.text(value);  //this is where it appends it to the table 
        });
    });
}

    
//var input_date= '1/9/2010';
var input_state = '';
// this is where we get the input as newText

inputField.on("change", function() {
    var input_date = d3.event.target.value;
    console.log("ENTRY IS MADE", input_date);
    var events = search_data(input_date, input_state);  // call the function that searches the sightings for a match and returns array events
    console.log("length of array", events.length);
   
    if(events.length==0) {
      alert("Sorry- no UFO sightings found for that date!")
    }
    //***********it keeps refreshing ************/
    else {
      table_entry(events); //enter the sightings array, events, to the table on the page
    }

});

//table_entry(events); //enter the sightings array, events, to the table on the page

d3.select("#filter-btn").on("click", function(){
  d3.event.preventDefault();

})


//Object.entries(tableData[1]).forEach(([key, value]) => console.log(value)); // this is just console logging each variable in tabledata[x] 
//Object.entries(obj).forEach(([key, value]) => console.log(`${key}: ${value}`)); // found this on-line at Mozilla, could be what I need obj is the var
//Object.entries(tableData[1]).forEach(([key, value]) => console.log(`${value}`)); // this works, spits out the values for the first entry  

 