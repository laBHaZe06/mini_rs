const avatar = document.getElementById('avatar');
const dropdownMenu = document.getElementById('dropdown-menu');

// Ajout d'un event listener pour gérer le clic sur l'avatar
avatar.addEventListener('click', function(event) {
    // Empêche la propagation de l'événement pour éviter la fermeture du menu
    event.stopPropagation();

    // Bascule l'affichage du menu (affiche/masque)
    if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        
        // Pour l'effet de fade-out
        setTimeout(() => {
            dropdownMenu.style.display = 'none'; // Masquer le menu après l'effet
        }, 500); // 500ms correspond au temps de transition CSS
    } else {
        dropdownMenu.style.display = 'block'; // Afficher le menu
        // Laisser le temps à l'opacité de s'appliquer
        setTimeout(() => {
            dropdownMenu.classList.add('show');
        }, 10); // Petit délai pour s'assurer que display est pris en compte
    }
});

// Ferme le dropdown si on clique en dehors du menu
window.addEventListener('click', function(event) {
    if (!avatar.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
        dropdownMenu.style.display = 'none'; // Masquer immédiatement après
    }
})