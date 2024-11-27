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
    {
      id: 1,
      name: "Lionel Messi",
      photo: "https://cdn.sofifa.net/players/158/023/25_120.png",
      position: "RW",
      nationality: "Argentina",
      flag: "https://cdn.sofifa.net/flags/ar.png",
      club: "Inter Miami",
      logo: "https://cdn.sofifa.net/meta/team/239235/120.png",
      rating: 93,
      pace: 85,
      shooting: 92,
      passing: 91,
      dribbling: 95,
      defending: 35,
      physical: 65
    },
    {
      id: 2,
      name: "Cristiano Ronaldo",
      photo: "https://cdn.sofifa.net/players/020/801/25_120.png",
      position: "ST",
      nationality: "Portugal",
      flag: "https://cdn.sofifa.net/flags/pt.png",
      club: "Al Nassr",
      logo: "https://cdn.sofifa.net/meta/team/2506/120.png",
      rating: 91,
      pace: 84,
      shooting: 94,
      passing: 82,
      dribbling: 87,
      defending: 34,
      physical: 77
    },
    {
      id: 3,
      name: "Kevin De Bruyne",
      photo: "https://cdn.sofifa.net/players/192/985/25_120.png",
      position: "CM",
      nationality: "Belgium",
      flag: "https://cdn.sofifa.net/flags/be.png",
      club: "Manchester City",
      logo: "https://cdn.sofifa.net/players/239/085/25_120.png",
      rating: 91,
      pace: 74,
      shooting: 86,
      passing: 93,
      dribbling: 88,
      defending: 64,
      physical: 78
    },
    {
      id: 4,
      name: "Kylian Mbappé",
      photo: "https://cdn.sofifa.net/players/231/747/25_120.png",
      position: "ST",
      nationality: "France",
      flag: "https://cdn.sofifa.net/flags/fr.png",
      club: "Real Madrid",
      logo: "https://cdn.sofifa.net/meta/team/3468/120.png",
      rating: 92,
      pace: 97,
      shooting: 89,
      passing: 80,
      dribbling: 92,
      defending: 39,
      physical: 77
    },
    {
      id: 5,
      name: "Virgil van Dijk",
      photo: "https://cdn.sofifa.net/players/203/376/25_120.png",
      position: "CB",
      nationality: "Netherlands",
      flag: "https://cdn.sofifa.net/flags/nl.png",
      club: "Liverpool",
      logo: "https://cdn.sofifa.net/meta/team/8/120.png",
      rating: 90,
      pace: 75,
      shooting: 60,
      passing: 70,
      dribbling: 72,
      defending: 92,
      physical: 86
    },
    {
      id: 6,
      name: "Antonio Rudiger",
      photo: "https://cdn.sofifa.net/players/205/452/25_120.png",
      position: "CB",
      nationality: "Germany",
      flag: "https://cdn.sofifa.net/flags/de.png",
      club: "Real Madrid",
      logo: "https://cdn.sofifa.net/meta/team/3468/120.png",
      rating: 88,
      pace: 82,
      shooting: 55,
      passing: 73,
      dribbling: 70,
      defending: 86,
      physical: 86
    },
    {
      id: 7,
      name: "Neymar Jr",
      photo: "https://cdn.sofifa.net/players/190/871/25_120.png",
      position: "LW",
      nationality: "Brazil",
      flag: "https://cdn.sofifa.net/flags/br.png",
      club: "Al-Hilal",
      logo: "https://cdn.sofifa.net/meta/team/7011/120.png",
      rating: 90,
      pace: 91,
      shooting: 83,
      passing: 86,
      dribbling: 94,
      defending: 37,
      physical: 61
    },
    {
      id: 8,
      name: "Mohamed Salah",
      photo: "https://cdn.sofifa.net/players/192/985/25_120.png",
      position: "RW",
      nationality: "Egypt",
      flag: "https://cdn.sofifa.net/flags/eg.png",
      club: "Liverpool",
      logo: "https://cdn.sofifa.net/meta/team/8/120.png",
      rating: 89,
      pace: 93,
      shooting: 87,
      passing: 81,
      dribbling: 90,
      defending: 45,
      physical: 75
    },
    {
      id: 9,
      name: "Joshua Kimmich",
      photo: "https://cdn.sofifa.net/players/212/622/25_120.png",
      position: "CM",
      nationality: "Germany",
      flag: "https://cdn.sofifa.net/flags/de.png",
      club: "Bayern Munich",
      logo: "https://cdn.sofifa.net/meta/team/503/120.png",
      rating: 89,
      pace: 70,
      shooting: 75,
      passing: 88,
      dribbling: 84,
      defending: 84,
      physical: 81
    },
    {
      id: 10,
      name: "Jan Oblak",
      photo: "https://cdn.sofifa.net/players/200/389/25_120.png",
      position: "GK",
      nationality: "Slovenia",
      flag: "https://cdn.sofifa.net/flags/si.png",
      club: "Atletico Madrid",
      logo: "https://cdn.sofifa.net/meta/team/7980/120.png",
      rating: 91,
      diving: 89,
      handling: 90,
      kicking: 78,
      reflexes: 92,
      speed: 50,
      positioning: 88
    },
    {
      id: 11,
      name: "Luka Modrić",
      photo: "https://cdn.sofifa.net/players/177/003/25_120.png",
      position: "CM",
      nationality: "Croatia",
      flag: "https://cdn.sofifa.net/flags/hr.png",
      club: "Real Madrid",
      logo: "https://cdn.sofifa.net/meta/team/3468/120.png",
      rating: 88,
      pace: 74,
      shooting: 78,
      passing: 89,
      dribbling: 90,
      defending: 72,
      physical: 65
    },
    {
      id: 12,
      name: "Vinicius Junior",
      photo: "https://cdn.sofifa.net/players/238/794/25_120.png",
      position: "LW",
      nationality: "Brazil",
      flag: "https://cdn.sofifa.net/flags/br.png",
      club: "Real Madrid",
      logo: "https://cdn.sofifa.net/meta/team/3468/120.png",
      rating: 89,
      pace: 91,
      shooting: 88,
      passing: 85,
      dribbling: 94,
      defending: 39,
      physical: 61
    },
    {
      id: 13,
      name: "Brahim Diáz",
      photo: "https://cdn.sofifa.net/players/231/410/25_120.png",
      position: "LW",
      nationality: "Morocco",
      flag: "https://cdn.sofifa.net/flags/ma.png",
      club: "Real Madrid",
      logo: "https://cdn.sofifa.net/meta/team/3468/120.png",
      rating: 82,
      pace: 85,
      shooting: 74,
      passing: 78,
      dribbling: 85,
      defending: 31,
      physical: 56
    },
    {
      id: 14,
      name: "Karim Benzema",
      photo: "https://cdn.sofifa.net/players/165/153/25_120.png",
      position: "ST",
      nationality: "France",
      flag: "https://cdn.sofifa.net/flags/fr.png",
      club: "Al-Ittihad",
      logo: "https://cdn.sofifa.net/meta/team/476/120.png",
      rating: 90,
      pace: 77,
      shooting: 90,
      passing: 83,
      dribbling: 88,
      defending: 40,
      physical: 78
    },
    {
      id: 15,
      name: "Erling Haaland",
      photo: "https://cdn.sofifa.net/players/239/085/25_120.png",
      position: "ST",
      nationality: "Norway",
      flag: "https://cdn.sofifa.net/flags/no.png",
      club: "Manchester City",
      logo: "https://cdn.sofifa.net/players/239/085/25_120.png",
      rating: 91,
      pace: 89,
      shooting: 94,
      passing: 65,
      dribbling: 80,
      defending: 45,
      physical: 88
    },
    {
      id: 16,
      name: "N'Golo Kanté",
      photo: "https://cdn.sofifa.net/players/215/914/25_120.png",
      position: "CDM",
      nationality: "France",
      flag: "https://cdn.sofifa.net/flags/fr.png",
      club: "Al-Ittihad",
      logo: "https://cdn.sofifa.net/meta/team/476/120.png",
      rating: 87,
      pace: 77,
      shooting: 66,
      passing: 75,
      dribbling: 82,
      defending: 88,
      physical: 82
    },
    {
      id: 17,
      name: "Alphonso Davies",
      photo: "https://cdn.sofifa.net/players/234/396/25_120.png",
      position: "LB",
      nationality: "Canada",
      flag: "https://cdn.sofifa.net/flags/ca.png",
      club: "Bayern Munich",
      logo: "https://cdn.sofifa.net/meta/team/503/120.png",
      rating: 84,
      pace: 96,
      shooting: 68,
      passing: 77,
      dribbling: 82,
      defending: 76,
      physical: 77
    },
    {
      id: 18,
      name: "Yassine Bounou",
      photo: "https://cdn.sofifa.net/players/209/981/25_120.png",
      position: "GK",
      nationality: "Morocco",
      flag: "https://cdn.sofifa.net/flags/ma.png",
      club: "Al-Hilal",
      logo: "https://cdn.sofifa.net/meta/team/7011/120.png",
      rating: 84,
      diving: 81,
      handling: 82,
      kicking: 77,
      reflexes: 86,
      speed: 38,
      positioning: 83
    },
    {
      id: 19,
      name: "Bruno Fernandes",
      photo: "https://cdn.sofifa.net/players/212/198/25_120.png",
      position: "CM",
      nationality: "Portugal",
      flag: "https://cdn.sofifa.net/flags/pt.png",
      club: "Manchester United",
      logo: "https://cdn.sofifa.net/meta/team/14/120.png",
      rating: 88,
      pace: 75,
      shooting: 85,
      passing: 89,
      dribbling: 84,
      defending: 69,
      physical: 77
    },
    {
      id: 20,
      name: "Jadon Sancho",
      photo: "https://cdn.sofifa.net/players/233/049/25_120.png",
      position: "LW",
      nationality: "England",
      flag: "https://cdn.sofifa.net/flags/gb-eng.png",
      club: "Manchester United",
      logo: "https://cdn.sofifa.net/meta/team/14/120.png",
      rating: 84,
      pace: 85,
      shooting: 74,
      passing: 78,
      dribbling: 88,
      defending: 34,
      physical: 63
    },
    {
      id: 21,
      name: "Trent Alexander-Arnold",
      photo: "https://cdn.sofifa.net/players/231/281/25_120.png",
      position: "RB",
      nationality: "England",
      flag: "https://cdn.sofifa.net/flags/gb-eng.png",
      club: "Liverpool",
      logo: "https://cdn.sofifa.net/meta/team/8/120.png",
      rating: 87,
      pace: 76,
      shooting: 66,
      passing: 89,
      dribbling: 80,
      defending: 79,
      physical: 71
    },
    {
      id: 22,
      name: "Achraf Hakimi",
      photo: "https://cdn.sofifa.net/players/235/212/25_120.png",
      position: "RB",
      nationality: "Morocco",
      flag: "https://cdn.sofifa.net/flags/ma.png",
      club: "Paris Saint-Germain",
      logo: "https://cdn.sofifa.net/meta/team/591/120.png",
      rating: 84,
      pace: 91,
      shooting: 76,
      passing: 80,
      dribbling: 80,
      defending: 75,
      physical: 78
    },
    {
      id: 23,
      name: "Youssef En-Nesyri",
      photo: "https://cdn.sofifa.net/players/235/410/25_120.png",
      position: "ST",
      nationality: "Morocco",
      flag: "https://cdn.sofifa.net/flags/ma.png",
      club: "Fenerbahçe",
      logo: "https://cdn.sofifa.net/meta/team/88/120.png",
      rating: 83,
      pace: 82,
      shooting: 82,
      passing: 63,
      dribbling: 77,
      defending: 36,
      physical: 80
    },
    {
      id: 24,
      name: "Noussair Mazraoui",
      photo: "https://cdn.sofifa.net/players/236/401/25_120.png",
      position: "LB",
      nationality: "Morocco",
      flag: "https://cdn.sofifa.net/flags/ma.png",
      club: "Manchester United",
      logo: "https://cdn.sofifa.net/meta/team/14/120.png",
      rating: 81,
      pace: 78,
      shooting: 66,
      passing: 77,
      dribbling: 83,
      defending: 77,
      physical: 71
    },
    {
      id: 25,
      name: "Ismael Saibari",
      photo: "https://cdn.sofifa.net/players/259/480/25_120.png",
      position: "CM",
      nationality: "Morocco",
      flag: "https://cdn.sofifa.net/flags/ma.png",
      club: "PSV",
      logo: "https://cdn.sofifa.net/meta/team/682/120.png",
      rating: 83,
      pace: 89,
      shooting: 78,
      passing: 80,
      dribbling: 86,
      defending: 55,
      physical: 84
    },
    {
      id: 26,
      name: "Gianluigi Donnarumma",
      photo: "https://cdn.sofifa.net/players/230/621/25_120.png",
      position: "GK",
      nationality: "Italy",
      flag: "https://cdn.sofifa.net/flags/it.png",
      club: "Paris Saint-Germain",
      logo: "https://cdn.sofifa.net/meta/team/591/120.png",
      rating: 89,
      diving: 88,
      handling: 84,
      kicking: 75,
      reflexes: 90,
      speed: 50,
      positioning: 85
    }
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
       <div class="add-icon" >+</div>
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