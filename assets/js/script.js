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

const players = [
    {id: 1, name: 'ERLING HAALAND', position: 'CF', nationality: 'Norway', rating: 97},
    {id: 2, name: 'KYLIAN MBAPPÉ', position: 'CF', nationality: 'France', rating: 97},
    {id: 3, name: 'LIONEL MESSI', position: 'RWF', nationality: 'Argentina', rating: 97},
    {id: 4, name: 'KEVIN DE BRUYNE', position: 'CMF', nationality: 'Belgium', rating: 96},
    {id: 5, name: 'MOHAMED SALAH', position: 'RWF', nationality: 'Egypt', rating: 95},
];

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

function renderFormation() {
    formationElement.innerHTML = '';
    formations[selectedFormation].forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        row.forEach(position => {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.onclick = () => openModal(position.index);
            if (selectedPlayers[position.index]) {
                const player = selectedPlayers[position.index];
                card.innerHTML = `
                    <div class="rating">${player.rating}</div>
                    <div class="position">${position.name}</div>
                    <div class="player-name">${player.name}</div>
                `;
            } else {
                card.innerHTML = `
                    <div class="position">${position.name}</div>
                    <div class="add-icon">+</div>
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
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="rating">${player.rating}</div>
            <div class="position">${player.position}</div>
            <div class="player-name">${player.name}</div>
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

// Initialize
renderFormation();

// Populate nationality filter
const nationalities = [...new Set(players.map(p => p.nationality))];
nationalities.forEach(nationality => {
    const option = document.createElement('option');
    option.value = nationality;
    option.textContent = nationality;
    nationalityFilter.appendChild(option);
});