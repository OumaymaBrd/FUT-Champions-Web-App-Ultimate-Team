document.addEventListener('DOMContentLoaded', function() {
    const formations = {
        '4-4-2': [
            [{name: 'ST', index: 0}, {name: 'ST', index: 1}],
            [{name: 'LM', index: 2}, {name: 'CM', index: 3}, {name: 'CM', index: 4}, {name:'RM', index: 5}],
            [{name: 'LB', index: 6}, {name: 'CB', index: 7}, {name: 'CB', index: 8}, {name: 'RB', index: 9}],
            [{name: 'GK', index: 10}]
        ],
        '4-3-3': [
            [{name: 'LW', index: 0}, {name: 'ST', index: 1}, {name: 'RW', index: 2}],
            [{name: 'CM', index: 3}, {name: 'CM', index: 4}, {name: 'CM', index: 5}],
            [{name: 'LB', index: 6}, {name: 'CB', index: 7}, {name: 'CB', index: 8}, {name: 'RB', index: 9}],
            [{name: 'GK', index: 10}]
        ],
        '3-5-2': [
            [{name: 'ST', index: 0}, {name: 'ST', index: 1}],
            [{name: 'LM', index: 2}, {name: 'CM', index: 3}, {name: 'CDM', index: 4}, {name: 'CM', index: 5}, {name: 'RM', index: 6}],
            [{name: 'CB', index: 7}, {name: 'CB', index: 8}, {name: 'CB', index: 9}],
            [{name: 'GK', index: 10}]
        ]
    };

    let currentFormation = localStorage.getItem('currentFormation') || '4-4-2';
    let players = JSON.parse(localStorage.getItem('players')) || [];
    let selectedPlayers = JSON.parse(localStorage.getItem('selectedPlayers')) || Array(11).fill(null);
    let gkSub = JSON.parse(localStorage.getItem('gkSub')) || null;
    let currentPosition = null;

    const formationSelect = document.getElementById('formation');
    const teamNameInput = document.getElementById('team-name');
    const displayTeamName = document.getElementById('display-team-name');
    const formationGrid = document.getElementById('formation-grid');
    const gkSubContainer = document.getElementById('gk-sub');
    const playerModal = document.getElementById('player-modal');
    const createPlayerModal = document.getElementById('create-player-modal');
    const editPlayerModal = document.getElementById('edit-player-modal');
    const playerSearch = document.getElementById('player-search');
    const playersGrid = document.getElementById('players-grid');
    const createPlayerForm = document.getElementById('create-player-form');
    const editPlayerForm = document.getElementById('edit-player-form');
    const createdPlayersContainer = document.getElementById('created-players');
    const successMessage = document.getElementById('success-message');

    // Load saved team name
    teamNameInput.value = localStorage.getItem('teamName') || 'ROYAL STRIKERS';
    displayTeamName.textContent = teamNameInput.value;

    function saveToLocalStorage() {
        localStorage.setItem('currentFormation', currentFormation);
        localStorage.setItem('players', JSON.stringify(players));
        localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
        localStorage.setItem('gkSub', JSON.stringify(gkSub));
        localStorage.setItem('teamName', teamNameInput.value);
    }

    function renderFormation() {
        formationGrid.innerHTML = '';
        formations[currentFormation].forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'formation-row';
            row.forEach(position => {
                const positionElement = document.createElement('div');
                positionElement.className = 'player-position';
                positionElement.innerHTML = `
                    <div class="position-label">${position.name}</div>
                    ${selectedPlayers[position.index] 
                        ? createPlayerCardHTML(selectedPlayers[position.index])
                        : `<button class="add-player-btn" data-index="${position.index}">+</button>`}
                `;
                rowElement.appendChild(positionElement);
            });
            formationGrid.appendChild(rowElement);
        });

        // Render GK sub
        gkSubContainer.innerHTML = gkSub
            ? createPlayerCardHTML(gkSub, true)
            : '<button class="add-player-btn" data-index="sub">+ GK Changement</button>';

        document.querySelectorAll('.add-player-btn').forEach(btn => {
            btn.addEventListener('click', () => openPlayerModal(btn.dataset.index === 'sub' ? 'sub' : parseInt(btn.dataset.index)));
        });

        document.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = card.dataset.index;
                if (index === 'sub') {
                    swapGKs();
                } else {
                    removePlayer(parseInt(index));
                }
            });
        });

        saveToLocalStorage();
    }

    function createPlayerCardHTML(player, isSub = false) {
        const statsHTML = player.position === 'GK' 
            ? `
                <div class="player-stats">
                    <div class="stat-item"><span class="stat-label">DIV</span> ${player.diving}</div>
                    <div class="stat-item"><span class="stat-label">HAN</span> ${player.handling}</div>
                    <div class="stat-item"><span class="stat-label">KIC</span> ${player.kicking}</div>
                    <div class="stat-item"><span class="stat-label">REF</span> ${player.reflexes}</div>
                    <div class="stat-item"><span class="stat-label">SPE</span> ${player.speed}</div>
                    <div class="stat-item"><span class="stat-label">POS</span> ${player.positioning}</div>
                </div>
            `
            : `
                <div class="player-stats">
                    <div class="stat-item"><span class="stat-label">PAC</span> ${player.pace}</div>
                    <div class="stat-item"><span class="stat-label">SHO</span> ${player.shooting}</div>
                    <div class="stat-item"><span class="stat-label">PAS</span> ${player.passing}</div>
                    <div class="stat-item"><span class="stat-label">DRI</span> ${player.dribbling}</div>
                    <div class="stat-item"><span class="stat-label">DEF</span> ${player.defending}</div>
                    <div class="stat-item"><span class="stat-label">PHY</span> ${player.physical}</div>
                </div>
            `;

        return `
            <div class="player-card" data-index="${isSub ? 'sub' : player.index}">
                <div class="player-rating">${player.rating}</div>
                <div class="player-position-label">${player.position}</div>
                <img src="${player.photo}" alt="${player.name}" class="player-photo">
                <img src="${player.flag}" alt="Flag" class="player-flag">
                <img src="${player.logo}" alt="Club logo" class="player-logo">
                <div class="player-name">${player.name}</div>
                ${statsHTML}
            </div>
        `;
    }

    function openPlayerModal(index) {
        currentPosition = index;
        const positionName = index === 'sub' ? 'GK Sub' : formations[currentFormation].flat().find(p => p.index === index).name;
        document.getElementById('modal-position').textContent = positionName;
        playerModal.style.display = 'block';
        renderPlayersGrid();
    }

    function renderPlayersGrid() {
        const searchTerm = playerSearch.value.toLowerCase();
        const filteredPlayers = players.filter(player => 
            player.name.toLowerCase().includes(searchTerm) &&
            (currentPosition === 'sub' ? player.position === 'GK' : isPositionCompatible(player.position, formations[currentFormation].flat().find(p => p.index === currentPosition).name))
        );

        playersGrid.innerHTML = '';
        filteredPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.innerHTML = createPlayerCardHTML(player);
            playerCard.addEventListener('click', () => selectPlayer(player));
            playersGrid.appendChild(playerCard);
        });
    }

    function selectPlayer(player) {
        if (currentPosition === 'sub') {
            gkSub = { ...player, index: 'sub' };
        } else {
            selectedPlayers[currentPosition] = { ...player, index: currentPosition };
        }
        playerModal.style.display = 'none';
        renderFormation();
    }

    function removePlayer(index) {
        if (index === 'sub') {
            gkSub = null;
        } else {
            selectedPlayers[index] = null;
        }
        renderFormation();
    }

    function swapGKs() {
        if (gkSub && selectedPlayers[10]) {
            const temp = selectedPlayers[10];
            selectedPlayers[10] = gkSub;
            selectedPlayers[10].index = 10;
            gkSub = temp;
            gkSub.index = 'sub';
            renderFormation();
        }
    }

    function isPositionCompatible(playerPosition, formationPosition) {
        const compatibilityMap = {
            'ST': ['ST', 'CF', 'LW', 'RW'],
            'LW': ['LW', 'LM', 'ST'],
            'RW': ['RW', 'RM', 'ST'],
            'LM': ['LM', 'LW', 'CM'],
            'RM': ['RM', 'RW', 'CM'],
            'CM': ['CM', 'CDM', 'CAM'],
            'CAM': ['CAM', 'CM', 'CF'],
            'CDM': ['CDM', 'CM'],
            'LB': ['LB', 'LWB'],
            'RB': ['RB', 'RWB'],
            'CB': ['CB'],
            'GK': ['GK']
        };

        return compatibilityMap[formationPosition]?.includes(playerPosition) || false;
    }

    formationSelect.addEventListener('change', (e) => {
        currentFormation = e.target.value;
        selectedPlayers = Array(11).fill(null);
        gkSub = null;
        renderFormation();
    });

    teamNameInput.addEventListener('input', (e) => {
        displayTeamName.textContent = e.target.value;
        saveToLocalStorage();
    });

    playerSearch.addEventListener('input', renderPlayersGrid);

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            playerModal.style.display = 'none';
            createPlayerModal.style.display = 'none';
            editPlayerModal.style.display = 'none';
        });
    });

    document.getElementById('create-player-btn').addEventListener('click', () => {
        createPlayerModal.style.display = 'block';
    });

    document.getElementById('player-position').addEventListener('change', function() {
        const isGoalkeeper = this.value === 'GK';
        document.getElementById('gk-fields').style.display = isGoalkeeper ? 'block' : 'none';
        document.getElementById('outfield-fields').style.display = isGoalkeeper ? 'none' : 'block';
    });

    createPlayerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPlayer = {
            id: Date.now(),
            name: document.getElementById('player-name').value,
            position: document.getElementById('player-position').value,
            rating: parseInt(document.getElementById('player-rating').value),
            photo: document.getElementById('player-photo').files[0] ? URL.createObjectURL(document.getElementById('player-photo').files[0]) : null,
            flag: document.getElementById('player-flag').files[0] ? URL.createObjectURL(document.getElementById('player-flag').files[0]) : null,
            logo: document.getElementById('player-logo').files[0] ? URL.createObjectURL(document.getElementById('player-logo').files[0]) : null
        };

        if (newPlayer.position === 'GK') {
            newPlayer.diving = parseInt(document.getElementById('player-diving').value);
            newPlayer.handling = parseInt(document.getElementById('player-handling').value);
            newPlayer.kicking = parseInt(document.getElementById('player-kicking').value);
            newPlayer.reflexes = parseInt(document.getElementById('player-reflexes').value);
            newPlayer.speed = parseInt(document.getElementById('player-speed').value);
            newPlayer.positioning = parseInt(document.getElementById('player-positioning').value);
        } else {
            newPlayer.pace = parseInt(document.getElementById('player-pace').value);
            newPlayer.shooting = parseInt(document.getElementById('player-shooting').value);
            newPlayer.passing = parseInt(document.getElementById('player-passing').value);
            newPlayer.dribbling = parseInt(document.getElementById('player-dribbling').value);
            newPlayer.defending = parseInt(document.getElementById('player-defending').value);
            newPlayer.physical = parseInt(document.getElementById('player-physical').value);
        }

        players.push(newPlayer);
        createPlayerModal.style.display = 'none';
        renderCreatedPlayers();
        showSuccessMessage();
        saveToLocalStorage();
        e.target.reset();
    });

    function renderCreatedPlayers() {
        createdPlayersContainer.innerHTML = '';
        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.innerHTML = createPlayerCardHTML(player);
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'player-actions';
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Modifier';
            editButton.addEventListener('click', () => openEditPlayerModal(player));
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', () => deletePlayer(player.id));
            
            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);
            playerCard.appendChild(actionsDiv);
            
            createdPlayersContainer.appendChild(playerCard);
        });
    }

    function openEditPlayerModal(player) {
        editPlayerForm.innerHTML = `
            <div class="form-group">
                <label for="edit-player-name">Nom:</label>
                <input type="text" id="edit-player-name" value="${player.name}" required>
            </div>
            <div class="form-group">
                <label for="edit-player-position">Position:</label>
                <select id="edit-player-position" required>
                    <option value="GK" ${player.position === 'GK' ? 'selected' : ''}>GK - Gardien de but</option>
                    <option value="CB" ${player.position === 'CB' ? 'selected' : ''}>CB - Défenseur central</option>
                    <option value="LB" ${player.position === 'LB' ? 'selected' : ''}>LB - Latéral gauche</option>
                    <option value="RB" ${player.position === 'RB' ? 'selected' : ''}>RB - Latéral droit</option>
                    <option value="CDM" ${player.position === 'CDM' ? 'selected' : ''}>CDM - Milieu défensif</option>
                    <option value="CM" ${player.position === 'CM' ? 'selected' : ''}>CM - Milieu central</option>
                    <option value="CAM" ${player.position === 'CAM' ? 'selected' : ''}>CAM - Milieu offensif</option>
                    <option value="LM" ${player.position === 'LM' ? 'selected' : ''}>LM - Milieu gauche</option>
                    <option value="RM" ${player.position === 'RM' ? 'selected' : ''}>RM - Milieu droit</option>
                    <option value="LW" ${player.position === 'LW' ? 'selected' : ''}>LW - Ailier gauche</option>
                    <option value="RW" ${player.position === 'RW' ? 'selected' : ''}>RW - Ailier droit</option>
                    <option value="ST" ${player.position === 'ST' ? 'selected' : ''}>ST - Attaquant</option>
                    <option value="CF" ${player.position === 'CF' ? 'selected' : ''}>CF - Avant-centre</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-player-rating">Note globale:</label>
                <input type="number" id="edit-player-rating" min="40" max="99" value="${player.rating}" required>
            </div>
            <div class="form-group">
                <label for="edit-player-photo">Photo:</label>
                <input type="file" id="edit-player-photo" accept="image/*">
            </div>
            <div class="form-group">
                <label for="edit-player-flag">Drapeau:</label>
                <input type="file" id="edit-player-flag" accept="image/*">
            </div>
            <div class="form-group">
                <label for="edit-player-logo">Logo du club:</label>
                <input type="file" id="edit-player-logo" accept="image/*">
            </div>
        `;

        if (player.position === 'GK') {
            editPlayerForm.innerHTML += `
                <div id="edit-gk-fields">
                    <div class="form-group">
                        <label for="edit-player-diving">Plongeon:</label>
                        <input type="number" id="edit-player-diving" min="1" max="99" value="${player.diving}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-handling">Maniement:</label>
                        <input type="number" id="edit-player-handling" min="1" max="99" value="${player.handling}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-kicking">Dégagement:</label>
                        <input type="number" id="edit-player-kicking" min="1" max="99" value="${player.kicking}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-reflexes">Réflexes:</label>
                        <input type="number" id="edit-player-reflexes" min="1" max="99" value="${player.reflexes}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-speed">Vitesse:</label>
                        <input type="number" id="edit-player-speed" min="1" max="99" value="${player.speed}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-positioning">Placement:</label>
                        <input type="number" id="edit-player-positioning" min="1" max="99" value="${player.positioning}">
                    </div>
                </div>
            `;
        } else {
            editPlayerForm.innerHTML += `
                <div id="edit-outfield-fields">
                    <div class="form-group">
                        <label for="edit-player-pace">Vitesse:</label>
                        <input type="number" id="edit-player-pace" min="1" max="99" value="${player.pace}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-shooting">Tir:</label>
                        <input type="number" id="edit-player-shooting" min="1" max="99" value="${player.shooting}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-passing">Passe:</label>
                        <input type="number" id="edit-player-passing" min="1" max="99" value="${player.passing}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-dribbling">Dribble:</label>
                        <input type="number" id="edit-player-dribbling" min="1" max="99" value="${player.dribbling}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-defending">Défense:</label>
                        <input type="number" id="edit-player-defending" min="1" max="99" value="${player.defending}">
                    </div>
                    <div class="form-group">
                        <label for="edit-player-physical">Physique:</label>
                        <input type="number" id="edit-player-physical" min="1" max="99" value="${player.physical}">
                    </div>
                </div>
            `;
        }

        editPlayerForm.innerHTML += `
            <button type="submit">Sauvegarder les modifications</button>
        `;

        editPlayerForm.onsubmit = (e) => {
            e.preventDefault();
            updatePlayer(player.id);
        };

        editPlayerModal.style.display = 'block';
    }

    function updatePlayer(playerId) {
        const playerIndex = players.findIndex(p => p.id === playerId);
        if (playerIndex === -1) return;

        const updatedPlayer = {
            ...players[playerIndex],
            name: document.getElementById('edit-player-name').value,
            position: document.getElementById('edit-player-position').value,
            rating: parseInt(document.getElementById('edit-player-rating').value)
        };

        const newPhotoFile = document.getElementById('edit-player-photo').files[0];
        if (newPhotoFile) {
            updatedPlayer.photo = URL.createObjectURL(newPhotoFile);
        }

        const newFlagFile = document.getElementById('edit-player-flag').files[0];
        if (newFlagFile) {
            updatedPlayer.flag = URL.createObjectURL(newFlagFile);
        }

        const newLogoFile = document.getElementById('edit-player-logo').files[0];
        if (newLogoFile) {
            updatedPlayer.logo = URL.createObjectURL(newLogoFile);
        }

        if (updatedPlayer.position === 'GK') {
            updatedPlayer.diving = parseInt(document.getElementById('edit-player-diving').value);
            updatedPlayer.handling = parseInt(document.getElementById('edit-player-handling').value);
            updatedPlayer.kicking = parseInt(document.getElementById('edit-player-kicking').value);
            updatedPlayer.reflexes = parseInt(document.getElementById('edit-player-reflexes').value);
            updatedPlayer.speed = parseInt(document.getElementById('edit-player-speed').value);
            updatedPlayer.positioning = parseInt(document.getElementById('edit-player-positioning').value);
        } else {
            updatedPlayer.pace = parseInt(document.getElementById('edit-player-pace').value);
            updatedPlayer.shooting = parseInt(document.getElementById('edit-player-shooting').value);
            updatedPlayer.passing = parseInt(document.getElementById('edit-player-passing').value);
            updatedPlayer.dribbling = parseInt(document.getElementById('edit-player-dribbling').value);
            updatedPlayer.defending = parseInt(document.getElementById('edit-player-defending').value);
            updatedPlayer.physical = parseInt(document.getElementById('edit-player-physical').value);
        }

        players[playerIndex] = updatedPlayer;

        // Update selected players and GK sub if necessary
        if (gkSub && gkSub.id === playerId) {
            gkSub = { ...updatedPlayer, index: 'sub' };
        }
        selectedPlayers = selectedPlayers.map(p => p && p.id === playerId ? { ...updatedPlayer, index: p.index } : p);

        editPlayerModal.style.display = 'none';
        renderCreatedPlayers();
        renderFormation();
        showSuccessMessage('Joueur modifié avec succès!');
        saveToLocalStorage();
    }

    function deletePlayer(playerId) {
        players = players.filter(p => p.id !== playerId);
        if (gkSub && gkSub.id === playerId) {
            gkSub = null;
        }
        selectedPlayers = selectedPlayers.map(p => p && p.id === playerId ? null : p);
        renderCreatedPlayers();
        renderFormation();
        showSuccessMessage('Joueur supprimé avec succès!');
        saveToLocalStorage();
    }

    function showSuccessMessage(message = 'Joueur créé avec succès!') {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }

    renderFormation();
    renderCreatedPlayers();
});