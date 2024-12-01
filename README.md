# FUT Champions Web App Ultimate Team ![Football Player](assets/images/player_football.gif)


Bienvenue dans l'**application web de gestion d'équipe Ultimate Team** pour **EA FC 25** !  
Créez, personnalisez et gérez vos équipes avec une interface interactive, en choisissant parmi différentes formations tactiques et en ajoutant vos joueurs préférés.

---

## 🚀 Lien de Déploiement

- **Site de déploiement sur Vercel** : [FUT Champions Web App sur Vercel](https://fut-champions-web-app-ultimate-team-five.vercel.app/)
- **Page GitHub Pages** : [FUT Champions Web App sur GitHub Pages](https://oumaymabrd.github.io/FUT-Champions-Web-App-Ultimate-Team/)
- **Code source sur GitHub** : [Voir le projet sur GitHub](https://github.com/OumaymaBrd/FUT-Champions-Web-App-Ultimate-Team)
- **Suivi du projet avec Trello** : [Tableau Trello - FUT Champions Web App Ultimate Team](https://trello.com/b/28II8Lkp/fut-champions-web-app-ultimate-team)

---


### Détails de la mise en page :
- **Liens de déploiement** : J'ai intégré tous les liens importants pour que les utilisateurs puissent facilement accéder au site de production sur **Vercel**, à la page **GitHub Pages**, au dépôt **GitHub**, et au tableau **Trello** pour suivre l'avancement.
- **GIFs de démonstration** : Vous pouvez remplacer les liens vers les GIFs par ceux que vous souhaitez pour illustrer certaines actions dans l'application.
- **Formations tactiques** : Une explication détaillée des formations **4-3-3**, **4-4-2**, et **3-5-2** avec leurs avantages stratégiques.
- **Trello** : Un lien vers votre tableau **Trello** pour que les collaborateurs et utilisateurs puissent suivre la gestion du projet et les tâches en cours.



## 🚀 Fonctionnalités Clés

### 1. **Ajout Dynamique de Joueurs** 📝
- **Formulaire interactif** pour ajouter des joueurs avec des informations complètes : nom, position, note, statistiques, etc.
- **Validation des champs** pour garantir la cohérence des données saisies.
- Interface de gestion des joueurs avec des actions simples : **ajout**, **modification** et **suppression**.

### 2. **Gestion des Positions Selon la Formation Tactique** ⚖️
- Respect des formations classiques : **4-3-3**, **4-4-2**, **3-5-2**.
- **Positionnement des joueurs** ajusté automatiquement en fonction de la formation choisie.
- **Limitation stricte** à 11 joueurs dans la formation principale, les autres en tant que réservistes.

### 3. **Sauvegarde Locale (LocalStorage)** 💾
- **Sauvegarde automatique** des données de l'équipe et des joueurs pour une utilisation future.
- Chargement des données enregistrées automatiquement lors de l'ouverture de l'application.

### 4. **Responsive Design 📱💻**
- L'interface est optimisée pour être utilisée sur **téléphones mobiles**, **tablettes** et **ordinateurs portables**.
- **Affichage dynamique** et ajustement automatique des éléments pour offrir une expérience optimale sur tous les appareils.

---

## 🛠️ Technologies Requises

- **HTML5** pour la structure de base.
- **CSS** (frameworks comme [Tailwind CSS](https://tailwindcss.com) ).
- **JavaScript** (DOM natif) pour une gestion fluide des interactions.

---

## 📖 User Stories

### 1. **Création d'une équipe de 11 joueurs** ⚽
**En tant qu'utilisateur,** je souhaite pouvoir ajouter des joueurs à ma formation via un formulaire dynamique, tout en respectant la limite de 11 joueurs.

**Critères d'acceptation :**
- Je peux ajouter un joueur avec les champs nécessaires : nom, position, note, etc.
- Le formulaire vérifie la validité des données saisies.
- Je peux modifier ou supprimer des joueurs.

### 2. **Adaptation Automatique de la Formation** 🧑‍🏫
**En tant qu'utilisateur,** je souhaite pouvoir changer la formation de mon équipe et voir les positions des joueurs ajustées en conséquence.

**Critères d'acceptation :**
- Je peux choisir parmi différentes formations (4-4-2, 4-3-3, 3-5-2).
- Le positionnement des joueurs est automatiquement mis à jour selon la formation choisie.
- Seuls les postes valides pour chaque formation sont affichés.

### 3. **Sauvegarde et Récupération des Données** 💾
**En tant qu'utilisateur,** je souhaite que mes données de formation et d'équipe soient sauvegardées automatiquement pour pouvoir les récupérer plus tard.

**Critères d'acceptation :**
- Les données sont stockées dans **LocalStorage**.
- Les données sont récupérées au démarrage de l'application.

### 4. **Formulaire Dynamique pour les Joueurs** 👥
**En tant qu'utilisateur,** je veux pouvoir ajouter dynamiquement de nouveaux joueurs à mon équipe via un formulaire interactif.

**Critères d'acceptation :**
- Le formulaire permet d'ajouter un joueur.
- L'interface ajuste les positions et le nombre de joueurs en fonction de la formation choisie.

---

## 📑 Formations Prédéfinies

### **1. Formation 4-3-3** 🔵
- 1 **GK** (Gardien)
- 2 **CB** (Défenseurs centraux)
- 1 **LB** (Latéral gauche)
- 1 **RB** (Latéral droit)
- 3 **CM** (Milieux centraux)
- 1 **LW** (Ailier gauche)
- 1 **RW** (Ailier droit)
- 1 **ST** (Attaquant central)

### **2. Formation 4-4-2** 🔴
- 1 **GK** (Gardien)
- 2 **CB** (Défenseurs centraux)
- 1 **LB** (Latéral gauche)
- 1 **RB** (Latéral droit)
- 2 **CM** (Milieux centraux)
- 1 **RM** (Milieu droit)
- 1 **LM** (Milieu gauche)
- 2 **ST** (Attaquants)

### **3. Formation 3-5-2** 🟢
- 1 **GK** (Gardien)
- 3 **CB** (Défenseurs centraux)
- 2 **WB** (Ailiers/Arrières latéraux)
- 3 **CM** (Milieux centraux)
- 2 **ST** (Attaquants)

La formation **3-5-2** est idéale pour une stratégie défensive renforcée avec 3 défenseurs centraux, tout en maximisant la présence au milieu avec 5 milieux de terrain. Parfait pour les équipes cherchant à dominer la possession et à maintenir un bloc solide tout en ayant une attaque puissante avec 2 attaquants.

---

## 📦 Installation

### 1. Cloner le dépôt
Clonez ce dépôt pour exécuter le projet localement :

```bash


git clone https://github.com/OumaymaBrd/FUT-Champions-Web-App-Ultimate-Team.git



