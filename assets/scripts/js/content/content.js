async function loadContent(target) {
    // Déclarer mainContent au début de la fonction
    const mainContent = document.getElementById('main-content');

    try {
        // On fetch les pages html
        const response = await fetch(`pages/${target}.html`);
        
        if (!response.ok) {
            console.error('Erreur lors du chargement du contenu:', response.statusText);
            const notFoundResponse = await fetch('pages/not-found.html');

            if (!notFoundResponse.ok) {
                console.error('Erreur lors du chargement de la page 404:', notFoundResponse.statusText);
                return;
            } else {
                // afficher le contenu de la page 404
                const notFoundContent = await notFoundResponse.text();
                mainContent.innerHTML = notFoundContent;
                return;
            }
        }

        const content = await response.text();
        mainContent.innerHTML = content; // Remplace le contenu actuel par celui chargé

        // Chargement dynamique des scripts en fonction de la page
        if (target === 'posts/posts') {
            const script = document.createElement('script');
            script.src = 'assets/scripts/js/feeds/feed.js';
            script.onload = function() {
                console.log('feed.js chargé');
                if (typeof displayPost === 'function') {
                    displayPost(); // Appelle la fonction après que le script est chargé
                } else {
                    console.log("La fonction displayPost n'existe pas.");
                }
            };
            document.body.appendChild(script);
        } else if (target === 'friends/friends') {
            const script = document.createElement('script');
            script.src = 'assets/scripts/js/friends/friends.js';
            script.onload = function() {
                console.log('friends.js chargé');
                if (typeof displayFriend === 'function') {
                    displayFriend(); // Appelle la fonction après que le script est chargé
                } else {
                    console.log("La fonction displayFriend n'existe pas.");
                }
            };
            document.body.appendChild(script);
        } else if (target === 'messages/message') {
            const script = document.createElement('script');
            script.src = 'assets/scripts/js/messages/messages.js';
            script.onload = function() {
                console.log('messages.js chargé');
                if (typeof displayMessage === 'function') {
                    displayMessage(); // Appelle la fonction après que le script est chargé
                } else {
                    console.log("La fonction displayMessage n'existe pas.");
                }
            };
            document.body.appendChild(script);
        }
    } catch (error) {
        console.error('Une erreur est survenue:', error);
    }
}

const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        const target = this.getAttribute('data-target'); // Récupère la valeur de l'attribut data-target
        loadContent(target); // Charge le contenu correspondant
    });
});
