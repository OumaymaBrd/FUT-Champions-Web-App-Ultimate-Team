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
                card.innerHTML = `
                      <div class="card-inner">
            <div class="header" style="position: relative; top:-11px;">
                <div class="rating">${player.rating}</div>
                <div class="position">${player.position}</div>
            </div>
            <div class="player-image" style="position: relative; bottom:-18px;">
                <img src="${player.photo}" alt="Mbappé" >
            </div>
            <div class="player-name" >${player.name}</div>
            <div class="stats">
                <div class="stat">
                    <span>PAC</span>
                    <span>${player.pace}</span>
                </div>
                <div class="stat">
                    <span>SHO</span>
                    <span>${player.shooting}</span>
                </div>
                <div class="stat">
                    <span>PAS</span>
                    <span>${player.passing}</span>
                </div>
                <div class="stat">
                    <span>DRI</span>
                    <span>${player.dribbling}</span>
                </div>
                <div class="stat">
                    <span>DEF</span>
                    <span>${player.defending}</span>
                </div>
                <div class="stat">
                    <span>PHY</span>
                    <span>${player.physical}</span>
                </div>
            </div>
            <div class="shine"></div>
            <div class="flags" >
                <img src="${player.flag}" class="flag" id="flag" style="position:relative; bottom:-15px;">
                <img src="${player.logo}" alt="Logo player du foot " id="logo"class="flag">
            </div>
        </div>
                `;
            } else {
                card.innerHTML = `

                <div class="card-inner" style="width:120px; height:120px;">
    <div class="header" style="position: relative; top:-11px;">
       <div ><img id="add-icon"src="../assets/images/icon_add.gif"></img></div>
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
        playerCard.innerHTML = `
    <div class="card-inner">
        <div class="header">
            <div class="rating">${player.rating}</div>
            <div class="position">${player.position}</div>
        </div>
        <div class="player-image">
            <img src="${player.photo}" alt="${player.name}">
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
        <div class="flags">
            <img src="${player.flag}" class="flag" />
            <img src="${player.logo}" class="logo" />
        </div>
    </div>
`;

        playerCard.onclick = () => selectPlayer(player);
        playersGrid.appendChild(playerCard);
    });
}

function selectPlayer(player) {
    selectedPlayers[currentPosition] = player;
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