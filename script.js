document.addEventListener("DOMContentLoaded", function() {
    let marker = document.getElementById("hiroMarker");
    let menuContainer = document.getElementById("menuContainer");

    // Aggiungi il componente cursor per permettere l'interazione AR
    let camera = document.querySelector("a-camera");
    if (camera) {
        camera.setAttribute("cursor", "fuse: true; fuseTimeout: 500");
    }

    marker.addEventListener("markerFound", function() {
        // Verifica se il menu è già stato caricato
        if (!menuContainer.innerHTML) {
            fetch("menu.html")
                .then(response => response.text())
                .then(data => {
                    menuContainer.innerHTML = data;
                    setupMenuAR();  // Configura il menu in AR
                    attachMenuEvents(); // Riassegna gli eventi ai pulsanti
                })
                .catch(error => console.error("Errore nel caricamento del menu:", error));
        }
    });

    marker.addEventListener("markerLost", function() {
        // Non rimuovere il menu se il marker viene perso, lo rendiamo persistente
        // menuContainer.innerHTML = ""; 
    });
});

// Funzione per configurare il menu in AR (assicurati che sia sopra il marker e correttamente orientato)
function setupMenuAR() {
    let menuContainer = document.getElementById("menuContainer");

    if (menuContainer) {
        // Posiziona il menu sopra il marker e imposta la rotazione corretta
        menuContainer.setAttribute("position", "0 0.5 0"); // Posiziona sopra il marker
        menuContainer.setAttribute("rotation", "0 0 0");   // Mantieni la rotazione corretta
        menuContainer.setAttribute("scale", "1 1 1");       // Imposta una scala corretta
    }
}

// Funzione per riassegnare gli eventi ai pulsanti dopo il caricamento di menu.html
function attachMenuEvents() {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(button => {
        button.addEventListener("click", showInfo); // Aggiungi l'evento al clic del pulsante
    });

    let backButton = document.querySelector(".back-button");
    if (backButton) {
        backButton.addEventListener("click", showMenu); // Aggiungi l'evento al pulsante "Indietro"
    }
}

// Funzione per mostrare il pannello delle informazioni
function showInfo() {
    console.log("Mostrando pannello informazioni...");

    let menu = document.getElementById("menu");
    let info = document.getElementById("info");

    if (!menu || !info) return;

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

    if (!menu || !info) return;

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
