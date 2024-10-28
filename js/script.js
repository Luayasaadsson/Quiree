///////////////
// DARK MODE
//////////////

const body = document.querySelector("body");
const toggle = document.getElementById("toggle");
toggle.onclick = function () {
  toggle.classList.toggle("active");
  body.classList.toggle("active");
};

///////////////////////////////////
//// HÄR KOMMER STYLING TEXT/DOC ///
///////////////////////////////////

// Textfärg
const textFargInput = document.getElementById("textFarg");
textFargInput.addEventListener("input", function () {
  TextColor(this.value);
});
function TextColor(color) {
  document.getElementById("noteText").style.color = color;
}
//Bakgrundsfärg
const bakGrundsFargInput = document.getElementById("bakgrund");
bakGrundsFargInput.addEventListener("input", function () {
  bcgColor(this.value);
});
function bcgColor(color) {
  noteText.style.backgroundColor = color;
}

// För att återställa modal-doc färger samt i edit
const defaultBackgroundColor = "#fff";
function initializeBackgroundColor(isNewNote) {
  const defaultBackgroundColor = "#fff";

  if (isNewNote || !bakGrundsFargInput.value) {
    bakGrundsFargInput.value = defaultBackgroundColor;
    bakGrundsFargInput.style.backgroundColor = defaultBackgroundColor;
    noteText.style.backgroundColor = defaultBackgroundColor;
  }
}

///////////////////////////////
// Functioner för spara dokumenet
////////////////////////////////

/// Kod för input rutorna
const noteBtn = document.getElementById("add-btn"),
  noteTitle = document.getElementById("note-title"),
  noteText = document.getElementById("noteText");
let notesObj = [];

// Här tas inlägget från local storage
function getNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

///////////////
// Inläggets btn event listener "Spara"
////////////////////

noteBtn.addEventListener("click", () => {
  if (noteTitle.value == "" || noteText.innerHTML == "") {
    return alert("Lägg till titel och text innan");
  }

  todaysDate = documentCreated(); // För att få in datum functionen
  getNotes(); // notesObj array
  noteText.style.backgroundColor = bakGrundsFargInput.value;
  let myObj = {
    title: noteTitle.value,
    text: noteText.innerHTML,
    textFarg: textFargInput.value,
    bakgrund: bakGrundsFargInput.value,
    createdDate: todaysDate,
  };

  /// Pushar objektet in i "showNotes"
  notesObj.unshift(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  // Återställer inputrutan och textarea
  noteTitle.value = "";
  noteText.innerHTML = "";
  document.getElementById("textFarg").value = "#000000";
  document.getElementById("noteText").style.color = "#000000";

  initializeBackgroundColor(true); // true för ny anteckning

  closeModal();
  showNotes();
});

/////// HÄR BÖRJAR FÖR "Tidigare Dokument"
// Visar inlägget på sidan
function showNotes() {
  getNotes();
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<a href="#">
    <div class="text">
      <svg onclick="favourite(${index})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="star">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
      
      <div class="text_content" style="background-color: ${
        element.bakgrund || "white"
      }; color: ${element.textFarg || "black"};">
      <div class="text_format">
      ${element.text} </div>
      </div>
      <div class="text_info">
        <button id="${index}" onclick="editNote(this.id)" class="btn_edit">Edit</button>
        <button class="btn_edit btn_delete" onclick="trash(${index})" >Ta bort</button>
        <div class="text_info_lock">
        <h4 class="text_info_header">${element.title.slice(0, 15)}</h4>
        <img
      class="lock_2"
      src="./images/lock-svgrepo-com.svg"
      alt="bild på lås"
      onclick="secret(${index})"
    /> </div>
        <p class="text_info_date">Uppdaterades <span id="labelDate">${
          element.createdDate
        }</span></p>
      </div>
    </div>
  </a>`;
  });
  let noteElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = "Finns inga dokument att se";
  }
}

/////////////////////////////////
// function för att visa favoriter
////////////////////////////////////
function getFavs() {
  let favorites = localStorage.getItem("favorites");
  if (favorites == null) {
    favArrar = [];
  } else {
    favArrar = JSON.parse(favorites);
  }
}

function showFavorites() {
  getFavs();
  let favHtml = "";
  favArrar.forEach(function (element) {
    favHtml += `<div class="header_templates_flex_favourite">
    <svg onclick="leaveFavourite(${favArrar.indexOf(
      element
    )})" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="star_fav">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
