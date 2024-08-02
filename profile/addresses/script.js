document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById("menu-toggle");
    var wrapper = document.getElementById("wrapper");

    function toggleSidebar() {
        wrapper.classList.toggle("toggled");
    }

    menuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        toggleSidebar();
    });

    // Automatically hide the sidebar on smaller screens
    function checkScreenWidth() {
        if (window.innerWidth <= 768) {
            wrapper.classList.remove("toggled");
        } else {
            wrapper.classList.add("toggled");
        }
    }

    window.addEventListener('resize', checkScreenWidth);
    checkScreenWidth(); // Initial check
});
