
async function uploadImage(file) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, {
            folder: 'player_images',  // Optional: specify a folder for your images
            resource_type: 'auto'     // Automatically handle different formats
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);  // Return the URL of the uploaded image
            }
        });
    });
}

        const formations = {
            '4-4-2': [
                [{name: 'ST', index: 0}, {name: 'ST', index: 1}],
                [{name: 'LM', index: 2}, {name: 'CM', index: 3}, {name: 'CM', index: 4}, {name: 'RM', index: 5}],
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
                [{name: 'CF', index: 0}, {name: 'CF', index: 1}],
                [{name: 'LMF', index: 2}, {name: 'CMF', index: 3}, {name: 'DMF', index: 4}, {name: 'CMF', index: 5}, {name: 'RMF', index: 6}],
                [{name: 'CB', index: 7}, {name: 'CB', index: 8}, {name: 'CB', index: 9}],
                [{name: 'GK', index: 10}]
            ]
        };

        let selectedFormation = '4-4-2';
        let selectedPlayers = Array(11).fill(null);
        let currentPosition = null;
        let players = [];

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
        const createdPlayersContainer = document.getElementById('createdPlayers');

        fetch('../data/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  
            })
            .then(data => {
                players = data.players;
                initializeApp();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        function initializeApp() {
            renderFormation();
            setupEventListeners();
            populateNationalityFilter();
            renderCreatedPlayers();
        }

        function renderFormation() {
            formationElement.innerHTML = '';
            formations[selectedFormation].forEach(row => {
                const rowElement = document.createElement('div');
                rowElement.className = 'row';
                row.forEach(position => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.onclick = () => openModal(position.index, position.name);
                    if (selectedPlayers[position.index]) {
                        const player = selectedPlayers[position.index];
                        card.innerHTML = createPlayerCardHTML(player);
                    } else {
                        card.innerHTML = createEmptyCardHTML(position);
                    }
                    rowElement.appendChild(card);
                });
                formationElement.appendChild(rowElement);
            });
        }

        function createPlayerCardHTML(player) {
            if (player.position === 'GK') {
                return `
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
                            <div class="stat"><span>DIV</span><span>${player.diving}</span></div>
                            <div class="stat"><span>HAN</span><span>${player.handling}</span></div>
                            <div class="stat"><span>KIC</span><span>${player.kicking}</span></div>
                            <div class="stat"><span>REF</span><span>${player.reflexes}</span></div>
                            <div class="stat"><span>SPE</span><span>${player.speed}</span></div>
                            <div class="stat"><span>POS</span><span>${player.positioning}</span></div>
                        </div>
                        <div class="shine"></div>
                        <div class="flags">
                            <img src="${player.flag}" class="flag" style="position:relative; bottom:-15px; width:40px;" />
                            <img src="${player.logo}" alt="Logo player" class="flag" style="position:relative; width:40px;" />
                        </div>
                    </div>
                `;
            } else {
                return `
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
        }

        function createEmptyCardHTML(position) {
            return `
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

        function openModal(position, positionName) {
            currentPosition = position;
            modal.style.display = 'block';
            positionFilter.value = positionName;
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
                playerCard.innerHTML = createPlayerCardHTML(player);
                playerCard.onclick = () => selectPlayer(player);
                playersGrid.appendChild(playerCard);
            });
        }

        function selectPlayer(player) {
            selectedPlayers[currentPosition] = player;
            modal.style.display = 'none';
            renderFormation();
        }

        function setupEventListeners() {
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

            document.getElementById('btn-primary').addEventListener('click', function() {
                document.getElementById('Formulaire_remplir').style.display = 'block';
            });



            async function uploadImage(file) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, {
            folder: 'player_images',  // Optionnel: spécifiez un dossier pour vos images
            resource_type: 'auto'     // Gestion automatique des formats d'image
        }, (error, result) => {
            if (error) {
                reject(error);  // Rejeter la promesse en cas d'erreur
            } else {
                resolve(result.secure_url);  // Retourner l'URL de l'image téléchargée
            }
        });
    });
}

        // Logique de gestion du formulaire
