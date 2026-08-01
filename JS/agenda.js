document.addEventListener("DOMContentLoaded", () => {

  const today = new Date();

  const upcomingContainer = document.getElementById("upcoming-events");
  const pastContainer = document.getElementById("past-events");

  const events = document.querySelectorAll(".agenda-item");

  events.forEach(item => {

    const eventDate = new Date(item.dataset.date);

    if (eventDate < today) {

      pastContainer.appendChild(item);

    } else {

      upcomingContainer.appendChild(item);

    }

  });

});
