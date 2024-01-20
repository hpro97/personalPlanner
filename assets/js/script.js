// ---------------------------------//
// functionality of app:
// ---------------------------------//
//functionality requirements:

// save events for each hour
// html and css powered by jquery
// use day.js for time and day

// display current day at top
// presents timeblocks for business hours
// color code grey done, red current, green future
// when event clicked lets user write
// when save button clicked saves to local storage for text in timebox

//plan of attack:

//1.
//header set date for top of page *use dayjs for this*
    //function for setting day
        //appends.text date to #current day <p> *using jquery*

//2.
//code for creating and appending timeblocks for hours *use jquery for this*
    //function sets class for if is past, present, or future *using dayjs and jquery*
        //if statement for color change is past, present, future *using jquery*
        //sets color of block by class *using jquery* .past/present/future

//3.
//code for retrieving local storage of text in timeblocks *use local storage get for this*
    //makes text in block appear from local storage *using jquery*

//4.
//click event for each block when clicked can write *use jquery for this*

//5.
//click event for save button when clicked can save text in block to local storage *use local storage get and set for this*

// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//queryselectors for all//
// ---------------------------------//
let currentDayEl = $("#currentDay") //span displays current date
let containerEl = $(".container") //div dispalys container for timeblocks

// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//define initial variables//
// ---------------------------------//
let hours = [
    07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18,
]

// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//convenience variables//
// ---------------------------------//
let currentDay = dayjs(); //using day js library to set current day with funciton

// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//functions i think i'll need
// ---------------------------------//
function setDay() {
    //set current day in header
    //use dayjs for this
    //append current day to header
$(currentDayEl).text(currentDay.format("dddd d MMMM YYYY"));
//no need to append with jquery
}

function createTimeBlocks() {
    //create timeblocks for business hours
    //use jquery for this
    //set class for if is past, present, or future
    //if statement for color change is past, present, future
    //sets color of block by class
    //append timeblocks to container
    for (let i = 0; i <= hours.length -1; i++) { //initiate for loop in hours array
        const block = //indiviul const for each block
        $(`<form>
            <div class='row time-block'>
                <div class='col-md-2 hour'>
                    ${hours[i]}:00
                </div>
                <textarea class='col-md-8 description textInput' name='textInput'>
                </textarea>
                <button class='col-md-2 saveBtn' type='submit'>
                <i class='fas fa-save'></i>
                </button>
            </div>
        </form>
        `);

        //form for each block, creates row, in row creates col for hour, textarea for description, and button for save
        //creates column occupying 2 spaces of the 12, assigns hour class
        //outs current hour from for loop to textarea
        //text input for later use as class and name
        //type submit for click event
        //<i class='fas fa-save'></i> for icon with floppy disk icon

        //append block to container
        containerEl.append(block);
        
    }
}

function assignColor() {
    //color code grey done, red current, green future
    $(".time-block").each(function(i, block) { //selects all elements with class time-block, goes over each with .each, takes index of hours array and block from previous creation
        if (hours[i] < currentDay.hour()) { //checkks if index is less than current hour
            $(this).addClass("past"); //takes "this" element, in this case the block, and adds class, changing color
        } else if (hours[i] === currentDay.hour()) { //same logic as above
            $(this).addClass("present"); //same logic as above
        } else if (hours[i] > currentDay.hour()) { //same logic as above
            $(this).addClass("future"); //same logic as above
        }
    })
}


// ---------------------------------//
// ---------------------------------//

// ---------------------------------//
//click events & local storage
// ---------------------------------//
$(document).on("submit", "form", function(bananaLULZ) { //note to self bananaLULZ could be anything, intuitively submit would be ideal, but to remember it can be anything, i've set to bananaLULZ 🍌
    bananaLULZ.preventDefault();// prevents relaoding of page on form submission
    //save text of #textInput to local storage for each timeblock
    let textInput = $(bananaLULZ.target).find("textarea[name='textInput']").val().trim(); //target is bananaLULZ, so the submit, finds a text area with atrribute name textInput, and gets the value, trims whitespace
    let hourForLocalStorage = $(bananaLULZ.target).find(".hour").text();//see above
    //check if there is already data for this hour in local storage
    let existingData = localStorage.getItem(`savedData ${hourForLocalStorage}`);
        //f there is existing data
        if (existingData) {
            //updte existing data
            localStorage.setItem(`savedData ${hourForLocalStorage}`, textInput);
        } else {
            //set new value
            localStorage.setItem(`savedData ${hourForLocalStorage}`, textInput);
        }
    console.log(textInput, hourForLocalStorage);
});

function assignStoredText() {
    const timeBlocks = $(".time-block");
    for (let i = 0; i < timeBlocks.length; i++) {
        const hour = $(timeBlocks[i]).find(".hour").text();
        const storedText = localStorage.getItem("savedData " + hour);
        const textarea = $(timeBlocks[i]).find("textarea[name='textInput']");
        textarea.val(storedText);
    }
}


// ---------------------------------//
// ---------------------------------//

setDay();
createTimeBlocks();
assignColor();
assignStoredText();
