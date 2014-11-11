if (typeof pipwerks.SCORM != "undefined") {
   alert("pipwerks.scorm is OK");
}

var scorm = pipwerks.SCORM; // Setup the scorm object from the Pipwerks object
var lmsConnected = false; // Not connected initially




// Basic form handling
function initForm(){
    document.getElementById("myform").onsubmit = function (){
    this.innerHTML = "Thank you, your selection has been recorded. You may close this window.";
    setComplete();
    return false; // This prevents the browser from trying to post the form results
  }
}

// Setup the form
window.onload = function (){
  
  initCourse();
  initForm();
};





// Error handling
function handleError(msg){
   alert(msg);
//   window.close();
}

// Initialise package
function initCourse(){
    //Specify SCORM 1.2:
    scorm.version = "1.2";
//    show("Initializing course.");

    


   //scorm.init returns a boolean
   lmsConnected = scorm.init();
//   show("Call succeeded? " + lmsConnected);
   //If the scorm.init function succeeded...
   if(lmsConnected){
      //Let's get the completion status to see if the course has already been completed
      var completionstatus = scorm.get("cmi.core.lesson_status");
      //If the course has already been completed...
      if(completionstatus == "completed" || completionstatus == "passed"){
         //...let's display a message and close the browser window
         handleError("You have already completed this course. You do not need to continue.");
      }
      //Now let's get the username from the LMS
      var learnername = scorm.get("cmi.core.student_name");
      //If the name was successfully retrieved...
      if(learnername){  
         //...let's display the username in a page element named "learnername"
         document.getElementById("learnername").innerHTML = learnername; //use the name in the form
      }
   //If the course couldn't connect to the LMS for some reason...
   } else {
      //... let's alert the user then close the window.
      handleError("Error: Course could not connect with the LMS");
   }
}

function setComplete(){
   //If the lmsConnection is active...
   if(lmsConnected){
    
      //... try setting the course status to "completed"
      var success = scorm.set("cmi.core.lesson_status", "completed");
      //If the course was successfully set to "completed"...
      if(success){
         //... disconnect from the LMS, we don't need to do anything else.
         scorm.quit();
      //If the course couldn't be set to completed for some reason...
      } else {
         //alert the user and close the course window
         handleError("Error: Course could not be set to complete!");
      }
   //If the course isn't connected to the LMS for some reason...
   } else {
      //alert the user and close the course window
      handleError("Error: Course is not connected to the LMS");
   }
}



function send(){ // Set suspend data example

    var field = document.getElementById("userText"),
        value = "Placeholder text";
    
    if(field.value !== null && field.value !== ""){
        value = field.value;
    }
    
    set('cmi.suspend_data', value);

}

// TO DO

// Look into holding an array of all the 'pages' - use this to mark which ones have been viewed
