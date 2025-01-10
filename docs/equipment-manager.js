// Get the form and table elements
const equipmentForm = document.getElementById('equipment-form');
const equipmentTable = document.getElementById('equipment-table');

// Load the equipment data from the JSON file
fetch('equipment.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((equipment, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${equipment.name}</td>
        <td>${equipment.mainStat}</td>
        <td>${equipment.subStat}</td>
        <td>${equipment.rolls}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;
      equipmentTable.appendChild(row);
    });
  });

// Handle form submission
equipmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the form data
  const name = document.getElementById('equipment-name').value;
  const mainStat = document.getElementById('main-stat').value;
  const subStat = document.getElementById('sub-stat').value;
  const rolls = document.getElementById('rolls').value;

  // Create a new equipment object
  const newEquipment = {
    name,
    mainStat,
    subStat,
    rolls,
  };

  // Load the equipment data from the JSON file
  fetch('equipment.json')
    .then(response => response.json())
    .then(data => {
      // Add the new equipment to the data
      data.push(newEquipment);

      // Save the updated data to the JSON file
      fetch('equipment.json', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          // Clear the form
          document.getElementById('equipment-name').value = '';
          document.getElementById('main-stat').value = '';
          document.getElementById('sub-stat').value = '';
          document.getElementById('rolls').value = '';

          // Reload the equipment table
          equipmentTable.innerHTML = '';
          data.forEach((equipment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${equipment.name}</td>
              <td>${equipment.mainStat}</td>
              <td>${equipment.subStat}</td>
              <td>${equipment.rolls}</td>
              <td><button class="delete-btn">Delete</button></td>
            `;
            equipmentTable.appendChild(row);
          });
        });
    });
});

// Handle delete button clicks
equipmentTable.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    event.target.closest('tr').remove();

    // Load the equipment data from the JSON file
    fetch('equipment.json')
      .then(response => response.json())
      .then(data => {
        // Update the JSON file
        fetch('equipment.json', {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
  }
});