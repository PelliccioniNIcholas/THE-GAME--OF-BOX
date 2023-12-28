// Genera un numero casuale tra 1 e 20
let numeroCasuale = Math.floor(Math.random() * 20) + 1;

// Numero di tentativi che l'utente ha per indovinare il numero
let tentativiRimasti = 5;

// Highscore
let highscore = localStorage.getItem("highscore") || Infinity;

function tentativo(tentativoUtente) {
  let messageBox = document.getElementById("messageBox");
  let tryAgain = document.getElementById("tryAgain"); // Recupera il pulsante try again
  let check = document.getElementById("check"); // Recupera il pulsante check

  // Verifica se l'input dell'utente è un numero compreso tra 1 e 20
  if (isNaN(tentativoUtente) || tentativoUtente < 1 || tentativoUtente > 20) {
    alert("Inserire un numero valido compreso tra 1 e 20.");
    return; // Esce dalla funzione in caso di input non valido
  }

  if (tentativoUtente == numeroCasuale) {
    messageBox.innerHTML = "Complimenti, hai indovinato il numero!";
    messageBox.style.backgroundColor = "green";
    if (tentativiRimasti < highscore) {
      highscore = tentativiRimasti;
      localStorage.setItem("highscore", highscore);
    }
  } else {
    tentativiRimasti--;
    if (tentativoUtente > numeroCasuale) {
      messageBox.innerHTML = "Troppo grande! ";
      messageBox.style.backgroundColor = "red";
    } else {
      messageBox.innerHTML = "Troppo piccolo... ";
      messageBox.style.backgroundColor = "red";
    }
    if (tentativiRimasti <= 0) {
      messageBox.innerHTML =
        "Mi dispiace, hai esaurito i tentativi. Il numero era " +
        numeroCasuale +
        ".";
      tentativiRimasti = 0;
      console.log(tentativiRimasti);
      numeroCasuale = Math.floor(Math.random() * 20) + 1;
      messageBox.style.backgroundColor = "red";
      tryAgain.style.display = "block"; // Mostra il pulsante try again
      check.style.display = "none"; // Porta il pulsante try again sopra il pulsante check
    }
  }
  document.getElementById("score").innerText = tentativiRimasti;
}

// Funzione per resettare il gioco
function restart() {
  let messageBox = document.getElementById("messageBox");
  let tryAgain = document.getElementById("tryAgain"); // Recupera il pulsante try again
  let check = document.getElementById("check"); // Recupera il pulsante check
  numeroCasuale = Math.floor(Math.random() * 20) + 1; // Genera un nuovo numero casuale
  location.reload(); // Ricarica la pagina
}
