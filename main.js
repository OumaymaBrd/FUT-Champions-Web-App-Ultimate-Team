card.querySelector('.modify-btn').addEventListener('click', function() {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    
    if (index >= 0 && index < players.length) {
        // Récupère le joueur à l'index spécifié
        let player = players[index];
        
        // Affiche les informations du joueur dans les champs input
        fol.innerHTML = `
            <label>Name: </label> <input type="text" id="player-name" value="${player.name}"> </br>
            <label>Diving: </label> <input type="text" id="player-diving" value="${player.diving}"> </br>
            <label>Position: </label> <input type="text" id="player-position" value="${player.position}"> </br>
            <label>Handling: </label> <input type="text" id="player-handling" value="${player.handling}"> </br>
            <label>Kicking: </label> <input type="text" id="player-kicking" value="${player.kicking}"> </br>
            <label>Nationality: </label> <input type="text" id="player-nationality" value="${player.nationality}"> </br>
            <label>Logo: </label> <img src="${player.logo}" class="flag"> </br>
            <label>Photo: </label> <img src="${player.photo}" class="flag"> </br>
            <label>Positioning: </label> <input type="text" id="player-positioning" value="${player.positioning}"> </br>
            <label>Rating: </label> <input type="text" id="player-rating" value="${player.rating}"> </br>
            <label>Reflexes: </label> <input type="text" id="player-reflexes" value="${player.reflexes}"> </br>
            <label>Speed: </label> <input type="text" id="player-speed" value="${player.speed}"> </br>
            <input type="submit" value="Enregistrer" id="save-btn">
        `;

        // Lorsque le bouton "Enregistrer" est cliqué
        document.getElementById('save-btn').addEventListener('click', function() {
            // Récupère les nouvelles valeurs des champs input
            player.name = document.getElementById('player-name').value;
            player.diving = document.getElementById('player-diving').value;
            player.position = document.getElementById('player-position').value;
            player.handling = document.getElementById('player-handling').value;
            player.kicking = document.getElementById('player-kicking').value;
            player.nationality = document.getElementById('player-nationality').value;
            player.positioning = document.getElementById('player-positioning').value;
            player.rating = document.getElementById('player-rating').value;
            player.reflexes = document.getElementById('player-reflexes').value;
            player.speed = document.getElementById('player-speed').value;

            // Met à jour le tableau des joueurs dans le localStorage
            players[index] = player;
            localStorage.setItem('players', JSON.stringify(players));

            // Affiche un message de succès
            alert('Le joueur a été mis à jour avec succès !');
        });
    } else {
        alert('Index invalide');
    }
});