document.getElementById('newPlayerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const newPlayer = {
        id: players.length + 1,
        name: formData.get('newPlayerName'),
        position: formData.get('newPlayerPosition'),
        nationality: formData.get('newPlayerNationality'),
        rating: parseInt(formData.get('newPlayerRating')),
        pace: 70,
        shooting: 70,
        passing: 70,
        dribbling: 70,
        defending: 70,
        physical: 70,
        diving: 70,
        handling: 70,
        kicking: 70,
        reflexes: 70,
        speed: 70,
        positioning: 70
    };

    try {
        // Récupérer les fichiers image
        const playerPhoto = formData.get('newPlayerPhoto');
        const playerFlag = formData.get('newPlayerFlag');
        const playerLogo = formData.get('newPlayerLogo');

        // Télécharger les images sur Cloudinary
        const photoUrl = await uploadImage(playerPhoto);
        const flagUrl = await uploadImage(playerFlag);
        const logoUrl = await uploadImage(playerLogo);

        // Ajouter les URLs des images au joueur
        newPlayer.photo = photoUrl;
        newPlayer.flag = flagUrl;
        newPlayer.logo = logoUrl;

        // Vérifiez si le joueur est un gardien et ajoutez les stats
        if (newPlayer.position === 'GK') {
            newPlayer.diving = parseInt(formData.get('newPlayerDiving'));
            newPlayer.handling = parseInt(formData.get('newPlayerHandling'));
            newPlayer.kicking = parseInt(formData.get('newPlayerKicking'));
            newPlayer.reflexes = parseInt(formData.get('newPlayerReflexes'));
            newPlayer.speed = parseInt(formData.get('newPlayerSpeed'));
            newPlayer.positioning = parseInt(formData.get('newPlayerPositioning'));
        } else {
            newPlayer.pace = parseInt(formData.get('newPlayerPace'));
            newPlayer.shooting = parseInt(formData.get('newPlayerShooting'));
            newPlayer.passing = parseInt(formData.get('newPlayerPassing'));
            newPlayer.dribbling = parseInt(formData.get('newPlayerDribbling'));
            newPlayer.defending = parseInt(formData.get('newPlayerDefending'));
            newPlayer.physical = parseInt(formData.get('newPlayerPhysical'));
        }

        // Ajouter le joueur à la liste des joueurs
        players.push(newPlayer);

        // Réinitialiser le formulaire et masquer le formulaire
        document.getElementById('Formulaire_remplir').style.display = 'none';
        this.reset();

        // Rafraîchir l'affichage
        populateNationalityFilter();
        renderPlayers();
        renderCreatedPlayers();

        // Afficher un message de succès
        showSuccessMessage();
    } catch (error) {
        console.error('Erreur lors du téléchargement des images: ', error);
        alert('Une erreur est survenue lors du téléchargement des images.');
    }
});

            document.getElementById('newPlayerPosition').addEventListener('change', function() {
                var selectedPosition = this.value;
                
                // Hide all position-specific fields
                var positionFields = document.querySelectorAll('.position-specific');
                positionFields.forEach(function(field) {
                    field.style.display = 'none';
                });

                // Show the corresponding position-specific fields
                if (selectedPosition === 'GK') {
                    document.getElementById('GKFields').style.display = 'block';
                } else {
                    document.getElementById('OtherFields').style.display = 'block';
                }
            });
        }

        function populateNationalityFilter() {
            const nationalities = [...new Set(players.map(p => p.nationality))];
            nationalityFilter.innerHTML = '<option value="">Nationality</option>';
            nationalities.forEach(nationality => {
                const option = document.createElement('option');
                option.value = nationality;
                option.textContent = nationality;
                nationalityFilter.appendChild(option);
            });
        }

        function isPositionCompatible(playerPosition, formationPosition) {
            const compatibilityMap = {
                'CF': ['CF', 'ST'],
                'LWF': ['LWF', 'LW', 'LM'],
                'RWF': ['RWF', 'RW', 'RM'],
                'LMF': ['LMF', 'LM', 'LW'],
                'RMF': ['RMF', 'RM', 'RW'],
                'CMF': ['CMF', 'CM'],
                'DMF': ['DMF', 'CDM'],
                'LB': ['LB', 'LWB'],
                'RB': ['RB', 'RWB'],
                'CB': ['CB'],
                'GK': ['GK']
            };

            return compatibilityMap[formationPosition].includes(playerPosition);
        }

        function renderCreatedPlayers() {
            createdPlayersContainer.innerHTML = '';
            players.forEach(player => {
                const playerCard = document.createElement('div');
                playerCard.className = 'card';
                playerCard.innerHTML = createPlayerCardHTML(player);
                createdPlayersContainer.appendChild(playerCard);
            });
        }

        function showSuccessMessage() {
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }

        // Initialize the app
        initializeApp();

        // 


