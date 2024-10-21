document.addEventListener("DOMContentLoaded", function() {
    const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
    // const centerToggleSidebarBtn = document.getElementById("centerToggleSidebarBtn");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const closeSidebarBtn = document.getElementById("closeSidebarBtn");

    // Fonction pour ouvrir la sidebar
    function openSidebar() {
        sidebar.style.left = "0"; // Ouvre sidebar
        mainContent.style.marginLeft = "250px"; // Déplace le contenu de 250px
    }

    // Fonction pour fermer la sidebar
    function closeSidebar() {
        sidebar.style.left = "-250px"; // Ferme sidebar
        mainContent.style.marginLeft = "0"; // Ramène le contenu à gauche
    }

    // Ajout de l'écouteur d'événement pour ouvrir la sidebar via le bouton dans la navbar
    toggleSidebarBtn.addEventListener("click", openSidebar);

    // Ajout de l'écouteur d'événement pour ouvrir la sidebar via le bouton au milieu de l'écran
    // centerToggleSidebarBtn.addEventListener("click", openSidebar);

    // Ajout de l'écouteur d'événement pour fermer la sidebar
    closeSidebarBtn.addEventListener("click", closeSidebar);

    // Fonction pour gérer l'affichage des boutons selon la taille de l'écran
    function toggleButtonVisibility() {
        if (window.innerWidth <= 768) {
            toggleSidebarBtn.style.display = "none"; // Cache le bouton dans la navbar sur mobile
            centerToggleSidebarBtn.style.display = "block"; // Affiche le bouton au milieu de l'écran
        } else {
            toggleSidebarBtn.style.display = "block"; // Affiche le bouton dans la navbar sur grand écran
            // centerToggleSidebarBtn.style.display = "none"; // Cache le bouton au milieu
        }
    }

    // Appel initial pour vérifier la taille de l'écran au chargement de la page
    toggleButtonVisibility();

    // Ajout d'un écouteur d'événement pour surveiller les changements de taille de fenêtre
    window.addEventListener("resize", toggleButtonVisibility);
});