# FUT Champions Web App Ultimate Team ⚽

**Concevez votre équipe Ultimate Team pour EA FC 25 !**  
Cette application web vous permet de créer, personnaliser et gérer vos formations tactiques et équipes de joueurs via une interface interactive.

---

## Fonctionnalités Clés 🚀

### 1. **Formulaire d'Ajout Dynamique de Joueurs** 📝
- **Ajouter des joueurs** avec des champs pour le nom, la position, la note, les statistiques, et autres détails pertinents.
- **Validation des champs** pour garantir la cohérence des données.
- Interface de gestion des joueurs : **ajout**, **modification** et **suppression**.

### 2. **Gestion des Positions Selon la Formation Tactique** ⚖️
- **Respect des formations tactiques** : 4-3-3, 4-4-2, 3-5-2, etc.
- **Positionnement automatique des joueurs** en fonction de la formation choisie.
- **Limitation stricte** à 11 joueurs dans la formation principale, les autres en tant que réservistes.

### 3. **Sauvegarde Locale (LocalStorage)** 💾
- **Sauvegarde automatique** de la formation et des données des joueurs pour une utilisation future.
- **Chargement des données enregistrées** à chaque ouverture de l'application.

### 4. **Interface Responsive** 📱💻
- L'application s'adapte aux tailles d'écran des **tablettes**, **mobiles** et **ordinateurs portables**.
- **Ajustement dynamique** de l'affichage des joueurs pour garantir une expérience utilisateur optimale sur tous les appareils.

---

## Technologies Requises 🛠️
- **HTML5**
- **CSS** (Frameworks comme [Tailwind CSS](https://tailwindcss.com) ou [Bootstrap](https://getbootstrap.com))
- **JavaScript Vanilla** (DOM natif)

---

## User Stories 📖

### 1. **Création d'une équipe de 11 joueurs** ⚽
**En tant qu'utilisateur,** je souhaite pouvoir ajouter des joueurs à ma formation via un formulaire dynamique, avec un maximum de 11 joueurs sélectionnés pour garantir une structure d'équipe conforme.

**Critères d'acceptation :**
- Je peux ajouter un joueur avec les champs nécessaires (nom, position, statistiques).
- Je peux modifier ou supprimer un joueur.
- Le formulaire vérifie la validité des données saisies.

### 2. **Adaptation de la formation choisie** 🧑‍🏫
**En tant qu'utilisateur,** je souhaite pouvoir changer la formation de mon équipe et voir les positions des joueurs ajustées en conséquence.

**Critères d'acceptation :**
- Je peux choisir une formation (ex : 4-4-2, 4-3-3).
- Le positionnement des joueurs est automatiquement mis à jour pour s'adapter à la formation choisie.
- Seuls les postes valides pour la formation sont disponibles pour chaque joueur.

### 3. **Sauvegarde et Récupération des Données** 💾
**En tant qu'utilisateur,** je souhaite que mes données de formation et d'équipe soient sauvegardées automatiquement pour pouvoir les récupérer plus tard.

**Critères d'acceptation :**
- Les données sont stockées localement.
- La récupération des données se fait lors du chargement de l'application.

### 4. **Formulaire Dynamique pour les Joueurs** 👥
**En tant qu'utilisateur,** je souhaite pouvoir ajouter dynamiquement de nouveaux joueurs au sein de l'interface.

**Critères d'acceptation :**
- Un formulaire dynamique permet de créer de nouveaux joueurs.
- L'interface ajuste les positions et le nombre de joueurs en fonction de la formation choisie.

---

## Formations Prédéfinies ⚽

### Formation 4-3-3
- 1 **GK** (Gardien)
- 2 **CB** (Défenseurs centraux)
- 1 **LB** (Latéral gauche)
- 1 **RB** (Latéral droit)
- 3 **CM** (Milieux centraux)
- 1 **LW** (Ailier gauche)
- 1 **RW** (Ailier droit)
- 1 **ST** (Attaquant central)

### Formation 4-4-2
- 1 **GK** (Gardien)
- 2 **CB** (Défenseurs centraux)
- 1 **LB** (Latéral gauche)
- 1 **RB** (Latéral droit)
- 2 **CM** (Milieux centraux)
- 1 **RM** (Milieu droit)
- 1 **LM** (Milieu gauche)
- 2 **ST** (Attaquants)

---

## Installation ⚙️

1. Clonez le dépôt :

```bash
git clone https://github.com/username/fut-champions-web-app.git