function displayPlayerCard(player) {
    const playersGrid = document.getElementById('playersGrid'); // The container where cards are shown

    const card = document.createElement('div');
    card.classList.add('card');

    let cardContent = `
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
    `;

    if (player.position === 'GK') {
        cardContent += `
            <div class="stat"><span>DIV</span><span>${player.diving}</span></div>
            <div class="stat"><span>HAN</span><span>${player.handling}</span></div>
            <div class="stat"><span>KIC</span><span>${player.kicking}</span></div>
            <div class="stat"><span>REF</span><span>${player.reflexes}</span></div>
            <div class="stat"><span>SPE</span><span>${player.speed}</span></div>
            <div class="stat"><span>POS</span><span>${player.positioning}</span></div>
        `;
    } else {
        cardContent += `
            <div class="stat"><span>PAC</span><span>${player.pace}</span></div>
            <div class="stat"><span>SHO</span><span>${player.shooting}</span></div>
            <div class="stat"><span>PAS</span><span>${player.passing}</span></div>
            <div class="stat"><span>DRI</span><span>${player.dribbling}</span></div>
            <div class="stat"><span>DEF</span><span>${player.defending}</span></div>
            <div class="stat"><span>PHY</span><span>${player.physical}</span></div>
        `;
    }

    cardContent += `
            </div>
            <div class="shine"></div>
            <div class="flags">
                <img src="${player.flag}" class="flag" style="position:relative; bottom:-15px; width:40px;" />
                <img src="${player.logo}" alt="Logo player" class="flag" style="position:relative; width:40px;" />
            </div>
        </div>
    `;

    card.innerHTML = cardContent;
    playersGrid.appendChild(card);
}

// partei 2 

document.addEventListener('DOMContentLoaded', function() {
    displayPlayerCards(); // Load players from localStorage on page load

    // Add event listener to form submission
    document.getElementById('newPlayerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const playerName = document.getElementById('newPlayerName').value;
        const playerPosition = document.getElementById('newPlayerPosition').value;
        const playerNationality = document.getElementById('newPlayerNationality').value;
        const playerRating = document.getElementById('newPlayerRating').value;

        const playerPhoto = document.getElementById('newPlayerPhoto').files[0];
        const playerFlag = document.getElementById('newPlayerFlag').files[0];
        const playerLogo = document.getElementById('newPlayerLogo').files[0];

        const player = {
            name: playerName,
            position: playerPosition,
            nationality: playerNationality,
            rating: playerRating,
            photo: URL.createObjectURL(playerPhoto),
            flag: URL.createObjectURL(playerFlag),
            logo: URL.createObjectURL(playerLogo),
        };

        if (playerPosition === 'GK') {
            player.diving = document.getElementById('newPlayerDiving').value;
            player.handling = document.getElementById('newPlayerHandling').value;
            player.kicking = document.getElementById('newPlayerKicking').value;
            player.reflexes = document.getElementById('newPlayerReflexes').value;
            player.speed = document.getElementById('newPlayerSpeed').value;
            player.positioning = document.getElementById('newPlayerPositioning').value;
        } else {
            player.pace = document.getElementById('newPlayerPace').value;
            player.shooting = document.getElementById('newPlayerShooting').value;
            player.passing = document.getElementById('newPlayerPassing').value;
            player.dribbling = document.getElementById('newPlayerDribbling').value;
            player.defending = document.getElementById('newPlayerDefending').value;
            player.physical = document.getElementById('newPlayerPhysical').value;
        }

        let players = JSON.parse(localStorage.getItem('players')) || [];
        players.push(player);
        // localStorage.setItem('players', JSON.stringify(players));
        localStorage.setItem('players', JSON.stringify(players));

        alert('Player created successfully!');
        displayPlayerCards(); // Refresh the cards after adding a new player
    });
});

// Function to display the cards from localStorage
function displayPlayerCards() {
    const playersGrid = document.getElementById('playerCardsContainer');
    playersGrid.innerHTML = ''; // Clear any existing cards

    const players = JSON.parse(localStorage.getItem('players')) || [];

    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index; // Store the player index in the card for future reference

        let cardContent = `
            <div class="card-inner">
                <div class="header">
                    <div class="rating">${player.rating}</div>
                    <div class="position">${player.position}</div>
                </div>
                <div class="player-image">
                    <img src="${player.photo}" alt="${player.name}" />
                </div>
                <div class="player-name">${player.name}</div>
                <div class="stats">
        `;

        if (player.position === 'GK') {
            cardContent += `
                <div class="stat"><span>DIV</span><span>${player.diving}</span></div>
                <div class="stat"><span>HAN</span><span>${player.handling}</span></div>
                <div class="stat"><span>KIC</span><span>${player.kicking}</span></div>
                <div class="stat"><span>REF</span><span>${player.reflexes}</span></div>
                <div class="stat"><span>SPE</span><span>${player.speed}</span></div>
                <div class="stat"><span>POS</span><span>${player.positioning}</span></div>
            `;
        } else {
            cardContent += `
                <div class="stat"><span>PAC</span><span>${player.pace}</span></div>
                <div class="stat"><span>SHO</span><span>${player.shooting}</span></div>
                <div class="stat"><span>PAS</span><span>${player.passing}</span></div>
                <div class="stat"><span>DRI</span><span>${player.dribbling}</span></div>
                <div class="stat"><span>DEF</span><span>${player.defending}</span></div>
                <div class="stat"><span>PHY</span><span>${player.physical}</span></div>
            `;
        }

        cardContent += `
                </div>
                <div class="flags">
                    <img src="${player.flag}" class="flag" />
                    <img src="${player.logo}" alt="Logo player" class="flag" />
                </div>
                <div class="options">
                    <button class="modify-btn">Modify</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        `;

        card.innerHTML = cardContent;
        playersGrid.appendChild(card);

        // Add event listeners for modify and delete
        card.querySelector('.modify-btn').addEventListener('click', function() {
          alert
            
        });

        card.querySelector('.delete-btn').addEventListener('click', function() {
            deletePlayer(index);
        });
    });
}

