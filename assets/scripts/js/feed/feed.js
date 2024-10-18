document.addEventListener("DOMContentLoaded", function() {
    //Récupère le document avec id feed-post 
    const feed = document.getElementById("feed-post");

    // Tableau de posts à afficher
    const posts = [
        {
          id: 1,
          text: "Voici mon premier post!",
          image: "images/post1.jpg",
          reactions: { like: 0, love: 0, dislike: 0 },
          comments: []
        },
        {
          id: 2,
          text: "Voici mon second post! Comment ça va?",
          image: "images/post2.jpg",
          reactions: { like: 0, love: 0, dislike: 0 },
          comments: []
        }
      ];

      // Function pour afficher les posts
      function displayPost() {
        // Effacer l'éventuel contenu précédent
        feed.innerHTML = "";
        // Affichage des posts
        posts.forEach(post => {
          const postElement = document.createElement("div");
          postElement.classList.add("post");

          const postContent = `
            <img src="${post.image}" alt="${post.text}">
            <p>${post.text}</p>
            <div class="reactions">
              <button onclick="likePost(${post.id})">J'aime <span id="like-${post.id}">${post.reactions.like}</span></button>
              <button onclick="lovePost(${post.id})">J'aime pas <span id="love-${post.id}">${post.reactions.love}</span></button>
              <button onclick="dislikePost(${post.id})">Je n'aime pas <span id="dislike-${post.id}">${post.reactions.dislike}</span></button>
            </div>
            <div class="comments">
              <h3>Commentaires</h3>
                <form id="comment-form-${post.id}">
                <input type="text" id="comment-input-${post.id}" placeholder="Ajouter un commentaire...">
                <button type="submit" onclick="addComment(${post.id})">Envoyer</button>
                </form>
              <div id="comment-list-${post.id}"></div>
            </div>`;

            postElement.innerHTML = postContent;
            feed.appendChild(postElement);
      });
    }

    // fucntion de réaction 
    function likePost(postId) {
        const likeElement = document.getElementById(`like-${postId}`);
        posts.forEach(post => {
            if (post.id === postId) {
                post.reactions.like++;
                likeElement.textContent = post.reactions.like;
            }
        });
    }

    function lovePost(postId) {
        const loveElement = document.getElementById(`love-${postId}`);
        posts.forEach(post => {
            if (post.id === postId) {
                post.reactions.love++;
                loveElement.textContent = post.reactions.love;
            }
        });
    }

    function dislikePost(postId) {
        const dislikeElement = document.getElementById(`dislike-${postId}`);
        posts.forEach(post => {
            if (post.id === postId) {
                post.reactions.dislike++;
                dislikeElement.textContent = post.comments.dislike;
            } else if (post.comments.dislike ===  undefined || post.comments.dislike === null)  {
              post.reactions.dislike = 0;
              dislikeElement.textContent = post.reactions.dislike;

            } 
          })
        };

    displayPost();

});