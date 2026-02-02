document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  document.querySelectorAll('.agenda-item').forEach(item => {
    const eventDate = new Date(item.dataset.date);

    if (eventDate < today) {
      document.getElementById('past').appendChild(item);
    } else {
      document.getElementById('upcoming').appendChild(item);
    }
  });
});