// Function to modify a player
function modifyPlayer(player, index) {
    // Prefill the form with the current player's data for modification
    document.getElementById('newPlayerName').value = player.name;
    document.getElementById('newPlayerPosition').value = player.position;
    document.getElementById('newPlayerNationality').value = player.nationality;
    document.getElementById('newPlayerRating').value = player.rating;

    if (player.position === 'GK') {
        document.getElementById('newPlayerDiving').value = player.diving;
        document.getElementById('newPlayerHandling').value = player.handling;
        document.getElementById('newPlayerKicking').value = player.kicking;
        document.getElementById('newPlayerReflexes').value = player.reflexes;
        document.getElementById('newPlayerSpeed').value = player.speed;
        document.getElementById('newPlayerPositioning').value = player.positioning;
    } else {
        document.getElementById('newPlayerPace').value = player.pace;
        document.getElementById('newPlayerShooting').value = player.shooting;
        document.getElementById('newPlayerPassing').value = player.passing;
        document.getElementById('newPlayerDribbling').value = player.dribbling;
        document.getElementById('newPlayerDefending').value = player.defending;
        document.getElementById('newPlayerPhysical').value = player.physical;
    }
}

// Function to delete a player
function deletePlayer(index) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.splice(index, 1); // Remove player from array
    localStorage.setItem('players', JSON.stringify(players));
    
    displayPlayerCards(); // Refresh the display
}

document.getElementById('newPlayerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    // Création de l'objet player
    const newPlayer = {
        id: players.length + 1,
        name: formData.get('newPlayerName'),
        position: formData.get('newPlayerPosition'),
        nationality: formData.get('newPlayerNationality'),
        rating: parseInt(formData.get('newPlayerRating')),
        pace: 70,
        shooting: 70,
        passing: 70,
        dribbling: 70,
        defending: 70,
        physical: 70,
        diving: 70,
        handling: 70,
        kicking: 70,
        reflexes: 70,
        speed: 70,
        positioning: 70
    };

    // Récupérer les images téléchargées
    const playerPhoto = formData.get('newPlayerPhoto');
    const playerFlag = formData.get('newPlayerFlag');
    const playerLogo = formData.get('newPlayerLogo');

    // Créer une URL pour chaque image téléchargée
    const photoUrl = URL.createObjectURL(playerPhoto);
    const flagUrl = URL.createObjectURL(playerFlag);
    const logoUrl = URL.createObjectURL(playerLogo);

    // Ajouter les URLs des images à l'objet du joueur
    newPlayer.photo = photoUrl;
    newPlayer.flag = flagUrl;
    newPlayer.logo = logoUrl;

    // Vérifie si le joueur est un gardien
    if (newPlayer.position === 'GK') {
        newPlayer.diving = parseInt(formData.get('newPlayerDiving'));
        newPlayer.handling = parseInt(formData.get('newPlayerHandling'));
        newPlayer.kicking = parseInt(formData.get('newPlayerKicking'));
        newPlayer.reflexes = parseInt(formData.get('newPlayerReflexes'));
        newPlayer.speed = parseInt(formData.get('newPlayerSpeed'));
        newPlayer.positioning = parseInt(formData.get('newPlayerPositioning'));
    } else {
        newPlayer.pace = parseInt(formData.get('newPlayerPace'));
        newPlayer.shooting = parseInt(formData.get('newPlayerShooting'));
        newPlayer.passing = parseInt(formData.get('newPlayerPassing'));
        newPlayer.dribbling = parseInt(formData.get('newPlayerDribbling'));
        newPlayer.defending = parseInt(formData.get('newPlayerDefending'));
        newPlayer.physical = parseInt(formData.get('newPlayerPhysical'));
    }

    // Ajoute le joueur à la liste des joueurs
    players.push(newPlayer);

    // Masquer le formulaire et réinitialiser
    document.getElementById('Formulaire_remplir').style.display = 'none';
    this.reset();

    // Met à jour les joueurs affichés
    populateNationalityFilter();
    renderPlayers();
    renderCreatedPlayers();

    // Afficher le message de succès
    showSuccessMessage();
});
// 


  