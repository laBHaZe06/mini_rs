async function loadContent(target) {
    //On fetch la page html
    const response = await fetch(`pages/${target}.html`);
    if (!response.ok) {
        console.error('Erreur lors du chargement du contenu:', response.statusText);
        return;
    }
    const content = await response.text();
    const mainContent = document.getElementById('main-content');

    mainContent.innerHTML = content; // Remplace le contenu actuel par celui chargé
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
//     loadContent('posts'); // Charge le contenu des posts au chargement de la page
// });