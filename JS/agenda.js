document.addEventListener("DOMContentLoaded", () => {

  const today = new Date();

  const upcoming = document.getElementById("upcoming-events");
  const past = document.getElementById("past-events");

  const events = document.querySelectorAll(".agenda-item");

  events.forEach(event => {

    const date = new Date(event.getAttribute("data-date"));

    console.log("Event:", event.querySelector("h3").innerText, date);

    if (date < today) {
      past.appendChild(event);
    } else {
      upcoming.appendChild(event);
    }

  });

});
