
    // Function pour afficher les posts
    function displayFriend() {
        const friendEl = document.getElementById("friend-post");
        console.log(friendEl);
    
        if (!friendEl) {
          console.error("L'élément friend-post n'existe pas.");
          return; // Sort si l'élément n'existe pas
      }
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
    
        //   console.log(friends);
        // Effacer l'éventuel contenu précédent
          friendEl.innerHTML = '';
          // Affichage des posts
            friends.forEach(friend => {
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
                <a class="sidebar-link" data-target="messages/messages"><i class="fa-solid fa-message"></i>&nbsp;Envoyer message</a>
                    </div>
                    <div class="reactions">
                    <button onclick="likefriend(${friend.id})"><span id="like-${friend.id}"><i class="fa-regular fa-thumbs-up"></i>&nbsp;&nbsp;${friend.reactions.like}</span></button>
                    <button onclick="lovefriend(${friend.id})"><span id="love-${friend.id}"><i class="fa-regular fa-heart"></i>&nbsp;&nbsp;${friend.reactions.love}</span></button>
                    <button onclick="dislikefriend(${friend.id})"><span id="dislike-${friend.id}"><i class="fa-regular fa-thumbs-down"></i>&nbsp&nbsp;${friend.reactions.dislike}</span></button>
                  </div>`;
  
              friendElement.innerHTML = friendContent;
              friendEl.appendChild(friendElement);
        });
  }
  