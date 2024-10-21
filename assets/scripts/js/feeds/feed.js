
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
            reactions: { like: 0, love: 0, dislike: 0 },
            comments: []
          },
          {
            id: 2,
            text: "Voici mon second post! Comment ça va?",
            image: "https://images.unsplash.com/photo-1721332155484-5aa73a54c6d2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reactions: { like: 0, love: 0, dislike: 0 },
            comments: []
          }
        ];
  
        console.log(posts);
      // Effacer l'éventuel contenu précédent
        feed.innerHTML = '';
        // Affichage des posts
        posts.forEach(post => {
          const postElement = document.createElement("div");
          postElement.classList.add("post");

          const postContent = `
            
              <div class="post-header">
                <img src="${post.image}" alt="${post.text}">
                <p>${post.text}</p>
                </div>
                <div class="block-content">
                  <div class="reactions">
                    <button onclick="likePost(${post.id})"><span id="like-${post.id}"><i class="fa-regular fa-thumbs-up"></i>&nbsp;&nbsp;${post.reactions.like}</span></button>
                    <button onclick="lovePost(${post.id})"><span id="love-${post.id}"><i class="fa-regular fa-heart"></i>&nbsp;&nbsp;${post.reactions.love}</span></button>
                    <button onclick="dislikePost(${post.id})"><span id="dislike-${post.id}"><i class="fa-regular fa-thumbs-down"></i>&nbsp&nbsp;${post.reactions.dislike}</span></button>
                  </div>
                  <div class="comments">
                  <h3>Commentaires</h3>
                    <form id="comment-form-${post.id}">
                    <input type="text" id="comment-input-${post.id}" placeholder="Ajouter un commentaire...">
                    <button type="submit" onclick="addComment(${post.id})">Envoyer</button>
                    </form>
                  </div>
                  <div id="comment-list-${post.id}"></div>
                </div>
              </div>`;

            postElement.innerHTML = postContent;
            feed.appendChild(postElement);
      });
    }
