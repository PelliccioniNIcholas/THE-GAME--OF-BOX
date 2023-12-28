window.onload = function () {
  let urlParams = new URLSearchParams(window.location.search);
  let feedback = urlParams.get("feedback");

  if (feedback) {
    let cardText = document.getElementById("feedback");
    cardText.textContent = feedback;
  }
  console.log(feedback);
};
