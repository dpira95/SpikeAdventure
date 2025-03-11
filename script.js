document.addEventListener("DOMContentLoaded", function() {
    let marker = document.getElementById("hiroMarker");
    let menuContainer = document.getElementById("menuContainer");

    marker.addEventListener("markerFound", function() {
        fetch("menu.html")
            .then(response => response.text())
            .then(data => {
                menuContainer.innerHTML = data;
                attachMenuEvents(); // Riassegna gli eventi ai pulsanti
            })
            .catch(error => console.error("Errore nel caricamento del menu:", error));
    });

    marker.addEventListener("markerLost", function() {
        menuContainer.innerHTML = ""; // Rimuove il menu quando il marker non è più visibile
    });
});

// Funzione per riassegnare gli eventi ai pulsanti dopo il caricamento di menu.html
function attachMenuEvents() {
    let menu = document.getElementById("menu");
    let info = document.getElementById("info");

    if (!menu || !info) return; // Evita errori se gli elementi non sono ancora caricati

    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(button => {
        button.addEventListener("click", showInfo);
    });

    let backButton = document.querySelector(".back-button");
    if (backButton) {
        backButton.addEventListener("click", showMenu);
    }
}

// Funzione per mostrare il pannello informazioni
function showInfo() {
    console.log("Mostrando panel informazioni...");

    let menu = document.getElementById("menu");
    let info = document.getElementById("info");

    if (!menu || !info) return; // Controlla che gli elementi esistano

    menu.style.opacity = "0";
    menu.style.pointerEvents = "none";

    setTimeout(() => {
        menu.style.display = "none";
        info.style.display = "block";
        setTimeout(() => {
            info.style.opacity = "1";
            info.style.pointerEvents = "all";
        }, 50);
    }, 100);
}

// Funzione per tornare al menu principale
function showMenu() {
    console.log("Tornando al menu principale...");

    let menu = document.getElementById("menu");
    let info = document.getElementById("info");

    if (!menu || !info) return; // Controlla che gli elementi esistano

    info.style.opacity = "0";
    info.style.pointerEvents = "none";

    setTimeout(() => {
        info.style.display = "none";
        menu.style.display = "block";
        setTimeout(() => {
            menu.style.opacity = "1";
            menu.style.pointerEvents = "all";
        }, 50);
    }, 100);
}
