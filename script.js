document.addEventListener("DOMContentLoaded", function() {
    const marker = document.getElementById("hiroMarker");
    const menuContainer = document.getElementById("menuContainer");
    const camera = document.querySelector("a-camera");
    if (camera) camera.setAttribute("cursor", "fuse: true; fuseTimeout: 500");

    marker.addEventListener("markerFound", function() {
        if (!menuContainer.innerHTML) {
            fetch("menu.html")
                .then(response => response.text())
                .then(data => {
                    menuContainer.innerHTML = data;
                    setupMenuAR();
                    attachMenuEvents();
                })
                .catch(error => console.error("Errore nel caricamento del menu:", error));
        }
    });
});

function setupMenuAR() {
    const menuContainer = document.getElementById("menuContainer");
    if (menuContainer) {
        menuContainer.setAttribute("position", "0 0.5 0");
        menuContainer.setAttribute("rotation", "0 0 0");
        menuContainer.setAttribute("scale", "1 1 1");
    }
}

function attachMenuEvents() {
    document.querySelectorAll(".menu-item").forEach(button => {
        button.addEventListener("click", showInfo);
    });
    const backButton = document.querySelector(".back-button");
    if (backButton) backButton.addEventListener("click", showMenu);
}

function showInfo() {
    const menu = document.getElementById("menu");
    const info = document.getElementById("info");
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

function showMenu() {
    const menu = document.getElementById("menu");
    const info = document.getElementById("info");
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
