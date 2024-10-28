/////////////////////
// MODAL FÖR DOKUMENT
/////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
const windowModal = document.querySelector(".window-btn");

// Göra fullskärm i modal window
let isModalOpen = false;
windowModal.addEventListener("click", function () {
  isModalOpen = !isModalOpen;
  modal.style.width = isModalOpen ? "100vw" : "";

  // Lägg till if-sats för att sätta höjden baserat på skärmbredden
  if (window.innerWidth < 500) {
    modal.style.height = isModalOpen ? "88vh" : "";
  } else {
    modal.style.height = isModalOpen ? "99vh" : "";
  }
});

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  initializeBackgroundColor();
}

function closeModal() {
  if (noteText.innerHTML.trim() !== "") {
    alert(
      "Du har osparade ändringar i dokumentet. Stäng dokumentet först efter att du har sparat ändringarna, eller ta bort allt innehåll och stäng igen."
    );
    return;
  }
  if (noteTitle.value !== "" && noteText.innerHTML !== "") {
    showNotes();
  }
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  console.log("ok");
}

// Uppdaterade så bakgrundsfärgen blir vit vid nytt dokumenet
btnsOpenModal.forEach(function (btn) {
  btn.addEventListener("click", function () {
    bakGrundsFargInput.value = "#ffffff";
    openModal();
  });
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////
// MODAL FÖR TRASH
///////////////////

const modalTrash = document.querySelector(".modal_trash");
const overlayTrash = document.querySelector(".overlay_trash");
const btnCloseModalTrash = document.querySelector(".close-modal_trash");
const btnsOpenModalTrash = document.querySelectorAll(".show-modal_trash");

function openModalTrash() {
  modalTrash.classList.remove("hidden_trash");
  overlayTrash.classList.remove("hidden_trash");
}

function closeModalTrash() {
  modalTrash.classList.add("hidden_trash");
  overlayTrash.classList.add("hidden_trash");
}

btnsOpenModalTrash.forEach(function (btn) {
  btn.addEventListener("click", openModalTrash);
});

btnCloseModalTrash.addEventListener("click", closeModalTrash);
overlayTrash.addEventListener("click", closeModalTrash);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalTrash.classList.contains("hidden_trash")) {
    closeModalTrash();
  }
});

closeModalTrash();
////////////////////
// MODAL FÖR SECRET
////////////////////

const modalSecret = document.querySelector(".modal_secret");
const overlaySecret = document.querySelector(".overlay_secret");
const btnCloseModalSecret = document.querySelector(".close-modal_secret");
const btnsOpenModalSecret = document.querySelectorAll(".show-modal_secret");

function openModalSecret() {
  modalSecret.classList.remove("hidden_secret");
  overlaySecret.classList.remove("hidden_secret");
}

function closeModalSecret() {
  password = false;
  modalSecret.classList.add("hidden_secret");
  overlaySecret.classList.add("hidden_secret");
}

// Kollar om passPrompt = valt lösenord
btnsOpenModalSecret.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let passPrompt = prompt("Skriv lösenord");

    // Kontrollera om användaren klickade på "Avbryt" i prompt-rutan
    if (passPrompt === null) {
      closeModalSecret();
      return;
    }

    // Jämför lösenordet
    if (passPrompt === codeWord) {
      password = true;
      openModalSecret();
    } else {
      password = false;
      closeModalSecret();
      alert("Fel lösenord");
    }
  });
});

btnCloseModalSecret.addEventListener("click", closeModalSecret);
overlaySecret.addEventListener("click", closeModalSecret);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalSecret.classList.contains("hidden_secret")) {
    closeModalSecret();
  }
});

closeModalSecret();

////////////////////
//// MUSIK SPELAREN
////////////////////

// Definierar en asynkron funktion som hämtar låtar från Jamendo Music API.
async function getTracks() {
  const apiKey = "68b0f796"; // Min API-nyckel för Jamendo.com.
  // Skapar URL:en för API-anropet med min API-nyckel.
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${apiKey}&format=jsonpretty&limit=10&tags=rock,pop&include=musicinfo&order=releasedate_desc`;

  // Använder try-catch för att hantera eventuella fel under API-anropet.
  try {
    const response = await fetch(url); // Gör API-anropet och väntar på svaret.
    const data = await response.json(); // Konverterar svaret till JSON-format.

    // Kontrollerar om API-anropet lyckades och om det finns några låtar i svaret.
    if (data.headers.status === "success" && data.results.length > 0) {
      updateTrackList(data.results); // Uppdaterar låtlistan med de hämtade låtarna.
    } else {
      console.error(
        "No tracks were found or there was an error in the API call"
      ); // Felmeddelande.
    }
  } catch (error) {
    console.error("Error fetching tracks", error); // Loggar eventuella fel som inträffar under API-anropet.
  }
}

// Funktion för att uppdatera låtlistan i användargränssnittet.
function updateTrackList(tracks) {
  const selectElement = document.getElementById("väljMusik"); // Hämtar <select>-elementet med ID 'väljMusik'.

  // Loopar igenom varje låt i låtlistan.
  tracks.forEach((track) => {
    const option = document.createElement("option"); // Skapar ett nytt option-element för varje låt.
    option.value = track.audio; // Sätter ljudfilens URL som värdet på option-elementet.
    option.textContent = track.name; // Sätter låtens namn som textinnehåll i option-elementet.
    selectElement.appendChild(option); // Lägger till option-elementet i select-elementet.
  });
}

// Lägger till en event listener som anropar 'getTracks' när webbsidan har laddats helt.
document.addEventListener("DOMContentLoaded", getTracks);

// Här hämtas musiken från HMTL.
document.getElementById("väljMusik").addEventListener("change", function (e) {
  let audioPlayer = document.getElementById("audioPlayer");
  if (this.value) {
    audioPlayer.src = this.value;
    audioPlayer.play();
  } else {
    audioPlayer.pause(); // Stoppar musikuppspelningen om "Choose music" är valt
  }
});
