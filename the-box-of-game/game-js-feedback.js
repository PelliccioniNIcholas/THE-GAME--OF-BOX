document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let feedback = document.getElementById("feedback").value;

    // Puoi fare qualcosa con il feedback qui, come inviarlo a un server tramite una richiesta Ajax.

    // Esempio di output del feedback nella console:
    console.log("Feedback:", feedback);
  });

function gameEnds() {
  document.getElementById("feedbackForm").style.display = "block";
}
