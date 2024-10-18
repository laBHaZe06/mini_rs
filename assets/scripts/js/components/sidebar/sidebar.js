
document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("toggleSidebarBtn").addEventListener("click", function() {
            document.getElementById("sidebar").style.left = "0"; // Ouvre sidebar
            document.getElementById("main-content").style.marginLeft = "250px"; // Déplace le contenu de 250px 
        });

        document.getElementById("closeSidebarBtn").addEventListener("click", function(){
            document.getElementById("sidebar").style.left = "-250px"; // Ferme sidebar
            document.getElementById("main-content").style.marginLeft = "0";  
        });

});