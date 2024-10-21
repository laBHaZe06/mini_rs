
    // Function pour afficher les posts
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
            text: "Voici mon premier post!",
            image: "https://images.unsplash.com/photo-1602526433901-9681fbf4c706?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reactions: { like: 20, love: 2, dislike: 12},
            comments: []
          },
          {
            id: 4,
            text: "Voici mon second post! Comment ça va?",
            image: "https://images.unsplash.com/photo-1721332155484-5aa73a54c6d2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reactions: { like: 5, love: 4, dislike: 0 },
            comments: []
          }
        ];
  
        // console.log(posts);
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
                    <button onclick="dislikePost(${post.id})"><span id="dislike-${post.id}"><i class="fa-regular fa-thumbs-down"></i>&nbsp&nbsp;${post.reactions.dislike}</span></button>
                </div>
      
                <div class="comments" id="comments-section-${post.id}">
                  <div class="form-comments">
                    <h3>Commentaires</h3>
                    <form id="comment-form-${post.id}">
                    <input type="text" id="comment-input-${post.id}" placeholder="Ajouter un commentaire...">
                    <button class="btn-form-com" type="submit" onclick="addComment(${post.id})">Envoyer</button>
                    <button type="submit" class="btn-com" onclick="toggleComments(${post.id})">Afficher les commentaires</button>
                    </form>
                  </div>
                  </div>
                  <div id="comments-list-${post.id}" class="comments-content fade-in">
                      ${commentsContent || "<p>Aucun commentaire pour l'instant.</p>"}
                  </div>
              </div>`;

            postElement.innerHTML = postContent;
            feed.appendChild(postElement);
      });
}

function toggleComments(postId) {
  const commentsSection = document.getElementById(`comments-list-${postId}`);
  
  if (commentsSection.classList.contains("show")) {
    // Si la classe "show" est déjà présente, on retire l'animation
    commentsSection.classList.remove("show");
    commentsSection.classList.add("fade-in"); // Retour à l'état initial
    setTimeout(() => {
      commentsSection.style.display = "none"; // Cache après l'animation
    }, 500); // Attendre la fin de la transition
  } else {
    commentsSection.style.display = "block"; // Affiche la section avant d'ajouter l'effet
    setTimeout(() => {
      commentsSection.classList.remove("fade-in");
      commentsSection.classList.add("show"); // Applique l'effet
    }, 10); // Petit délai pour s'assurer que l'affichage est pris en compte
  }
}
