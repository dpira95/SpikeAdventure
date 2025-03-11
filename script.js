document.addEventListener("DOMContentLoaded", function() {
    let marker = document.getElementById("hiroMarker");
    let menuContainer = document.getElementById("menuContainer");
    let markerDetected = false;

    marker.addEventListener("markerFound", function() {
        if (!markerDetected) {
            markerDetected = true; // Blocca il marker per evitare reset
            fetch("menu.html")
                .then(response => response.text())
                .then(data => {
                    menuContainer.innerHTML = data;
                    attachMenuEvents();
                })
                .catch(error => console.error("Errore nel caricamento del menu:", error));
        }
    });

    // ❌ Rimosso markerLost per evitare che il menu scompaia
});

// Funzione per riassociare gli eventi ai pulsanti dopo il caricamento del menu
function attachMenuEvents() {
    let menu = document.getElementById("menu");
    let info = document.getElementById("info");

    if (!menu || !info) return;

    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(button => {
        button.addEventListener("click", showInfo);
    });

    let backButton = document.querySelector(".back-button");
    if (backButton) {
        backButton.addEventListener("click", showMenu);
    }
}
