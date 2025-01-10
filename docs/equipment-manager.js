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
        <td>${equipment.gearSlot}</td>
        <td>${equipment.rarityTier}</td>
        <td>${equipment.levelRefinement}</td>
        <td>${equipment.basicStat1}</td>
        <td>${equipment.basicStat2}</td>
        <td>${equipment.substats.join(', ')}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;
      equipmentTable.appendChild(row);
    });
  });

// Handle form submission
equipmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the form data
  const gearSlot = document.getElementById('gear-slot').value;
  const rarityTier = document.getElementById('rarity-tier').value;
  const levelRefinement = document.getElementById('level-refinement').value;
  const basicStat1 = document.getElementById('basic-stat-1').value;
  const basicStat2 = document.getElementById('basic-stat-2').value;
  const substat1 = document.getElementById('substat-1').value;
  const substat2 = document.getElementById('substat-2').value;
  const substat3 = document.getElementById('substat-3').value;

  // Create a new equipment object
  const newEquipment = {
    gearSlot,
    rarityTier,
    levelRefinement,
    basicStat1,
    basicStat2,
    substats: [substat1, substat2, substat3],
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
          document.getElementById('gear-slot').selectedIndex = 0;
          document.getElementById('rarity-tier').value = '';
          document.getElementById('level-refinement').value = '';
          document.getElementById('basic-stat-1').value = '';
          document.getElementById('basic-stat-2').value = '';
          document.getElementById('substat-1').value = '';
          document.getElementById('substat-2').value = '';
          document.getElementById('substat-3').value = '';

          // Reload the equipment table
          equipmentTable.innerHTML = '';
          data.forEach((equipment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${equipment.gearSlot}</td>
              <td>${equipment.rarityTier}</td>
              <td>${equipment.levelRefinement}</td>
              <td>${equipment.basicStat1}</td>
              <td>${equipment.basicStat2}</td>
              <td>${equipment.substats.join(', ')}</td>
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