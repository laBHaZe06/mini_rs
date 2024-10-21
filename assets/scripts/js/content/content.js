async function loadContent(target) {
    //On fetch les pages html
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
    const mainContent = document.getElementById('main-content');

    mainContent.innerHTML = content; // Remplace le contenu actuel par celui chargé
    console.log("Contenu chargé : ", content);

    if (target === 'posts/posts') {
        console.log("Chargement de la page des posts...");

        // Charger dynamiquement le script feed.js
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
    }

}

const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        const target = this.getAttribute('data-target'); // Récupère la valeur de l'attribut data-target
        loadContent(`${target}`); // Charge le contenu correspondant
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     loadContent('post/posts'); // Charge le contenu des posts au chargement de la page
// });