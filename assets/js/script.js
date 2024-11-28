const formations = {
    '4-4-2': [
        [{name: 'CF', index: 0}, {name: 'CF', index: 1}],
        [{name: 'LMF', index: 2}, {name: 'CMF', index: 3}, {name: 'CMF', index: 4}, {name: 'RMF', index: 5}],
        [{name: 'LB', index: 6}, {name: 'CB', index: 7}, {name: 'CB', index: 8}, {name: 'RB', index: 9}],
        [{name: 'GK', index: 10}]
    ],
    '4-3-3': [
        [{name: 'LWF', index: 0}, {name: 'CF', index: 1}, {name: 'RWF', index: 2}],
        [{name: 'CMF', index: 3}, {name: 'DMF', index: 4}, {name: 'CMF', index: 5}],
        [{name: 'LB', index: 6}, {name: 'CB', index: 7}, {name: 'CB', index: 8}, {name: 'RB', index: 9}],
        [{name: 'GK', index: 10}]
    ],
    '3-5-2': [
        [{name: 'CF', index: 0}, {name: 'CF', index: 1}],
        [{name: 'LMF', index: 2}, {name: 'CMF', index: 3}, {name: 'DMF', index: 4}, {name: 'CMF', index: 5}, {name: 'RMF', index: 6}],
        [{name: 'CB', index: 7}, {name: 'CB', index: 8}, {name: 'CB', index: 9}],
        [{name: 'GK', index: 10}]
    ]
};


let selectedFormation = '4-4-2';
let selectedPlayers = Array(11).fill(null);
let currentPosition = null;

const formationElement = document.getElementById('formation');
const lineupSelect = document.getElementById('lineup');
const modal = document.getElementById('playerModal');
const closeBtn = document.getElementsByClassName('close')[0];
const playersGrid = document.getElementById('playersGrid');
const nameFilter = document.getElementById('nameFilter');
const positionFilter = document.getElementById('positionFilter');
const nationalityFilter = document.getElementById('nationalityFilter');
const ratingFilter = document.getElementById('ratingFilter');
const ratingValue = document.getElementById('ratingValue');


