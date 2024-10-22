var animateButton = function(e) {
    e.preventDefault();
    // Réinitialiser l'animation
    e.target.classList.remove('animate');

    // Ajouter l'animation
    e.target.classList.add('animate');

    // Retirer l'animation après 700ms
    setTimeout(function() {
        e.target.classList.remove('animate');
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}