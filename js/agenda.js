document.addEventListener("DOMContentLoaded", () => {

  const upcomingContainer = document.getElementById("upcoming-events");
  const pastContainer = document.getElementById("past-events");

  if (!upcomingContainer || !pastContainer) {
    console.error("Agenda containers not found.");
    return;
  }


  /*
   * Convert YYYY-MM-DD into a LOCAL date.
   * This avoids timezone problems with new Date("YYYY-MM-DD").
   */
  function parseLocalDate(dateString) {

    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);

  }


  /*
   * Today at midnight.
   * This means an event happening TODAY
   * remains in Upcoming for the whole day.
   */
  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );


  /*
   * Get all events currently in the Upcoming container.
   */
  const events = Array.from(
    upcomingContainer.querySelectorAll(".agenda-item")
  );


  /*
   * Separate events into Upcoming and Past.
   */
  const upcoming = [];
  const past = [];


  events.forEach(event => {

    const dateString = event.dataset.date;

    if (!dateString) {
      console.warn("Event has no data-date:", event);
      return;
    }


    const eventDate = parseLocalDate(dateString);


    if (eventDate >= today) {

      upcoming.push({
        element: event,
        date: eventDate
      });

    } else {

      past.push({
        element: event,
        date: eventDate
      });

    }

  });


  /*
   * UPCOMING:
   * Soonest event first.
   */
  upcoming.sort((a, b) => {
    return a.date - b.date;
  });


  /*
   * PAST:
   * Most recent event first.
   */
  past.sort((a, b) => {
    return b.date - a.date;
  });


  /*
   * Put the events into their correct containers.
   */
  upcoming.forEach(event => {
    upcomingContainer.appendChild(event.element);
  });


  past.forEach(event => {
    pastContainer.appendChild(event.element);
  });


});
