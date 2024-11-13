function openPlayerConfig (event) {
    editedPlayer= +event.target.dataset.playerid; //we can use dataset because we use the data property in the html     
    //with the + we are converting the string this is returning to a number +'1' => 1
    playerConfigOverlayElement.style.display = 'block';
    backdropElement.style.display = 'block';
}

function closePlayerConfig () {
    playerConfigOverlayElement.style.display = 'none';
    backdropElement.style.display = 'none';
    formElement.firstElementChild.classList.remove('error');
    errorsOutputElement.textContent = '';
    formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event){ //with a form, as soon as we click on confirm, it reloads the page
    event.preventDefault();       //and send the info to a server, with this we stop the automatic behavior, and we can now control the info submited
    const formData = new FormData(event.target); //we use a constructor to target the input entered
    const enteredPlayerName = formData.get('playername').trim(); //we get and store the typed name into a constant using .get
   //.trim() is used to get rid of the unnecessary white spaces in a String, and if nothing but blanks is entered, it returns an empty string 
   //and empty string is considered a falsy value, it returns false if used in a place where a boolean is expected  
   if(!enteredPlayerName){ //so if .trim() returns an empty string, then enteredPlayerName will be cosidered false if we read it as a boolean
        event.target.firstElementChild.classList.add('error');    
        errorsOutputElement.textContent = 'Please enter a valid name!';
        return; //here we use return as a way to stop the function from executing, so the lines after it wont execute if we enter the if condition
   }

   const updatedPlayerDataElement = document.getElementById('player-'+ editedPlayer + '-data');
   updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

   players[editedPlayer - 1].name = enteredPlayerName;

   closePlayerConfig();
}                                               