</svg>
    <a href="#"
      ><div class="templates_favourite templates_white_favourite" style="background-color: ${
        element.bakgrund || "white"
      };"> <div class="text_content" style="color: ${
      element.textFarg || "black"
    };">
    <div class="text_format_2">
    ${element.text} </div></div>
      </div></a
    >
    <h3 class="template_name_favourite">${element.title.slice(0, 15)}</h3>
    <p class="template_theme_favourite">Enklare</p>
  </div>`;
  });

  let favElm = document.getElementById("favs");

  if (favArrar.length !== 0) {
    favElm.innerHTML = favHtml;
  } else {
    favElm.innerHTML = "Inga favoriter ännu";
  }
}

// Funktion för favoriter
let favArrar = [];
function favourite(index) {
  let confirmFav = confirm("Lägg till i favoriter");
  if (confirmFav) {
    getNotes();

    let temp = notesObj.splice(index, 1)[0];
    favArrar.unshift(temp);

    localStorage.setItem("favorites", JSON.stringify(favArrar));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    showFavorites();
  }
}

function leaveFavourite(index) {
  let confirmFav = confirm("Flytta till tidigare dokument?");
  if (confirmFav) {
    getNotes();

    let temp = favArrar.splice(index, 1)[0];
    notesObj.unshift(temp);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("favorites", JSON.stringify(favArrar));

    showNotes();
    showFavorites();
  }
}
//////////////
/// TRASH! ///
//////////////

// Funktion för trash
// Denna funktion används för att hämta papperskorgen från localStorage och uppdatera trashArray.
// Om papperskorgen inte finns/är tom lagras en tom array i trashArray.
function getTrash() {
  let trash = localStorage.getItem("trash");
  if (trash == null) {
    trashArray = [];
  } else {
    trashArray = JSON.parse(trash);
  }
}

// Hur trash viss på sidan
// Denna funktion används för att visa papperskorgen på sidan
// genom att generera en HTML-sträng baserad på innehållet i trashArray.
function showTrash() {
  getTrash();
  let trashHtml = "";
  trashArray.forEach(function (element) {
    trashHtml += `<div class="trash_item" style="background-color: ${
      element.bakgrund || "white"
    }; color: ${element.textFarg || "black"};">
    <div class="trash_color">
      <h1 class="trash_title">${element.title.slice(0, 15)}</h1>
      <button class="delete_this" onclick="deleteTrash(${trashArray.indexOf(
        element
      )})">Ta bort</button>
      <button class="recover_this" onclick="leaveTrash(${trashArray.indexOf(
        element
      )})">Återställ</button>
    </div>
    <p>Slängdes <span id="labelDate">${element.createdDate}</span></p>
  </div>`;
  });

  let trashElm = document.getElementById("trash");

  if (trashArray.length !== 0) {
    trashElm.innerHTML = trashHtml;
  } else {
    trashElm.innerHTML = "Papperskogen är tom";
  }

  // Kod för animationen
  let trashIcon = document.querySelector(".trash-img");
  trashIcon.classList.add("vibrate-animation");

  // Ta bort animationen efter den är klar
  setTimeout(() => {
    trashIcon.classList.remove("vibrate-animation");
  }, 600);
}

// Denna funktion används för att flytta en anteckning till papperskorgen.
// Den hämtar först befintliga anteckningar från localStorage,
// tar bort den valda anteckningen från notesObj och lägger till den i trashArray.
let trashArray = [];
function trash(index) {
  let confirmTrash = confirm("Lägg i papperskorg?");
  if (confirmTrash) {
    getNotes();

    let temp = notesObj.splice(index, 1)[0];
    trashArray.unshift(temp);

    localStorage.setItem("trash", JSON.stringify(trashArray));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    showTrash();
  }
}

function leaveTrash(index) {
  let confirmLeave = confirm("Lägg tillbaka i tidigare dokument?");
  if (confirmLeave) {
    getNotes();

    let temp = trashArray.splice(index, 1)[0];
    notesObj.unshift(temp);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("trash", JSON.stringify(trashArray));

    showNotes();
    showTrash();
  }
}

////////////////////////
// Delete (inuti soptunnan)
////////////////////////

// ta bort ett ett dokumenent

function deleteTrash(index) {
  let confirmDel = confirm("Ta bort det här dokumenent");
  if (confirmDel === true) {
    getTrash();
    trashArray.splice(index, 1);
    localStorage.setItem("trash", JSON.stringify(trashArray));
    showTrash();
    showNotes();
  }
}

// Töm papperskorg function
const deleteAllTrashBtn = document.querySelector(".btn_delete_all");
deleteAllTrashBtn.addEventListener("click", () => deleteAllTrash()); // Skickar index 0 som parameter

function deleteAllTrash() {
  let confirmDel = confirm("Ta bort alla dokumenent");
  if (confirmDel === true) {
    getTrash();
    trashArray.splice(0, trashArray.length);
    localStorage.setItem("trash", JSON.stringify(trashArray));
    showTrash();
    showNotes();
  }
}

// Redigera dokument
function editNote(index) {
  getNotes();

  // tar med värdena från rätt index
  noteTitle.value = notesObj[index].title;
  noteText.innerHTML = notesObj[index].text;
  textFargInput.value = notesObj[index].textFarg;
  bakGrundsFargInput.value = notesObj[index].bakgrund;

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();

  // Uppdaterar färgerna efter valda tidigare i "Edit"
  initializeBackgroundColor(false);
  noteText.style.backgroundColor = bakGrundsFargInput.value;

  // Öpnar modal för edit
  openModal();
}

////////////////////////
//// SÖK FUNCTION /////
//////////////////////

// Function to search for a term in notes
function search(term) {
  term = term.toLowerCase();

  // Filter the notes based on the search term
  let filteredNotes = notesObj.filter((element) =>
    element.title.toLowerCase().includes(term)
  );

  // Display the filtered results
  displaySearchResults(filteredNotes);
}

// Function to display search results
function displaySearchResults(filteredNotes) {
  let html = "";
  const noteElm = document.getElementById("notes");

  filteredNotes.forEach(function (element) {
    // Generate HTML for filtered notes
    html += `
    
    <a href="#">
          <div class="text">
            <svg onclick="favourite(this.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="star">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
      <div class="text_content" style="background-color: ${
        element.bakgrund || "white"
      }; color: ${element.textFarg || "black"};">
      <div class="text_format">
      ${element.text} </div>
      </div>
            <div class="text_info">
             <button id="${notesObj.indexOf(
               element
             )}" onclick="editNote(this.id)" class="btn_edit">Edit</button>
        <button class="btn_edit btn_delete" onclick="trash(this.id)" >Ta bort</button>
              <h4 class="text_info_header">${element.title}</h4>
              <p class="text_info_date">Uppdaterades <span id="labelDate">${
                element.createdDate
              }</span></p>
            </div>
          </div>
        </a>`;
  });

  // Update the notes container with the filtered results
  if (filteredNotes.length !== 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = "Inga matchande dokument.";
  }
}

const searchItem = document.querySelector(".text_info_header");

searchInput.addEventListener("input", function () {
  search(this.value.trim()); // Trim removes leading and trailing whitespaces
});

////////////////////////////////
// Fixa datum så det syns i skapade dokumenent
////////////////////////

function documentCreated() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return `${year}/${month}/${day}`;
}

////////////////////////
//// LÅS FUNCTION /////
//////////////////////
let codeWord;
let password = false;
codeWord = localStorage.getItem("secretCode");

document.addEventListener("keydown", function (event) {
  if (event.key === "§") {
    let code = prompt("Välj ett lösenord till hemliga mappen");
    if (code === "") {
      alert("Du måste välja ett lösenord");
    } else {
      alert(`Ditt lösenord är: ${code}`);
      codeWord = code;
      // Spara det nya lösenordet i localStorage
      localStorage.setItem("secretCode", codeWord);
    }
  }
});

//////////////////
/// SECRET MAPP //
//////////////////

// Hur secret viss på sidan
let secretArray = [];
function getSecret() {
  let secret = localStorage.getItem("secret");
  if (secret == null) {
    secretArray = [];
  } else {
    secretArray = JSON.parse(secret);
  }
}

function showSecret() {
  getSecret();
  let secretHtml = "";
  secretArray.forEach(function (element) {
    secretHtml += `<div class="secret_item" style="background-color: ${
      element.bakgrund || "white"
    }; color: ${element.textFarg || "black"};">
    <div class="secret_color">
      <h1 class="secret_title">${element.title.slice(0, 15)}</h1>
      <button class="recover_this" onclick="leaveSecret(${secretArray.indexOf(
        element
      )})">Återställ</button>
    </div>
    <p>Gömdes <span id="labelDate">${element.createdDate}</span></p>
  </div>`;
  });

  let secretElm = document.getElementById("secret");

  if (secretArray.length !== 0) {
    secretElm.innerHTML = secretHtml;
  } else {
    secretElm.innerHTML = "Inga hemliga dokument";
  }

  // Kod för animationen
  let secretIcon = document.querySelector(".lock");
  secretIcon.classList.add("vibrate-animation");

  // Ta bort animationen efter den är klar
  setTimeout(() => {
    secretIcon.classList.remove("vibrate-animation");
  }, 600);
}

function secret(index) {
  let confirmSecret = confirm("Lås dokumentet?");
  if (confirmSecret) {
    getNotes();

    let temp = notesObj.splice(index, 1)[0];
    console.log(temp);
    secretArray.unshift(temp);
    console.log(secretArray);

    localStorage.setItem("secret", JSON.stringify(secretArray));
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();
    showSecret();
  }
}

/// För att återställa "leave Secret"
function leaveSecret(index) {
  let confirmLeave = confirm("Flytta dokumenent till Tidigare dokument?");
  if (confirmLeave) {
    getNotes();

    let temp = secretArray.splice(index, 1)[0];
    console.log(temp);
    notesObj.unshift(temp);
    console.log(secretArray);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("secret", JSON.stringify(secretArray));

    showNotes();
    showSecret();
  }
}

showNotes();
showFavorites();
showTrash();
showSecret();
