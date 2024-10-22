// Fonction pour afficher les posts
function displayPost() {
  const feed = document.getElementById("feed-post");
  console.log(feed);

  if (!feed) {
      console.error("L'élément feed-post n'existe pas.");
      return; // Sort si l'élément n'existe pas
  }

  // Tableau de posts à afficher
  const posts = [
      {
          id: 1,
          text: "Voici mon premier post!",
          image: "https://images.unsplash.com/photo-1602526433901-9681fbf4c706?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          reactions: { like: 3, love: 1, dislike: 8 },
          comments: [
              {
                  id: 1,
                  author: "User1",
                  text: "C'est top!"
              },
              {
                  id: 2,
                  author: "User2",
                  text: "Super!"
              }
          ]
      },
      {
          id: 2,
          text: "Voici mon second post! Comment ça va?",
          image: "https://images.unsplash.com/photo-1721332155484-5aa73a54c6d2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          reactions: { like: 3, love: 1, dislike: 10 },
          comments: []
      },
      {
          id: 3,
          text: "Voici un autre post intéressant!",
          image: "https://images.unsplash.com/photo-1602526433901-9681fbf4c706?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          reactions: { like: 20, love: 2, dislike: 12 },
          comments: []
      }
  ];

  // Charger les commentaires depuis localStorage
  loadComments(posts);

  // Effacer l'éventuel contenu précédent
  feed.innerHTML = '';

  // Affichage des posts
  posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      let commentsContent = '';
      post.comments.forEach(comment => {
          commentsContent += `<p><strong>${comment.author}</strong>: ${comment.text}</p>`;
      });

      const postContent = `
          <div class="card-header">
              <img src="${post.image}" alt="${post.text}">
              <p>${post.text}</p>
          </div>
          <div class="block-content">
              <div class="reactions">
                  <button onclick="likePost(${post.id})"><span id="like-${post.id}"><i class="fa-regular fa-thumbs-up"></i>&nbsp;&nbsp;${post.reactions.like}</span></button>
                  <button onclick="lovePost(${post.id})"><span id="love-${post.id}"><i class="fa-regular fa-heart"></i>&nbsp;&nbsp;${post.reactions.love}</span></button>
                  <button onclick="dislikePost(${post.id})"><span id="dislike-${post.id}"><i class="fa-regular fa-thumbs-down"></i>&nbsp;&nbsp;${post.reactions.dislike}</span></button>
              </div>
              <div class="comments" id="comments-section-${post.id}">
                  <div class="form-comments">
                      <h3>Commentaires</h3>
                      <form id="comment-form-${post.id}">
                          <input type="text" id="comment-input-${post.id}" placeholder="Ajouter un commentaire...">
                          <button class="btn-form-com" type="submit">Envoyer</button>
                          <button type="button" class="btn-com" onclick="toggleComments(${post.id})">Afficher les commentaires</button>
                      </form>
                  </div>
              </div>
              <div id="comments-list-${post.id}" class="comments-content fade-in">
                  ${commentsContent || "<p>Aucun commentaire pour l'instant.</p>"}
              </div>
          </div>`;

      postElement.innerHTML = postContent;
      feed.appendChild(postElement);

      // Ajouter l'écouteur d'événements pour le formulaire de commentaire
      const commentForm = document.getElementById(`comment-form-${post.id}`);
      commentForm.addEventListener('submit', function(e) {
          e.preventDefault(); // Empêche le rechargement de la page
          addComment(post.id);
      });
  });
}

function toggleComments(postId) {
  const commentsSection = document.getElementById(`comments-list-${postId}`);

  if (commentsSection.classList.contains("show")) {
      commentsSection.classList.remove("show");
      commentsSection.classList.add("fade-in");
      setTimeout(() => {
          commentsSection.style.display = "none";
      }, 500);
  } else {
      commentsSection.style.display = "block";
      setTimeout(() => {
          commentsSection.classList.remove("fade-in");
          commentsSection.classList.add("show");
      }, 10);
  }
}

function addComment(postId) {
  const commentInput = document.getElementById(`comment-input-${postId}`);
  const commentText = commentInput.value.trim();

  if (commentText === '') {
      alert('Le commentaire ne peut pas être vide.');
      return;
  }

  // Trouver le post correspondant
  const post = posts.find(p => p.id === postId);
  if (post) {
      const newComment = {
          id: post.comments.length + 1, // Générer un ID simple
          author: "Moi", // Utiliser un nom d'auteur fixe pour l'exemple
          text: commentText
      };
      post.comments.push(newComment);
      commentInput.value = ''; // Vider le champ de texte

      // Mettre à jour l'affichage des commentaires
      renderComments(post);
      saveCommentsToLocalStorage(postId); // Sauvegarde dans localStorage
  }
}

function renderComments(post) {
  const commentsList = document.getElementById(`comments-list-${post.id}`);
  let commentsContent = '';

  post.comments.forEach(comment => {
      commentsContent += `<p><strong>${comment.author}</strong>: ${comment.text}</p>`;
  });

  commentsList.innerHTML = commentsContent || "<p>Aucun commentaire pour l'instant.</p>";
}

// Fonction pour charger les commentaires depuis localStorage
function loadComments(posts) {
  const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
  
  posts.forEach(post => {
      if (storedComments[post.id]) {
          post.comments = storedComments[post.id];
      }
  });
}

// Fonction pour sauvegarder les commentaires dans localStorage
function saveCommentsToLocalStorage(postId) {
  const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
  const post = posts.find(p => p.id === postId);
  
  if (post) {
      storedComments[post.id] = post.comments; // Mettez à jour les commentaires pour ce post
      localStorage.setItem('comments', JSON.stringify(storedComments)); // Sauvegarder dans localStorage
  }
}

// Appeler displayPost au chargement de la page
document.addEventListener('DOMContentLoaded', displayPost);
