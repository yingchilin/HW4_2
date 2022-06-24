/*
File: script.js
GUI Assignment: Use jQuery Plugin/UI to generate dynamic multiplication table based on user inputs and save them in a jQuery UI tabbed interface.
Yingchi Lin, UMass Lowell Computer Science, yingchi_Lin@student.uml.edu
Copyright (c) 2022 by Yingchi. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
June 23, 2022
*/


function multiplicationTable() {
  var table = "<table>";
  table='<table id="mtable">';
  table = table + "<tr><th></th>";
  
  // Get the input values
  var min_col= parseInt(document.getElementById("min_col").value);
  var max_col= parseInt(document.getElementById("max_col").value);
  var min_row= parseInt(document.getElementById("min_row").value);
  var max_row= parseInt(document.getElementById("max_col").value);
     
 
  // The header row
  for (var x=min_col; x<=max_col; x++) {
      table = table + "<th>" + x + "</th>";
  }
  table = table + "</tr>";

  // The body of the table
  for (y=min_row; y<=max_row; y++) {
       table = table + "<tr>"; // New row
       table = table + "<th>" + y + "</th>"; // Row index

  // The table cells
  for (x=min_col; x<=max_col; x++) {
      table = table + "<td>" + (x*y) + "</td>";
      }

  // The row ending tag
  table = table + "</tr>"; 
  }
  
  // Add the table to html
  table+='</table>';
  document.getElementById("result").innerHTML = table;
}

// Function to remove all tabs
function Remove(){
  
  $("#myTabs").find(".ui-tabs-tab").remove();
  $("#myTabs").find(".ui-tabs-panel").remove();
  $("#myTabs").tabs("refresh");
 
}

var counter = 1;  

// Function to add tabs
function addTab() {

  var tabs = $("#myTabs").tabs(); 
  var minRow = parseInt(document.getElementById("min_row").value);  
  var maxRow = parseInt(document.getElementById("max_row").value);  
  var minCol = parseInt(document.getElementById("min_col").value);  
  var maxCol = parseInt(document.getElementById("max_col").value);  


  // append tabs title and delete button
  // https://jqueryui.com/tabs/#manipulation
  var tabLabel = "(" + minCol + ", " + maxCol + ", " +  minRow + ", " + maxRow + ")";  
  var listItem = "<li><a href='#" + "tab" + counter + "'>" + tabLabel + "</a>" +
  "<span class='ui-icon ui-icon-close' role='presentation'></span>"+ "</li>"
  
  tabs.find(".ui-tabs-nav").append(listItem); 
  
  // puts the table into a div
  tabs.append("<div id='" + "tab" + counter + "'>" + $("#result").html() + "</div>");  
  tabs.tabs("refresh"); 
  counter++;

  // close icon
  $(".ui-icon-close").on( "click", function() {
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    $("#myTabs").tabs("refresh");
  });

}


$(document).ready(function() {
    /* Add a custom validation method: https://jqueryvalidation.org/jQuery.validator.addMethod/ */
    $.validator.addMethod("greater_equal", function (value, element, param) {
    return this.optional(element) || parseInt(value) >= parseInt($(param).val());
    }, "Wrong value");

    /* Add a custom validation method: https://jqueryvalidation.org/jQuery.validator.addMethod/ */
    /* To validate if it is a decimal number: https://www.w3schools.com/jsref/jsref_indexof.asp */
    $.validator.addMethod('no_decimal', function (value, element, param) {
    return this.optional(element) || value.indexOf('.') < 0;
    }, "Integers only");

    $( "#input" ).validate({
      rules: {
        min_col : {
          required: true,
          number: true,
          min: -50,
          max: 50,
          no_decimal: true
        },
        max_col: {
          required: true,
          number: true,
          min: -50,
          max: 50,
          no_decimal: true,
          greater_equal: "#min_col"
        },
        min_row: {
           required: true,
           number: true,
           min: -50,
           max: 50,
           no_decimal: true
        },
        max_row: {
           required: true,
           number: true,
           min: -50,
           max: 50,
           no_decimal: true,
           greater_equal: "#min_row"
        }
      },
      messages : {
        min_col: {
          required: "Please enter an integer",
          number: "Please enter numbers",
          max: "The maximum column should not be more than 50",
          min: "The minimum column should not be less than -50",
          no_decimal: "Please enter only integers no decimal",
        },
        max_col: {
          required: "Please enter an integer",
          number: "Please enter numbers",
          max: "The maximum column should not be more than 50",
          min: "The minimum column should not be less than -50",
          no_decimal: "Please enter only integers no decimal",
          greater_equal: "The value of maximum column should be greater than or equal to minimun column value."
        },
        min_row: {
          required: "Please enter an integer",
          number: "Please enter numbers",
          max: "The maximum row should not be more than 50",
          min: "The minimum row should not be less than -50",
          no_decimal: "Please enter only integers no decimal",
        },
        max_row: {
          required: "Please enter an integer",
          number: "Please enter numbers",
          max: "The maximum row should not be more than 50",
          min: "The minimum row should not be less than -50",
          no_decimal: "Please enter only integers no decimal",
          greater_equal: "The value of maximum row should be greater than or equal to minimun row value."
        }
      }
    });
   
    $("#generate").on('click', function(){
      if($("#input").valid())
      {
        addTab();
      }
      else{
          return 0;
      }
  });

  /* update inputs value and table when slider moved */
  /* https://codepen.io/DaveA/pen/nzpPee */
  
  function update_input() {
      colMinVal = $( "#min_col_slider" ).slider( "value" ),
      colMaxVal = $( "#max_col_slider" ).slider( "value" ),
      rowMinVal = $( "#min_row_slider" ).slider( "value" ),
      rowMaxVal = $( "#max_row_slider" ).slider( "value" );

      $( "#min_col" ).val(colMinVal);
      $( "#max_col" ).val(colMaxVal);
      $( "#min_row" ).val(rowMinVal);
      $( "#max_row" ).val(rowMaxVal);

      $( "#min_col" ).focus();
      multiplicationTable();
      $( "#max_col" ).focus();
      multiplicationTable();
      $( "#min_row" ).focus();
      multiplicationTable();
      $( "#max_row" ).focus();
      multiplicationTable();
  }

  /* initialize each slider: https://codepen.io/DaveA/pen/nzpPee */
  $( "#min_col_slider" ).slider({
    range: "min",
    min: -50,
    max: 50,
    value: 1,
    slide: update_input,
    change: update_input
  });

  $( "#max_col_slider" ).slider({
    range: "min",
    min: -50,
    max: 50,
    value: 1,
    slide: update_input,
    change: update_input
  });

  $( "#min_row_slider" ).slider({
    range: "min",
    min: -50,
    max: 50,
    value: 1,
    slide: update_input,
    change: update_input
  });

  $( "#max_row_slider" ).slider({
    range: "min",
    min: -50,
    max: 50,
    value: 1,
    slide: update_input,
    change: update_input
  });
  
    
});

  

  
