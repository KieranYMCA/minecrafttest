const map = L.map('map').setView([56.4907, -4.2026], 6); // Scotland center

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; YMCA Scotland | OpenStreetMap contributors'
}).addTo(map);

// Load project data
fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(project => {
      const marker = L.marker([project.lat, project.lng]).addTo(map);
      const popup = `
        <h3>${project.name}</h3>
        <p><strong>YMCA:</strong> ${project.ymca}</p>
        <p><strong>Impact:</strong> ${project.impact}</p>
        <p><em>"${project.quote}"</em></p>
        ${project.image ? `<img src="\${project.image}" width="100%">` : ""}
      `;
      marker.bindPopup(popup);
    });
  });

// Live updates
const updates = [
  "Lochaber YMCA just hosted a tree planting day 🌳",
  "Kilmarnock YMCA ran a climate-themed youth workshop 🧑‍🏫",
  "Cumbernauld YMCA installed solar panels ☀️"
];

const updateFeed = document.getElementById('update-feed');
updates.forEach(update => {
  const li = document.createElement('li');
  li.textContent = update;
  updateFeed.appendChild(li);
});