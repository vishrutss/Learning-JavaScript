// Get references to the form elements
var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var form3 = document.getElementById("form3");

// Get references to the navigation buttons
var next1 = document.getElementById("next1");
var next2 = document.getElementById("next2");
var back1 = document.getElementById("back1");
var back2 = document.getElementById("back2");

// Get a reference to the progress bar
var progress = document.getElementById("progress");

// Event handler for next1 button click
next1.onclick = function(){
    // Move form1 to the left and form2 to the center
    form1.style.left = "-450px";
    form2.style.left = "40px";

    // Update the progress bar width
    progress.style.width = "240px";
}

// Event handler for back1 button click
back1.onclick = function(){
    // Move form1 to the center and form2 to the right
    form1.style.left = "40px";
    form2.style.left = "450px";

    // Update the progress bar width
    progress.style.width = "120px";
}

// Event handler for next2 button click
next2.onclick = function(){
    // Move form2 to the left and form3 to the center
    form2.style.left = "-450px";
    form3.style.left = "40px";

    // Update the progress bar width
    progress.style.width = "360px";
}

// Event handler for back2 button click
back2.onclick = function(){
    // Move form2 to the center and form3 to the right
    form2.style.left = "40px";
    form3.style.left = "450px";

    // Update the progress bar width
    progress.style.width = "240px";
}