fetch('../data/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  
  })
  .then(data => {

    const players = data.players;
    players.forEach(player => {
    function renderFormation() {
    formationElement.innerHTML = '';
    formations[selectedFormation].forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        row.forEach(position => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => openModal(position.index);
            if (selectedPlayers[position.index]) {
                const player = selectedPlayers[position.index];

               
            if (player.position === 'GK') {
                // Appliquer le code spécifique pour les gardiens
                card.innerHTML = `
                  <div class="card-inner">
                    <div class="header" style="position: relative; top:-11px;">
                      <div class="rating">${player.rating}</div>
                      <div class="position">${player.position}</div>
                    </div>
                    <div class="player-image" style="position: relative; bottom:-18px;">
                      <img src="${player.photo}" alt="Mbappé" />
                    </div>
                    <div class="player-name">${player.name}</div>
                    <div class="stats">
                      <div class="stat">
                        <span>DIV</span>
                        <span>${player.diving}</span>
                      </div>
                      <div class="stat">
                        <span>HAN</span>
                        <span>${player.handling}</span>
                      </div>
                      <div class="stat">
                        <span>HIC</span>
                        <span>${player.kicking}</span>
                      </div>
                      <div class="stat">
                        <span>DRI</span>
                        <span>${player.reflexes}</span>
                      </div>
                      <div class="stat">
                        <span>SPE</span>
                        <span>${player.speed}</span>
                      </div>
                      <div class="stat">
                        <span>POS</span>
                        <span>${player.positioning}</span>
                      </div>
                    </div>
                    <div class="shine"></div>
                    <div class="flags">
                      <img src="${player.flag}" class="flag" style="position:relative; bottom:-15px; width:40px;" />
                      <img src="${player.logo}" alt="Logo player" class="flag" style="position:relative; width:40px;" />
                    </div>
                  </div>
                `;
              }  else {
                    // Appliquer le code pour les autres joueurs (non-GK)
                    card.innerHTML = `
                      <div class="card-inner">
                        <div class="header" style="position: relative; top:-11px;">
                          <div class="rating">${player.rating}</div>
                          <div class="position">${player.position}</div>
                        </div>
                        <div class="player-image" style="position: relative; bottom:-18px;">
                          <img src="${player.photo}" alt="${player.name}" />
                        </div>
                        <div class="player-name">${player.name}</div>
                        <div class="stats">
                          <div class="stat"><span>PAC</span><span>${player.pace}</span></div>
                          <div class="stat"><span>SHO</span><span>${player.shooting}</span></div>
                          <div class="stat"><span>PAS</span><span>${player.passing}</span></div>
                          <div class="stat"><span>DRI</span><span>${player.dribbling}</span></div>
                          <div class="stat"><span>DEF</span><span>${player.defending}</span></div>
                          <div class="stat"><span>PHY</span><span>${player.physical}</span></div>
                        </div>
                        <div class="shine"></div>
                        <div class="flags">
                          <img src="${player.flag}" class="flag" style="position:relative; bottom:-15px; width:40px;" />
                          <img src="${player.logo}" alt="Logo player" class="flag" style="position:relative; width:40px;" />
                        </div>
                      </div>
                    `;
                  }
                  // <span id="add_rt">+</span>
                } else {
                card.innerHTML = `
                <div>${position.name}</div>
                  <div class="card-inner" style="width:120px; height:120px;">
                    <div class="header" style="position: relative; top:-11px;">
                    
                      <div><img id="add-icon" src="https://cdn-icons-png.flaticon.com/512/166/166344.png" alt="Add Icon" />
                     
                       <div class="add-icon-container">
        <span class="add-icon">+</span>
      </div>
      
                      </div>

                      
                    </div>
                  </div>
                `;
              }
            rowElement.appendChild(card);
        });
        formationElement.appendChild(rowElement);
    });
}

function openModal(position) {
    currentPosition = position;
    modal.style.display = 'block';
    renderPlayers();
}

function renderPlayers() {
    const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(nameFilter.value.toLowerCase()) &&
        (positionFilter.value === '' || player.position === positionFilter.value) &&
        (nationalityFilter.value === '' || player.nationality === nationalityFilter.value) &&
        player.rating >= parseInt(ratingFilter.value)
    );

    playersGrid.innerHTML = '';
    filteredPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'card-inner';
        // condition 

        if (player.position === 'GK') {
            // Appliquer le code spécifique pour les gardiens
            playerCard.innerHTML = `
              <div class="card-inner">
                <div class="header" style="position: relative; top:-11px;">
                  <div class="rating">${player.rating}</div>
                  <div class="position">${player.position}</div>
                </div>
                <div class="player-image" style="position: relative; bottom:-18px;">
                  <img src="${player.photo}" alt="Mbappé" />
                </div>
                <div class="player-name">${player.name}</div>
                <div class="stats">
                  <div class="stat">
                    <span>DIV</span>
                    <span>${player.diving}</span>
                  </div>
                  <div class="stat">
                    <span>HAN</span>
                    <span>${player.handling}</span>
                  </div>
                  <div class="stat">
                    <span>HIC</span>
                    <span>${player.kicking}</span>
                  </div>
                  <div class="stat">
                    <span>DRI</span>
                    <span>${player.reflexes}</span>
                  </div>
                  <div class="stat">
                    <span>SPE</span>
                    <span>${player.speed}</span>
                  </div>
                  <div class="stat">
                    <span>POS</span>
                    <span>${player.positioning}</span>
                  </div>
                </div>
                <div class="shine"></div>
                <div class="flags">
                  <img src="${player.flag}" class="flag" style="position:relative; bottom:-15px; width:40px;  " />
                  <img src="${player.logo}" alt="Logo player"  style="position:relative; left:200px; width:40px;"  />
                </div>
              </div>
            `;
          }else {
            // Appliquer le code pour les autres joueurs (non-GK)
            playerCard.innerHTML = `
              <div class="card-inner">
                <div class="header" style="position: relative; top:-11px;">
                  <div class="rating">${player.rating}</div>
                  <div class="position">${player.position}</div>
                </div>
                <div class="player-image" style="position: relative; bottom:-18px;">
                  <img src="${player.photo}" alt="${player.name}" />
                </div>
                <div class="player-name">${player.name}</div>
                <div class="stats">
                  <div class="stat"><span>PAC</span><span>${player.pace}</span></div>
                  <div class="stat"><span>SHO</span><span>${player.shooting}</span></div>
                  <div class="stat"><span>PAS</span><span>${player.passing}</span></div>
                  <div class="stat"><span>DRI</span><span>${player.dribbling}</span></div>
                  <div class="stat"><span>DEF</span><span>${player.defending}</span></div>
                  <div class="stat"><span>PHY</span><span>${player.physical}</span></div>
                </div>
                <div class="shine"></div>
                <div class="flags">
                  <img src="${player.flag}" class="flag" style="position:relative; bottom:-15px; width:40px;" />
                  <img src="${player.logo}" alt="Logo player" class="flag" style="position:relative; width:40px;" />
                </div>
              </div>
            `;
          }
        
//         playerCard.innerHTML = `
//     <div class="card-inner">
//         <div class="header" style="position: relative; top:-11px;">
//             <div class="rating">${player.rating}</div>
//             <div class="position">${player.position}</div>
//         </div>
//         <div class="player-image"  style="position: relative; bottom:-18px;">
//             <img src="${player.photo}" alt="${player.name}">
//         </div>
//         <div class="player-name">${player.name}</div>
//         <div class="stats">
//             <div class="stat"><span>PAC</span><span>${player.pace}</span></div>
//             <div class="stat"><span>SHO</span><span>${player.shooting}</span></div>
//             <div class="stat"><span>PAS</span><span>${player.passing}</span></div>
//             <div class="stat"><span>DRI</span><span>${player.dribbling}</span></div>
//             <div class="stat"><span>DEF</span><span>${player.defending}</span></div>
//             <div class="stat"><span>PHY</span><span>${player.physical}</span></div>
//         </div>
//         <div class="flags">
//             <img src="${player.flag}" class="flag" style="position:relative; bottom:-15px; width:40px;"/>
//             <img src="${player.logo}" class="logo" style="position:relative; width:40px;" />
//         </div>
//     </div>
// `;

        playerCard.onclick = () => selectPlayer(player);
       
        playersGrid.appendChild(playerCard);
    });
}

function selectPlayer(player) {
    selectedPlayers[currentPosition] = player;
    alert(currentPosition)
    modal.style.display = 'none';
    
    renderFormation();
}

lineupSelect.onchange = (e) => {
    selectedFormation = e.target.value;
    selectedPlayers = Array(11).fill(null);
    renderFormation();
};

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};

nameFilter.oninput = renderPlayers;
positionFilter.onchange = renderPlayers;
nationalityFilter.onchange = renderPlayers;
ratingFilter.oninput = () => {
    ratingValue.textContent = ratingFilter.value;
    renderPlayers();
};

renderFormation();

// Populate nationality filter
const nationalities = [...new Set(players.map(p => p.nationality))];
nationalities.forEach(nationality => {
    const option = document.createElement('option');
    option.value = nationality;
    option.textContent = nationality;
    nationalityFilter.appendChild(option);
});
});
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});

// creation Formuleaire a remplir pour : Ajouter un joueur 

const create_new=document.getElementById('btn-primary');
const Afficher_formulaire_remplir=document.getElementById('Formulaire_remplir');
create_new.addEventListener('click', function() {
    Afficher_formulaire_remplir.style.display = 'block';
});

// 
