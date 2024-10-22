// Tableau de posts à afficher
const friends = [
  {
      id: 1,
      name: "Dupont",
      age: 23,
      phone: "0612345678",
      address: "123 rue de la République, Paris",
      email: "Dupont@exemple.fr",
      image: "https://images.unsplash.com/photo-1602526433901-9681fbf4c706?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      reactions: { like: 0, love: 0, dislike: 0 },
  },
  {
      id: 2,
      name: "Jacky",
      age: 19,
      phone: "0612345678",
      address: "123 rue de la République, Paris",
      email: "jacky@exemple.com",
      image: "https://images.unsplash.com/photo-1721332155484-5aa73a54c6d2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      reactions: { like: 5, love: 8, dislike: 3},
  },
  {
      id: 3,
      name: "Emilie",
      age: 29,
      phone: "0612345678",
      address: "123 rue de la République, Paris",
      email: "emilie@exemple.fr",
      image: "https://images.unsplash.com/photo-1602526433901-9681fbf4c706?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      reactions: { like: 1, love: 1, dislike: 3 },
  },
  {
      id: 4,
      name: "Michele",
      age: 49,
      phone: "0612345678",
      address: "123 rue de la République, Paris",
      email: "michele@exemple.com",
      image: "https://images.unsplash.com/photo-1721332155484-5aa73a54c6d2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      reactions: { like: 6, love: 2, dislike: 0 },
  }
];

// Fonction pour afficher les posts
function displayFriend() {
  const friendEl = document.getElementById("friend-post");
  const searchBar = document.getElementById("searchBar");

  if (!friendEl) {
      console.error("L'élément friend-post n'existe pas.");
      return; // Sort si l'élément n'existe pas
  }

  // Fonction pour afficher les amis
  renderFriends(friends);

  // Fonction pour filtrer les amis en fonction de la recherche
  function filterFriends() {
      const searchTerm = searchBar.value.toLowerCase();
      // Filtrer les amis par nom, email ou adresse
      const filteredFriends = friends.filter(friend => {
          return friend.name.toLowerCase().includes(searchTerm) ||
                 friend.email.toLowerCase().includes(searchTerm) ||
                 friend.address.toLowerCase().includes(searchTerm);
      });
      // Afficher les amis filtrés
      renderFriends(filteredFriends);
  }

  // Écouteur d'événements sur la barre de recherche
  searchBar.addEventListener('input', filterFriends);
}

// Fonction pour afficher les amis
function renderFriends(friendsToDisplay) {
  const friendEl = document.getElementById("friend-post");
  // Effacer l'éventuel contenu précédent
  friendEl.innerHTML = '';

  // Affichage des posts
  friendsToDisplay.forEach(friend => {
      const friendElement = document.createElement("div");
      friendElement.classList.add("friends");

      const friendContent = `
          <div class="card-header">
              <img src="${friend.image}" alt="${friend.name}">
          </div>
          <div class="friends-presentation">
              <p>${friend.name}</p><br/>
              <p>Age: ${friend.age}</p>
              <p>Email : ${friend.email} </p>
              <p>Téléphone: ${friend.phone}</p>
              <p>Adresse: ${friend.address}</p>
              <a class="sidebar-link" data-target="messages/message" style="cursor:pointer;">
                  <i class="fa-solid fa-message"></i>&nbsp;Envoyer message
              </a>
          </div>
          <div class="reactions">
              <button onclick="likefriend(${friend.id}); animateButton(event);" class="bubbly-button">
                  <span id="like-${friend.id}">
                      <i class="fa-regular fa-thumbs-up"></i>&nbsp;&nbsp;${friend.reactions.like}
                  </span>
              </button>
              <button onclick="lovefriend(${friend.id}); animateButton(event);" class="bubbly-button">
                  <span id="love-${friend.id}">
                      <i class="fa-regular fa-heart"></i>&nbsp;&nbsp;${friend.reactions.love}
                  </span>
              </button>
              <button onclick="dislikefriend(${friend.id}); animateButton(event);" class="bubbly-button">
                  <span id="dislike-${friend.id}">
                      <i class="fa-regular fa-thumbs-down"></i>&nbsp;&nbsp;${friend.reactions.dislike}
                  </span>
              </button>
          </div>`;

      friendElement.innerHTML = friendContent;
      friendEl.appendChild(friendElement);
  });
}

// Fonction pour gérer le "like"
function likefriend(id) {
  const friend = friends.find(f => f.id === id);
  if (friend) {
      friend.reactions.like += 1; // Augmente le compteur de "like"
      updateReactions(id); // Met à jour l'affichage des réactions
  }
}

// Fonction pour gérer le "love"
function lovefriend(id) {
  const friend = friends.find(f => f.id === id);
  if (friend) {
      friend.reactions.love += 1; // Augmente le compteur de "love"
      updateReactions(id); // Met à jour l'affichage des réactions
  }
}

// Fonction pour gérer le "dislike"
function dislikefriend(id) {
  const friend = friends.find(f => f.id === id);
  if (friend) {
      friend.reactions.dislike += 1; // Augmente le compteur de "dislike"
      updateReactions(id); // Met à jour l'affichage des réactions
  }
}

var animateButton = function(e) {
  e.preventDefault();
  // Réinitialiser l'animation
  e.target.classList.remove('animate');

  // Ajouter l'animation
  e.target.classList.add('animate');

  // Retirer l'animation après 700ms
  setTimeout(function() {
      e.target.classList.remove('animate');
  }, 700);
};

// Fonction pour mettre à jour l'affichage des réactions
function updateReactions(id) {
  const likeElement = document.getElementById(`like-${id}`);
  const loveElement = document.getElementById(`love-${id}`);
  const dislikeElement = document.getElementById(`dislike-${id}`);

  const friend = friends.find(f => f.id === id);
  if (friend) {
      // Mettre à jour les éléments d'affichage des réactions
      likeElement.innerText = `👍 ${friend.reactions.like}`;
      loveElement.innerText = `❤️ ${friend.reactions.love}`;
      dislikeElement.innerText = `👎 ${friend.reactions.dislike}`;
  }
}

// Assurez-vous d'appeler displayFriend pour que le script s'exécute
window.onload = displayFriend;
